import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { ParticipantService } from "./participant.service";
import { IJWTPayload } from "../../types/common";

const joinEvent = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const { eventId } = req.body;
    const user = req.user;
    const result = await ParticipantService.joinEvent(eventId, user as IJWTPayload);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Successfully joined the event!",
        data: result,
    });
})


const getMyJoinedEvents = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const user = req.user;
    const result = await ParticipantService.getMyJoinedEvents(user as IJWTPayload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Your joined events fetched successfully!",
        data: result,
    });
})

export const ParticipantController = {
    joinEvent,
    getMyJoinedEvents
}