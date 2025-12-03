import { prisma } from "../../shared/prisma";
import AppError from "../../errorHandler/AppError";
import httpStatus from "http-status";
import { IJWTPayload } from "../../types/common";
import { EventStatus, UserStatus } from "@prisma/client";
import { IOptions, paginationHelper } from "../../helpers/paginationHelper";

const postReview = async (
    user: IJWTPayload,
    payload: {
        eventId: string;
        rating: number;
        comment?: string;
    }
) => {
    const { eventId, rating, comment } = payload;

    // userInfo
    const userInfo = await prisma.user.findUnique({
        where: {
            email: user?.email,
            status: UserStatus.ACTIVE
        },
    });
    if (!userInfo) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }
    const userId = userInfo.id;

    // 1️⃣ Validate event
    const event = await prisma.event.findUnique({
        where: { id: eventId },
    });
    if (!event) {
        throw new AppError(httpStatus.NOT_FOUND, "Event not found!");
    }

    // 2️⃣ Validate participant
    const isParticipant = await prisma.participant.findFirst({
        where: {
            eventId,
            userId
        },
    });

    if (!isParticipant) {
        throw new AppError(
            httpStatus.FORBIDDEN,
            "You must participate in this event to review!"
        );
    }

    // Is Event completed
    // if (event.status !== EventStatus.COMPLETED) {
    //     throw new AppError(httpStatus.BAD_REQUEST, "Event is not completed. You can't review now!");
    // }

    // 3️⃣ Enforce 1 review per event
    const exist = await prisma.review.findFirst({
        where: { authorId: userId, eventId },
    });
    if (exist) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "You already reviewed this event!"
        );
    }

    const review = await prisma.review.create({
        data: {
            rating,
            comment,
            eventId,
            authorId: userId,
            toId: event.hostId,
        },
    });

    return review;
};


const getReviewsByEvent = async (eventId: string, options: IOptions) => {

    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);

    // Verify event exists
    await prisma.event.findUniqueOrThrow({
        where: { id: eventId }
    });

    const reviews = await prisma.review.findMany({
        where: { eventId },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            author: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    profileImage: true,
                },
            },
        },
    });

    const total = await prisma.review.count({
        where: { eventId }
    });

    return {
        meta: {
            page,
            limit,
            total
        },
        data: reviews
    };
};

export const ReviewService = {
    postReview,
    // updateReview,
    // deleteReview,
    getReviewsByEvent,
};
