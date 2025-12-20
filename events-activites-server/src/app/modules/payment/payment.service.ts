/* eslint-disable @typescript-eslint/no-explicit-any */

import Stripe from "stripe";
import { prisma } from "../../shared/prisma";
import { PaymentStatus } from "@prisma/client";
import { IOptions, paginationHelper } from "../../helpers/paginationHelper";

// const handleStripeWebhookEvent = async (event: Stripe.Event) => {
//     switch (event.type) {
//         case "checkout.session.completed": {

//             const session = event.data.object as any;
//             const eventId = session.metadata?.eventId;
//             const userId = session.metadata?.userId;
//             const paymentId = session.metadata?.paymentId;

//             // Use transaction to update both Payment and Participant
//             await prisma.$transaction(async (tx) => {
//                 // Update Payment status
//                 await tx.payment.update({
//                     where: { id: paymentId },
//                     data: {
//                         paymentStatus: session.payment_status === "paid"
//                             ? PaymentStatus.PAID
//                             : PaymentStatus.UNPAID,
//                         transactionId: session.id,
//                         paymentGatewayData: session,
//                     },
//                 });

//                 // Update Participant payment status using composite unique key
//                 await tx.participant.update({
//                     where: {
//                         userId_eventId: {
//                             userId: userId,
//                             eventId: eventId
//                         }
//                     },
//                     data: {
//                         paymentStatus: session.payment_status === "paid"
//                             ? PaymentStatus.PAID
//                             : PaymentStatus.UNPAID,
//                     }
//                 });
//             });

//             break;
//         }

//         default:
//             console.log(`ℹ️ Unhandled Stripe webhook type: ${event.type}`);
//     }

//     return true;
// };

const handleStripeWebhookEvent = async (event: Stripe.Event) => {

    switch (event.type) {
        case "checkout.session.completed": {

            const session = event.data.object as any;
            const eventId = session.metadata?.eventId;
            const userId = session.metadata?.userId;
            const paymentId = session.metadata?.paymentId;

            if (!eventId || !userId || !paymentId) {
                console.error('❌ Missing metadata in session:', session.metadata);
                break;
            }

            try {
                // Use transaction to update both Payment and Participant
                await prisma.$transaction(async (tx) => {
                    // Update Payment status
                    await tx.payment.update({
                        where: { id: paymentId },
                        data: {
                            paymentStatus: session.payment_status === "paid"
                                ? PaymentStatus.PAID
                                : PaymentStatus.UNPAID,
                            transactionId: session.id,
                            paymentGatewayData: session,
                        },
                    });

                    // Update Participant payment status using composite unique key
                    await tx.participant.update({
                        where: {
                            userId_eventId: {
                                userId: userId,
                                eventId: eventId
                            }
                        },
                        data: {
                            paymentStatus: session.payment_status === "paid"
                                ? PaymentStatus.PAID
                                : PaymentStatus.UNPAID,
                        }
                    });
                });
            } catch (error) {
                console.error('❌ Error updating payment/participant:', error);
                throw error;
            }
            break;
        }

        case "payment_intent.succeeded": {

            const paymentIntent = event.data.object as any;

            try {
                // Get the checkout session from payment intent
                const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
                const sessions = await stripe.checkout.sessions.list({
                    payment_intent: paymentIntent.id,
                    limit: 1
                });

                if (sessions.data.length === 0) {
                    console.error('❌ No checkout session found for payment intent:', paymentIntent.id);
                    break;
                }

                const session = sessions.data[0];
                const eventId = session.metadata?.eventId;
                const userId = session.metadata?.userId;
                const paymentId = session.metadata?.paymentId;

                if (!eventId || !userId || !paymentId) {
                    console.error('❌ Missing metadata in session:', session.metadata);
                    break;
                }

                // Use transaction to update both Payment and Participant
                await prisma.$transaction(async (tx) => {
                    // Update Payment status
                    await tx.payment.update({
                        where: { id: paymentId },
                        data: {
                            paymentStatus: PaymentStatus.PAID,
                            transactionId: paymentIntent.id,
                            paymentGatewayData: paymentIntent,
                        },
                    });
                    // Update Participant payment status using composite unique key
                    await tx.participant.update({
                        where: {
                            userId_eventId: {
                                userId: userId,
                                eventId: eventId
                            }
                        },
                        data: {
                            paymentStatus: PaymentStatus.PAID,
                        }
                    });
                });
            } catch (error) {
                console.error('❌ Error processing payment_intent.succeeded:', error);
                throw error;
            }
            break;
        }

        default:
            console.log(`ℹ️ Unhandled Stripe webhook type: ${event.type}`);
    }

    return true;
};


const getEventPaymentHistory = async (eventId: string, options: IOptions) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);

    // Verify event exists
    await prisma.event.findUniqueOrThrow({ where: { id: eventId } });
    const data = await prisma.payment.findMany({
        where: { eventId },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        select: {
            id: true,
            amount: true,
            paymentStatus: true,
            transactionId: true,
            user: {
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                },
            },
        },
    });

    const total = await prisma.payment.count({ where: { eventId } });

    // Compute total revenue (sum of amounts) for PAID payments of this event
    const revenueAgg = await prisma.payment.aggregate({
        where: { eventId, paymentStatus: PaymentStatus.PAID },
        _sum: { amount: true },
    });

    const totalRevenue = revenueAgg._sum?.amount ?? 0;

    return {
        meta: { page, limit, total },
        totalRevenue,
        data,
    };
};

const getUserPaymentHistory = async (userId: string, options: IOptions) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);

    // Verify user exists
    await prisma.user.findUniqueOrThrow({ where: { id: userId } });

    const data = await prisma.payment.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        select: {
            id: true,
            amount: true,
            paymentStatus: true,
            transactionId: true,
            event: {
                select: {
                    id: true,
                    name: true,
                    startDate: true,
                    endDate: true,
                }
            }
        }
    });

    const total = await prisma.payment.count({ where: { userId } });

    return {
        meta: { page, limit, total },
        data,
    };
};

export const PaymentService = {
    handleStripeWebhookEvent,
    getEventPaymentHistory
    , getUserPaymentHistory
};
