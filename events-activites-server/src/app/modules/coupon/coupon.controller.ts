import { Request, Response } from "express";
import httpStatus from "http-status";
import { CouponService } from "./coupon.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IJWTPayload } from "../../types/common";

const applyCoupon = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {
  const user = req.user as IJWTPayload;
  const result = await CouponService.applyCoupon(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: result.valid,
    message: result.message,
    data: result.discount || null,
  });
});

export const CouponController = {
  applyCoupon,
};
