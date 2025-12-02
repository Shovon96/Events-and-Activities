import Stripe from "stripe";
import { prisma } from "../../shared/prisma";
import { PaymentStatus } from "@prisma/client";

const handleStripeWebhookEvent = async (event: Stripe.Event) => {
    switch (event.type) {
        case "checkout.session.completed": {

            const session = event.data.object as any;
            const eventId = session.metadata?.eventId;
            const userId = session.metadata?.userId;
            const paymentId = session.metadata?.paymentId;

            console.log('🔔 Webhook received:', {
                eventId,
                userId,
                paymentId,
                paymentStatus: session.payment_status
            });

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

                console.log('✅ Payment updated:', paymentId);

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

                console.log('✅ Participant payment status updated');
            });

            break;
        }

        default:
            console.log(`ℹ️ Unhandled Stripe webhook type: ${event.type}`);
    }

    return true;
};

// Previous implementation (commented for reference)
// const handleStripeWebhookEvent = async (event: Stripe.Event) => {
//     switch (event.type) {
//         case "checkout.session.completed": {

//             const session = event.data.object as any;
//             const eventId = session.metadata?.eventId;
//             const userId = session.metadata?.userId;
//             const paymentId = session.metadata?.paymentId;

//             await prisma.payment.update({
//                 where: { id: paymentId },
//                 data: {
//                     paymentStatus: session.payment_status === "paid"
//                         ? PaymentStatus.PAID
//                         : PaymentStatus.UNPAID,
//                     transactionId: session.id,
//                     paymentGatewayData: session,
//                 },
//             });

//             await prisma.participant.update({
//                 where: {
//                     id: userId  // ❌ This was wrong - userId is not a unique field
//                 },
//                 data: {
//                     paymentStatus: session.payment_status === "paid" ? PaymentStatus.PAID : PaymentStatus.UNPAID,
//                 }
//             })

//             break;
//         }

//         default:
//             console.log(`ℹ️ Unhandled Stripe webhook type: ${event.type}`);
//     }

//     return true;
// };

export const PaymentService = {
    handleStripeWebhookEvent,
};
