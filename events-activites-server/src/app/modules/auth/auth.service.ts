import { UserStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcrypt";
import AppError from "../../errorHandler/AppError";
import httpStatus from "http-status";
import { jwtHelper } from "../../helpers/jwtHelper";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { IPassword } from "./auth.interface";

const login = async (payload: { email: string, password: string }) => {
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    })

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }

    const isCorrectPassword = await bcrypt.compare(payload.password, user.password);
    if (!isCorrectPassword) {
        throw new AppError(httpStatus.BAD_REQUEST, "Password is incorrect!")
    }

    const accessToken = jwtHelper.generateToken({ email: user.email, role: user.role }, config.jwt.jwt_secret as Secret, "1d");

    const refreshToken = jwtHelper.generateToken({ email: user.email, role: user.role }, config.jwt.refresh_secret as Secret, "90d");

    return {
        accessToken,
        refreshToken,
        user
    }
}

const getMe = async (session: any) => {
    const accessToken = session.accessToken;
    const decodedData = jwtHelper.verifyToken(accessToken, config.jwt.jwt_secret as Secret);

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: decodedData.email,
            status: UserStatus.ACTIVE
        }
    })

    const { id, email, role, status } = userData;

    return {
        id,
        email,
        role,
        status
    }

}

const changePassword = async (user: any, payload: IPassword) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: UserStatus.ACTIVE
        }
    });

    const isCorrectPassword: boolean = await bcrypt.compare(payload.oldPassword, userData.password);

    if (!isCorrectPassword) {
        throw new Error("Old password is incorrect!")
    }

    const hashedPassword: string = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds));

    await prisma.user.update({
        where: {
            email: userData.email
        },
        data: {
            password: hashedPassword
        }
    })

    return {
        message: "Password changed successfully!"
    }
};

export const AuthService = {
    login,
    getMe,
    changePassword
}