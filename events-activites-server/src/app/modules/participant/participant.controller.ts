import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { ParticipantService } from "./participant.service";
import { IJWTPayload } from "../../types/common";
import filterPick from "../../helpers/filterPick";

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

const partcipantListByEvent = catchAsync(async (req: Request, res: Response) => {
    const { eventId } = req.params;
    const userFilterableFields = ["name", "email", "searchTerm"];
    const filters = filterPick(req?.query, userFilterableFields) // searching , filtering
    const options = filterPick(req.query, ["page", "limit", "sortBy", "sortOrder"]) // pagination and sorting
    const result = await ParticipantService.partcipantListByEvent(eventId, filters, options);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Participants fetched successfully!",
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
    partcipantListByEvent,
    getMyJoinedEvents
}