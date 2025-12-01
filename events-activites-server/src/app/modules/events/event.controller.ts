import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { EventService } from "./event.service";
import { IJWTPayload } from "../../types/common";

const createEvent = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user;
    const result = await EventService.createEvent(req, user as IJWTPayload);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Event created successfully!",
        data: result,
    });
});


export const EventController = {
    createEvent
};
