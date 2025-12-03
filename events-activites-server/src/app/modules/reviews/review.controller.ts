import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { ReviewService } from "./review.service";
import { IJWTPayload } from "../../types/common";
import filterPick from "../../helpers/filterPick";

const postReview = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {

    const user = req.user as IJWTPayload;
    const result = await ReviewService.postReview(user, req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Review added successfully!",
        data: result,
    });
})

const getEventByReviews = catchAsync(async (req: Request, res: Response) => {

    const { eventId } = req.params;
    const options = filterPick(req.query, ["page", "limit", "sortBy", "sortOrder"]) // pagination and sorting
    const result = await ReviewService.getReviewsByEvent(eventId, options);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Reviews fetched successfully!",
        data: result,
    });
});

export const ReviewController = {
    postReview,
    getEventByReviews,
};
