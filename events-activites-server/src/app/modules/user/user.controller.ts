// src/modules/user/user.controller.ts
import { Request, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import filterPick from "../../helpers/filterPick";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createUser(req);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User created successfully!",
        data: result
    })
})

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const userFilterableFields = ["status", "role", "email", "searchTerm"];
    const filters = filterPick(req.query, userFilterableFields) // searching , filtering
    const options = filterPick(req.query, ["page", "limit", "sortBy", "sortOrder"]) // pagination and sorting

    const result = await UserService.getAllUsers(filters, options);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User retrive successfully!",
        meta: result.meta,
        data: result.data
    })
})

export const UserController = {
    createUser,
    getAllUsers
}