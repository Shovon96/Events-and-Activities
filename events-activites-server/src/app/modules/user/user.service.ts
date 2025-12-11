/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "../../shared/prisma";
import bcrypt from "bcrypt";
import config from "../../../config";
import AppError from "../../errorHandler/AppError";
import httpStatus from "http-status";
import { Request } from "express";
import { fileUploader } from "../../helpers/fileUploader";
import fs from 'fs';
import { IOptions, paginationHelper } from "../../helpers/paginationHelper";
import { Prisma, User, UserRole, UserStatus } from "@prisma/client";
import { IJWTPayload } from "../../types/common";

const createUser = async (req: Request) => {
    try {
        // Upload file to Cloudinary if provided
        if (req.file) {
            const uploadResult = await fileUploader.uploadToCloudinary(req.file);

            if (uploadResult && uploadResult.secure_url) {
                req.body.profileImage = uploadResult.secure_url;
            }

            // Delete local file after upload
            if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
            }
        }

        // Check if user already exists
        const exists = await prisma.user.findUnique({ where: { email: req.body?.email } });
        if (exists) {
            throw new AppError(httpStatus.CONFLICT, "User already exists");
        }

        // Prevent admin creation through this endpoint
        if (req.body?.role === UserRole.ADMIN) {
            throw new AppError(httpStatus.FORBIDDEN, "You're not authorized to create admin.");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(req.body?.password, Number(config.bcrypt_salt_rounds) || 10);

        // Create user
        const result = await prisma.user.create({
            data: {
                email: req.body.email,
                password: hashedPassword,
                fullName: req.body.fullName,
                profileImage: req.body.profileImage,
                bio: req.body.bio,
                interests: req.body.interests || [],
                city: req.body.city,
                role: req.body.role || "USER",
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                profileImage: true,
                interests: true,
                bio: true,
                city: true,
                role: true,
                createdAt: true,
            }
        });

        return result;
    } catch (error) {
        // Clean up file if it exists
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        throw error;
    }
}

const getAllUsers = async (params: any, options: IOptions) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options)
    const { searchTerm, ...filterData } = params;

    const andConditions: Prisma.UserWhereInput[] = [];

    const userSearchableFields = ["email", "fullName", "city"];
    if (searchTerm) {
        andConditions.push({
            OR: userSearchableFields.map(field => ({
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

    const whereConditions: Prisma.UserWhereInput = andConditions.length > 0 ? {
        AND: andConditions
    } : {}

    const result = await prisma.user.findMany({
        skip,
        take: limit,

        where: whereConditions,
        orderBy: {
            [sortBy]: sortOrder
        }
    });

    const total = await prisma.user.count({
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
}

const getMyProfile = async (user: IJWTPayload) => {

    const userInfo = await prisma.user.findUnique({
        where: {
            email: user?.email,
            status: UserStatus.ACTIVE
        },
        select: {
            id: true,
            email: true,
            fullName: true,
            profileImage: true,
            city: true,
            bio: true,
            interests: true,
            role: true,
            status: true
        }
    })

    if (!userInfo) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }

    let profileData;

    if (userInfo.role === UserRole.USER || userInfo.role === UserRole.ADMIN) {
        profileData = await prisma.user.findUnique({
            where: {
                email: userInfo.email
            },
            select: {
                joinedEvents: {
                    select: {
                        id: true,
                        paymentStatus: true,
                        event: {
                            select: {
                                id: true,
                                name: true,
                                status: true,
                                reviews: {
                                    select: {
                                        id: true,
                                        rating: true,
                                        comment: true,
                                    }
                                },
                                ticketPrice: true,
                                host: {
                                    select: {
                                        id: true,
                                        email: true,
                                        fullName: true,
                                        profileImage: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    }

    if(userInfo.role === UserRole.HOST || userInfo.role === UserRole.ADMIN){
        profileData = await prisma.user.findUnique({
            where: {
                email: userInfo.email
            },
            select: {
                hostedEvents: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                        image: true,
                        type: true,
                        ticketPrice: true,
                        description: true,
                        startDate: true,
                        endDate: true,
                        location: true,
                        maxParticipants: true,
                        participants: {
                            select: {
                                id: true,
                                userId: true,
                                eventId: true,
                                paymentStatus: true
                            }
                        },
                        host: {
                            select: {
                                id: true,
                                email: true,
                                fullName: true,
                                profileImage: true
                            }
                        }
                    }
                }
            }
        })
    }

    return {
        ...userInfo,
        ...profileData
    };

};

// Update user profile (name, bio, interests, city)
const updateMyProfile = async (req: Request, user: IJWTPayload) => {

    let uploadedImagePublicId: string | undefined;
    let localFilePath: string | undefined;
    let oldImagePublicId: string | undefined;

    try {
        // Verify user exists
        const userInfo = await prisma.user.findUniqueOrThrow({
            where: {
                email: user?.email,
                status: UserStatus.ACTIVE
            }
        });

        if (!userInfo) {
            throw new AppError(httpStatus.NOT_FOUND, "User not found!");
        }

        // not to be update payload
        if (req.body.email || req.body.password || req.body.role || req.body.status) {
            throw new AppError(httpStatus.FORBIDDEN, `You can't update ${req.body.email || req.body.password || req.body.role || req.body.status}!`);
        }

        // Extract old image public_id if exists
        if (userInfo.profileImage) {
            const urlParts = userInfo.profileImage.split('/');
            const publicIdWithExt = urlParts.slice(-2).join('/');
            oldImagePublicId = publicIdWithExt.split('.')[0];
        }

        // Upload new profile image if provided
        if (req.file) {
            localFilePath = req.file.path;
            const uploadResult = await fileUploader.uploadToCloudinary(req.file);

            if (uploadResult && uploadResult.secure_url) {
                uploadedImagePublicId = uploadResult.public_id;
                req.body.profileImage = uploadResult.secure_url;
            }

            // Delete local file after upload
            if (fs.existsSync(req.file.path)) {
                fs.unlinkSync(req.file.path);
                localFilePath = undefined;
            }
        }

        // Prepare update data
        const updateData: Partial<User> = {};

        if (req.body.fullName) updateData.fullName = req.body.fullName;
        if (req.body.bio) updateData.bio = req.body.bio;
        if (req.body.city) updateData.city = req.body.city;
        if (req.body.interests) updateData.interests = req.body.interests;
        if (req.body.profileImage) updateData.profileImage = req.body.profileImage;

        // Use transaction to update profile
        const result = await prisma.$transaction(async (tx) => {
            const updatedUser = await tx.user.update({
                where: { id: userInfo.id },
                data: updateData,
                select: {
                    id: true,
                    email: true,
                    fullName: true,
                    bio: true,
                    profileImage: true,
                    interests: true,
                    city: true,
                    role: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
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

            return updatedUser;
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


export const UserService = {
    createUser,
    getAllUsers,
    getMyProfile,
    updateMyProfile
}