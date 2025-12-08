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
    if (event.status !== EventStatus.COMPLETED) {
        throw new AppError(httpStatus.BAD_REQUEST, "This Event is not completed. You can't review now!");
    }

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

const updateReview = async (
    reviewId: string,
    user: IJWTPayload,
    payload: {
        rating?: number;
        comment?: string;
    }
) => {
    // Get user info
    const userInfo = await prisma.user.findUnique({
        where: {
            email: user?.email,
            status: UserStatus.ACTIVE
        },
    });
    if (!userInfo) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }

    const review = await prisma.review.findUnique({
        where: { id: reviewId },
    });

    if (!review) {
        throw new AppError(httpStatus.NOT_FOUND, "Review not found!");
    }

    // Ownership check - only author can update their review
    if (review.authorId !== userInfo.id) {
        throw new AppError(
            httpStatus.FORBIDDEN,
            "You are not authorized to update this review!"
        );
    }

    const updated = await prisma.review.update({
        where: { id: reviewId },
        data: payload,
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

    return updated;
};

const deleteReview = async (reviewId: string, user: IJWTPayload) => {
    // Get user info
    const userInfo = await prisma.user.findUnique({
        where: {
            email: user?.email,
            status: UserStatus.ACTIVE
        },
    });
    if (!userInfo) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }

    const review = await prisma.review.findUnique({
        where: { id: reviewId },
    });

    if (!review) {
        throw new AppError(httpStatus.NOT_FOUND, "Review not found!");
    }

    // Only author or admin can delete
    const isAuthor = review.authorId === userInfo.id;
    const isAdmin = user.role === "ADMIN";

    if (!isAuthor && !isAdmin) {
        throw new AppError(
            httpStatus.FORBIDDEN,
            "You are not authorized to delete this review!"
        );
    }

    await prisma.review.delete({
        where: { id: reviewId },
    });

    return { message: "Review deleted successfully" };
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

// Get average rating for an event
const getEventAverageRating = async (eventId: string) => {

    // Verify event exists
    await prisma.event.findUniqueOrThrow({
        where: { id: eventId }
    });

    // Get all reviews for the event
    const reviews = await prisma.review.findMany({
        where: { eventId },
        select: {
            rating: true
        }
    });

    if (reviews.length === 0) {
        return {
            eventId,
            averageRating: 0,
            totalReviews: 0,
            message: "No reviews found for this event!",
            ratingDistribution: {
                "5": 0,
                "4": 0,
                "3": 0,
                "2": 0,
                "1": 0,
            }
        };
    }

    // Calculate average rating
    const totalRating = reviews.reduce((sum, review) => sum + Number(review.rating), 0);
    const averageRating = totalRating / reviews.length;

    return {
        eventId,
        averageRating: Number(averageRating.toFixed(1)),
        totalReviews: reviews.length,
        ratingDistribution: {
            "5": reviews.filter(r => Math.round(Number(r.rating)) === 5).length,
            "4": reviews.filter(r => Math.round(Number(r.rating)) === 4).length,
            "3": reviews.filter(r => Math.round(Number(r.rating)) === 3).length,
            "2": reviews.filter(r => Math.round(Number(r.rating)) === 2).length,
            "1": reviews.filter(r => Math.round(Number(r.rating)) === 1).length,
        }
    };
};

// Get average rating for a host
const getHostAverageRating = async (hostId: string) => {
    // Verify host exists
    await prisma.user.findUniqueOrThrow({
        where: { id: hostId }
    });

    // Get all reviews for the host
    const reviews = await prisma.review.findMany({
        where: { toId: hostId },
        select: {
            rating: true
        }
    });

    if (reviews.length === 0) {
        return {
            hostId,
            averageRating: 0,
            totalReviews: 0,
            message: "No reviews found for this host",
            ratingDistribution: {
                "5": 0,
                "4": 0,
                "3": 0,
                "2": 0,
                "1": 0,
            }
        };
    }

    // Calculate average rating
    const totalRating = reviews.reduce((sum, review) => sum + Number(review.rating), 0);
    const averageRating = totalRating / reviews.length;

    return {
        hostId,
        averageRating: Number(averageRating.toFixed(1)),
        totalReviews: reviews.length,
        ratingDistribution: {
            "5": reviews.filter(r => Math.round(Number(r.rating)) === 5).length,
            "4": reviews.filter(r => Math.round(Number(r.rating)) === 4).length,
            "3": reviews.filter(r => Math.round(Number(r.rating)) === 3).length,
            "2": reviews.filter(r => Math.round(Number(r.rating)) === 2).length,
            "1": reviews.filter(r => Math.round(Number(r.rating)) === 1).length,
        }
    };
};

export const ReviewService = {
    postReview,
    updateReview,
    deleteReview,
    getReviewsByEvent,
    getEventAverageRating,
    getHostAverageRating, 
};
