import { EventStatus, UserRole, UserStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import AppError from "../../errorHandler/AppError";
import httpStatus from "http-status";
import { IJWTPayload } from "../../types/common";

const joinEvent = async (eventId: string, user: IJWTPayload) => {
    // Verify user exists and is active
    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user?.email,
            status: UserStatus.ACTIVE
        }
    });

    if (!userInfo) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }

    // Verify event exists and is open
    const event = await prisma.event.findUniqueOrThrow({
        where: { id: eventId },
        include: {
            participants: true
        }
    });

    if (event.status !== EventStatus.OPEN) {
        throw new AppError(httpStatus.BAD_REQUEST, "Event is not open for registration!");
    }

    // Check if user is the host
    if (event.hostId === userInfo.id) {
        throw new AppError(httpStatus.BAD_REQUEST, "Host cannot join their own event!");
    }

    // Check if already joined
    const alreadyJoined = await prisma.participant.findFirst({
        where: {
            userId: userInfo.id,
            eventId: eventId
        }
    });

    if (alreadyJoined) {
        throw new AppError(httpStatus.CONFLICT, "You have already joined this event!");
    }

    // Check if event is full
    if (event.maxParticipants && event.participants.length >= event.maxParticipants) {
        throw new AppError(httpStatus.BAD_REQUEST, "Event is full!");
    }

    // Use transaction to join event and update status if needed
    const result = await prisma.$transaction(async (tx) => {
        const participant = await tx.participant.create({
            data: {
                userId: userInfo.id,
                eventId: eventId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        profileImage: true
                    }
                },
                event: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
                        location: true,
                        startDate: true,
                        endDate: true,
                        ticketPrice: true
                    }
                }
            }
        });

        // Update event status to FULL if max participants reached
        const updatedParticipantCount = event.participants.length + 1;
        if (event.maxParticipants && updatedParticipantCount >= event.maxParticipants) {
            await tx.event.update({
                where: { id: eventId },
                data: { status: EventStatus.FULL }
            });
        }

        return participant;
    });

    return result;
}


export const ParticipantService = {
    joinEvent
}