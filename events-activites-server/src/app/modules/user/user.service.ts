import { prisma } from "../../shared/prisma";
import bcrypt from "bcrypt";
import config from "../../../config";
import AppError from "../../errorHandler/AppError";
import httpStatus from "http-status";
import { Request } from "express";
import { fileUploader } from "../../helpers/fileUploader";
import fs from 'fs';

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
        if (req.body?.role === "ADMIN") {
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

export const UserService = {
    createUser
}