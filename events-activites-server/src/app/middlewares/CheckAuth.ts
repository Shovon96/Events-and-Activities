/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import config from "../../config";
import { Secret } from "jsonwebtoken";
import AppError from "../errorHandler/AppError";
import { jwtHelper } from "../helpers/jwtHelper";

const CheckAuth = (...roles: string[]) => {
    return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.accessToken;

            if (!token) {
                throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!")
            }

            const verifyUser = jwtHelper.verifyToken(token, config.jwt.jwt_secret as Secret);

            req.user = verifyUser;

            if (roles.length && !roles.includes(verifyUser.role)) {
                throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!")
            }

            next();
        }
        catch (err) {
            next(err)
        }
    }
}

export default CheckAuth;