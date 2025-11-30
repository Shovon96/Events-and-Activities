// src/modules/user/user.controller.ts
import { Request, Response } from "express";
import { UserService } from "./user.service";
import { createUserValidationSchema } from "./user.validation";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";


const createUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await UserService.createUser(payload);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User created successfully!",
        data: result
    })
})

const getUsers = catchAsync(async (req: Request, res: Response) => {
    console.log("all user")

})

export const UserController = {
    createUser,
    getUsers
}