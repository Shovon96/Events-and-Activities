import { prisma } from "../../shared/prisma";
import bcrypt from "bcrypt";
import config from "../../../config";
import AppError from "../../errorHandler/AppError";
import httpStatus from "http-status";
import { Request } from "express";
import { fileUploader } from "../../helpers/fileUploader";
import fs from 'fs';
import { IOptions, paginationHelper } from "../../helpers/paginationHelper";
import { Prisma } from "@prisma/client";

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

export const UserService = {
    createUser,
    getAllUsers
}