import { EventStatus, Prisma, UserRole, UserStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import AppError from "../../errorHandler/AppError";
import httpStatus from "http-status";
import { IEventCreate, IEventUpdate } from "./event.interface";
import { IJWTPayload } from "../../types/common";
import { Request } from "express";
import { fileUploader } from "../../helpers/fileUploader";
import fs from 'fs';

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


export const EventService = {
    createEvent,

};
