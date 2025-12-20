import { prisma } from "../../shared/prisma";
import { IApplyCouponRequest, IApplyCouponResponse } from "./coupon.interface";
import { UserStatus } from "@prisma/client";
import { IJWTPayload } from "../../types/common";

const applyCoupon = async (
  user: IJWTPayload,
  payload: IApplyCouponRequest
): Promise<IApplyCouponResponse> => {
  const { eventId, couponCode } = payload;

  // userInfo
  const userInfo = await prisma.user.findUnique({
    where: {
      email: user?.email,
      status: UserStatus.ACTIVE
    },
  });

  // 1. Check if event exists
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      participants: {
        where: { userId: userInfo?.id },
      },
    },
  });

  if (!event) {
    return {
      valid: false,
      message: "Event not found",
    };
  }

  // 2. Check if event is OPEN
  if (event.status !== "OPEN") {
    return {
      valid: false,
      message: "Coupon cannot be applied. Event is not open",
    };
  }

  // 3. Check if event date has expired
  const currentDate = new Date();
  if (new Date(event.endDate) < currentDate) {
    return {
      valid: false,
      message: "Coupon cannot be applied. Event has expired",
    };
  }

  // 4. Check if coupon is active/available for this event
  if (!event.couponActive || !event.couponCode) {
    return {
      valid: false,
      message: "No active coupon available for this event",
    };
  }

  // 5. Check if coupon code is matches
  if (event.couponCode.toUpperCase() !== couponCode.toUpperCase()) {
    return {
      valid: false,
      message: "Invalid coupon code",
    };
  }

  // 6. Check if user is already a participant & PAID of the event
  if (event.participants.length > 0) {
    const participant = event.participants[0];
    if (participant.paymentStatus === "PAID") {
      return {
        valid: false,
        message: "You have already purchased ticket for this event",
      };
    }
  }

  // 7. Check if user has already applied coupon for this event
  const existingParticipant = event.participants[0];
  if (existingParticipant && existingParticipant.couponApplied) {
    return {
      valid: false,
      message: "You have already applied a coupon for this event",
    };
  }

  // 8. Calculate discount
  const originalPrice = event.ticketPrice || 0;
  const discountPercent = event.couponDiscount || 0;
  const discountAmount = (originalPrice * discountPercent) / 100;
  const finalPrice = originalPrice - discountAmount;

  // 9. Return success response (DO NOT create/update participant here)
  // Participant will be created in joinEvent with coupon info
  return {
    valid: true,
    message: "Coupon applied successfully",
    discount: {
      couponCode: event.couponCode,
      discountPercent,
      originalPrice,
      discountAmount: parseFloat(discountAmount.toFixed(2)),
      finalPrice: parseFloat(finalPrice.toFixed(2)),
    },
  };
};

export const CouponService = {
  applyCoupon,
};
