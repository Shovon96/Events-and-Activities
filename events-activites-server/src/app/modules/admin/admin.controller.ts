import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { AdminService } from "./admin.service";

const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminService.getDashboardStats();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Dashboard statistics retrieved successfully!",
        data: result
    });
});

const getUserDetails = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AdminService.getUserDetails(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User details retrieved successfully!",
        data: result
    });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const result = await AdminService.updateUserStatus(id, status);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User status updated successfully!",
        data: result
    });
});

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role } = req.body;
    const result = await AdminService.updateUserRole(id, role);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User role updated successfully!",
        data: result
    });
});

const RemoveUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await AdminService.removeUser(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User removed successfully!",
        data: null
    });
});

export const AdminController = {
    getDashboardStats,
    getUserDetails,
    updateUserStatus,
    updateUserRole,
    RemoveUser
};
