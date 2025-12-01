import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { EventService } from "./event.service";
import { IJWTPayload } from "../../types/common";
import filterPick from "../../helpers/filterPick";

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

const updateEvent = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {
    const id = req.params.id;
    const user = req.user;
    const result = await EventService.updateEvent(id, req, user as IJWTPayload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Event updated successfully!",
        data: result,
    });
});

// const deleteEvent = catchAsync(async (req: Request, res: Response) => {
//     const id = req.params.id;
//     await EventService.deleteEvent(id, req.user);

//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "Event deleted successfully!",
//         data: null
//     });
// });

const getSingleEvent = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await EventService.getSingleEvent(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Event retrieved successfully!",
        data: result,
    });
});

const getAllEvents = catchAsync(async (req: Request, res: Response) => {
    const userFilterableFields = ["name", "type", "location", "startDate", "endDate", "searchTerm"];
    const filters = filterPick(req?.query, userFilterableFields) // searching , filtering
    const options = filterPick(req.query, ["page", "limit", "sortBy", "sortOrder"]) // pagination and sorting

    const result = await EventService.getAllEvents(filters, options);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Events retrieved successfully!",
        data: result,
    });
});

export const EventController = {
    createEvent,
    getAllEvents,
    getSingleEvent,
    updateEvent,
    // deleteEvent,
};
