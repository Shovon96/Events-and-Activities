import { UserStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcrypt";
import AppError from "../../errorHandler/AppError";
import httpStatus from "http-status";
import { jwtHelper } from "../../helpers/jwtHelper";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const login = async (payload: { email: string, password: string }) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    })

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

export const AuthService = {
    login
}