import express from "express";
import { CouponController } from "./coupon.controller";
import { UserRole } from "@prisma/client";
import { applyCouponValidation } from "./coupon.validation";
import CheckAuth from "../../middlewares/CheckAuth";
import validateRequest from "../../middlewares/validatedRequest";

const router = express.Router();

// Apply coupon (USER and HOST can apply)
router.post(
  "/apply",
  CheckAuth(UserRole.USER, UserRole.HOST),
  validateRequest(applyCouponValidation),
  CouponController.applyCoupon
);

export const CouponRoutes = router;
