/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { stripe } from "../../helpers/stripe";
import { PaymentService } from "./payment.service";
import httpStatus from "http-status";
import filterPick from "../../helpers/filterPick";

const handleStripeWebhookEvent = catchAsync(async (req: Request, res: Response) => {

    // Get the correct signature header (stripe-signature, not stripe-signature_test)
    const sig = req.headers["stripe-signature"] as string;
    // const webhookSecret = "whsec_46af8efe5cc24b523848fecb2502729e6e8c7251889433538255276bbf571a83"
    const webhookSecret = "whsec_4pgLNDHRGSEDJ89FKg8oInsTouNaQvrj"

    if (!sig) {
        console.error("❌ No stripe-signature header found");
        return res.status(400).send('No signature header');
    }

    if (!webhookSecret) {
        console.error("❌ Webhook secret not configured");
        return res.status(500).send('Webhook secret not configured');
    }

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            webhookSecret
        );
        console.log('✅ Webhook signature verified');
    } catch (err: any) {
        console.error("❌ Stripe Webhook Verification Failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const result = await PaymentService.handleStripeWebhookEvent(event);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Webhook processed successfully',
        data: result,
    });
});

const getEventPaymentHistory = catchAsync(async (req: Request, res: Response) => {

    const eventId = req.params.eventId;
    const options = filterPick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = await PaymentService.getEventPaymentHistory(eventId, options);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Payment history fetched",
        data: result,
    });
});

const getUserPaymentHistory = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const options = filterPick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = await PaymentService.getUserPaymentHistory(userId, options as any);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User payment history fetched",
        data: result,
    });
});

export const PaymentController = {
    handleStripeWebhookEvent,
    getEventPaymentHistory
    , getUserPaymentHistory
};
