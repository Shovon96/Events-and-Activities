import { Router } from "express";
import { PaymentController } from "./payment.controller";

const router = Router();

// Payment history per event
router.get("/event/:eventId", PaymentController.getEventPaymentHistory);

// Payment history per user
router.get("/user/:userId", PaymentController.getUserPaymentHistory);

export const paymentRoutes = router;


// stripe listen --forward-to localhost:5000/webhook