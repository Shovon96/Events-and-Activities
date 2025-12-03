import { Request, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import filterPick from "../../helpers/filterPick";
import { IJWTPayload } from "../../types/common";

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

const getMyProfile = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {

    const user = req.user;

    const result = await UserService.getMyProfile(user as IJWTPayload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My profile data fetched!",
        data: result
    })
});

// Update my profile
const updateMyProfile = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user;
    const result = await UserService.updateMyProfile(req, user as IJWTPayload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Profile updated successfully!",
        data: result
    })
});

export const UserController = {
    createUser,
    getAllUsers,
    getMyProfile,
    updateMyProfile,
}