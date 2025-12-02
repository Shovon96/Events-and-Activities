import { EventStatus, Prisma, UserRole, UserStatus } from "@prisma/client";
import { prisma } from "../../shared/prisma";
import AppError from "../../errorHandler/AppError";
import httpStatus from "http-status";
import { IJWTPayload } from "../../types/common";
import { IOptions, paginationHelper } from "../../helpers/paginationHelper";

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

const partcipantListByEvent = async (eventId: string, params: any, options: IOptions) => {

    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options)
    const { searchTerm, ...filterData } = params;

    // Verify event exists
    await prisma.event.findUniqueOrThrow({
        where: { id: eventId }
    });

    const andConditions: Prisma.ParticipantWhereInput[] = [];

    // Always restrict to the specific event
    andConditions.push({ eventId });

    // Search on related user fields
    if (searchTerm) {
        andConditions.push({
            OR: [
                { user: { fullName: { contains: searchTerm, mode: 'insensitive' } } },
                { user: { email: { contains: searchTerm, mode: 'insensitive' } } },
                { user: { city: { contains: searchTerm, mode: 'insensitive' } } },
            ]
        });
    }

    // Filter on related user fields
    if (Object.keys(filterData).length > 0) {
        const filterConditions: Prisma.ParticipantWhereInput[] = [];
        for (const key of Object.keys(filterData)) {
            const value = (filterData as any)[key];
            if (key === 'name') {
                filterConditions.push({ user: { fullName: { equals: value } } });
            } else if (key === 'email') {
                filterConditions.push({ user: { email: { equals: value } } });
            } else if (key === 'city') {
                filterConditions.push({ user: { city: { equals: value } } });
            } else {
                // fallback to participant fields
                filterConditions.push({ [key]: { equals: value } } as any);
            }
        }
        if (filterConditions.length > 0) {
            andConditions.push({ AND: filterConditions });
        }
    }

    const whereConditions: Prisma.ParticipantWhereInput = { AND: andConditions };

    const result = await prisma.participant.findMany({
        skip,
        take: limit,

        where: whereConditions,
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    fullName: true,
                    profileImage: true,
                    city: true,
                    interests: true
                }
            }
        },
    });

    const total = await prisma.participant.count({
        where: whereConditions
    });
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
}

const getMyJoinedEvents = async (user: IJWTPayload) => {
    // Verify user
    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user?.email,
            status: UserStatus.ACTIVE
        }
    });

    return prisma.participant.findMany({
        where: { userId: userInfo.id },
        include: {
            event: {
                include: {
                    host: {
                        select: {
                            id: true,
                            email: true,
                            fullName: true,
                            profileImage: true
                        }
                    },
                    participants: true
                }
            }
        },
        orderBy: { createdAt: "desc" },
    });
}

export const ParticipantService = {
    joinEvent,
    partcipantListByEvent,
    getMyJoinedEvents
}