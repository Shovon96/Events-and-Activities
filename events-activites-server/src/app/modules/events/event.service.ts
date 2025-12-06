import { Prisma, UserRole, UserStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import AppError from "../../errorHandler/AppError";
import httpStatus from "http-status";
import { IEventCreate, IEventUpdate } from "./event.interface";
import { IJWTPayload } from "../../types/common";
import { Request } from "express";
import { fileUploader } from "../../helpers/fileUploader";
import fs from 'fs';
import { IOptions, paginationHelper } from "../../helpers/paginationHelper";

const createEvent = async (req: Request, user: IJWTPayload) => {
    let uploadedImageUrl: string | undefined;
    let uploadedImagePublicId: string | undefined;
    let localFilePath: string | undefined;

    try {
        // Verify user
        const userInfo = await prisma.user.findUniqueOrThrow({
            where: {
                email: user?.email,
                status: UserStatus.ACTIVE
            }
        });

        if (!userInfo) {
            throw new AppError(httpStatus.NOT_FOUND, "This user not found!");
        }

        // Verify user role to create event
        if (userInfo.role === UserRole.USER) {
            throw new AppError(httpStatus.FORBIDDEN, "You're not authorized to create event!");
        }

        // Check for duplicate event name
        const checkAlreadyExistEvent = await prisma.event.findFirst({
            where: {
                hostId: userInfo?.id,
                name: req.body.name,
            }
        });

        if (checkAlreadyExistEvent) {
            throw new AppError(httpStatus.CONFLICT, "Event with this name already exists!");
        }

        // Upload file to Cloudinary if provided
        if (req.file) {
            localFilePath = req.file.path;
            const uploadResult = await fileUploader.uploadToCloudinary(req.file);

            if (uploadResult && uploadResult.secure_url) {
                uploadedImageUrl = uploadResult.secure_url;
                uploadedImagePublicId = uploadResult.public_id;
                req.body.image = uploadResult.secure_url;
            }

            if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
                localFilePath = undefined;
            }
        }

        const hostId = userInfo?.id;
        const { startDate, endDate, ...payload } = req.body as IEventCreate;

        // Convert date strings to ISO DateTime format
        const eventData: any = {
            ...payload,
            hostId,
        };

        if (startDate) {
            eventData.startDate = new Date(startDate).toISOString();
        }

        if (endDate) {
            eventData.endDate = new Date(endDate).toISOString();
        }


        const result = await prisma.$transaction(async (tx) => {
            const event = await tx.event.create({
                data: eventData,
                include: {
                    host: {
                        select: {
                            id: true,
                            email: true,
                            fullName: true,
                            profileImage: true,
                            role: true,
                        }
                    }
                }
            });

            return event;
        });

        return result;
    } catch (error) {
        if (uploadedImagePublicId) {
            try {
                await fileUploader.deleteFromCloudinary(uploadedImagePublicId);
            } catch (deleteError) {
                console.error('Failed to delete image from Cloudinary:', deleteError);
            }
        }

        // Clean up local file if it still exists
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        throw error;
    }
};

const updateEvent = async (id: string, req: Request, user: IJWTPayload) => {
    let uploadedImagePublicId: string | undefined;
    let localFilePath: string | undefined;
    let oldImagePublicId: string | undefined;

    try {
        // Find existing event
        const event = await prisma.event.findUniqueOrThrow({
            where: { id },
        });

        // Verify user
        const userInfo = await prisma.user.findUniqueOrThrow({
            where: {
                email: user?.email,
                status: UserStatus.ACTIVE
            }
        });

        // Host OR Admin Only
        if (event.hostId !== userInfo.id && userInfo.role !== UserRole.ADMIN) {
            throw new AppError(httpStatus.FORBIDDEN, "You're not authorized to update this event!");
        }

        // Extract old image public_id if exists
        if (event.image) {
            const urlParts = event.image.split('/');
            const publicIdWithExt = urlParts.slice(-2).join('/');
            oldImagePublicId = publicIdWithExt.split('.')[0];
        }

        // Upload new file to Cloudinary if provided
        if (req.file) {
            localFilePath = req.file.path;
            const uploadResult = await fileUploader.uploadToCloudinary(req.file);

            if (uploadResult && uploadResult.secure_url) {
                uploadedImagePublicId = uploadResult.public_id;
                req.body.image = uploadResult.secure_url;
            }

            // Delete local file after upload
            if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
                localFilePath = undefined;
            }
        }

        const { startDate, endDate, ...payload } = req.body as IEventUpdate;

        // Convert date strings to ISO DateTime format if provided
        const updateData: any = { ...payload };

        if (startDate) {
            updateData.startDate = new Date(startDate).toISOString();
        }

        if (endDate) {
            updateData.endDate = new Date(endDate).toISOString();
        }

        // Use transaction to update event
        const result = await prisma.$transaction(async (tnx) => {
            const updatedEvent = await tnx.event.update({
                where: { id },
                data: updateData,
                include: {
                    host: {
                        select: {
                            id: true,
                            email: true,
                            fullName: true,
                            profileImage: true
                        }
                    }
                }
            });

            // Delete old image from Cloudinary if new image was uploaded
            if (oldImagePublicId && uploadedImagePublicId) {
                try {
                    await fileUploader.deleteFromCloudinary(oldImagePublicId);
                } catch (deleteError) {
                    console.error('Failed to delete old image from Cloudinary:', deleteError);
                }
            }

            return updatedEvent;
        });

        return result;
    } catch (error) {
        // Clean up newly uploaded image if update fails
        if (uploadedImagePublicId) {
            try {
                await fileUploader.deleteFromCloudinary(uploadedImagePublicId);
            } catch (deleteError) {
                console.error('Failed to delete image from Cloudinary:', deleteError);
            }
        }

        // Clean up local file if it still exists
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        throw error;
    }
};

const deleteEvent = async (id: string, user: IJWTPayload) => {
    const event = await prisma.event.findUniqueOrThrow({
        where: { id },
    });

    // Verify user
    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user?.email,
            status: UserStatus.ACTIVE
        }
    });

    // Host OR Admin Only
    if (event.hostId !== userInfo.id && userInfo.role !== UserRole.ADMIN) {
        throw new AppError(httpStatus.FORBIDDEN, "You're not authorized to update this event!");
    }

    return prisma.event.delete({
        where: { id },
    });
};

const getSingleEvent = async (id: string) => {

    const event = await prisma.event.findUnique({
        where: { id },
        include: {
            host: {
                select: {
                    id: true,
                    email: true,
                    fullName: true,
                    role: true,
                    reviewsReceived: {
                        select: {
                            id: true,
                            rating: true,
                            comment: true,
                            eventId: true
                        }
                    }
                }
            },
            participants: {
                select: {
                    id: true,
                    userId: true,
                    eventId: true
                }
            },
            reviews: {
                select: {
                    id: true,
                    rating: true,
                    comment: true,
                    author: {
                        select: {
                            fullName: true,
                            profileImage: true
                        }
                    }
                }
            }
        }
    });

    if (!event) {
        throw new AppError(httpStatus.NOT_FOUND, "Event not found!");
    }

    return event;
};


const getAllEvents = async (params: any, options: IOptions) => {

    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options)
    const { searchTerm, ...filterData } = params;

    const andConditions: Prisma.EventWhereInput[] = [];

    const eventSearchableFields = ["name", "type", "description", "location"];
    if (searchTerm) {
        andConditions.push({
            OR: eventSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        })
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }

    const whereConditions: Prisma.EventWhereInput = andConditions.length > 0 ? {
        AND: andConditions
    } : {}

    const result = await prisma.event.findMany({
        skip,
        take: limit,

        where: whereConditions,
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            host: {
                select: {
                    id: true,
                    email: true,
                    fullName: true,
                    role: true
                }
            }
        },
    });

    const total = await prisma.event.count({
        where: whereConditions
    });
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
};

// Update event status (COMPLETED, CANCELLED)
const updateEventStatus = async (
    id: string,
    status: 'OPEN' | 'FULL' | 'CANCELLED' | 'COMPLETED',
    user: IJWTPayload
) => {
    // Find existing event
    const event = await prisma.event.findUniqueOrThrow({
        where: { id },
    });

    // Verify user
    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user?.email,
            status: UserStatus.ACTIVE
        }
    });

    // Host OR Admin Only
    if (event.hostId !== userInfo.id && userInfo.role !== UserRole.ADMIN) {
        throw new AppError(httpStatus.FORBIDDEN, "You're not authorized to update this event status!");
    }

    // Validate status transition
    if (event.status === 'COMPLETED') {
        throw new AppError(httpStatus.BAD_REQUEST, "Cannot change status of a completed event!");
    }

    if (event.status === 'CANCELLED' && status !== 'OPEN') {
        throw new AppError(httpStatus.BAD_REQUEST, "Cancelled event can only be reopened!");
    }

    // Update event status
    const result = await prisma.event.update({
        where: { id },
        data: { status },
        include: {
            host: {
                select: {
                    id: true,
                    email: true,
                    fullName: true,
                    profileImage: true,
                    role: true,
                }
            },
            participants: {
                select: {
                    id: true,
                    userId: true,
                    paymentStatus: true
                }
            }
        }
    });

    return result;
};

export const EventService = {
    createEvent,
    getAllEvents,
    getSingleEvent,
    updateEvent,
    deleteEvent,
    updateEventStatus,
};
