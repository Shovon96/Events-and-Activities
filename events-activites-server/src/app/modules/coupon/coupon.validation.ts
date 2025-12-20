import { z } from "zod";

export const applyCouponValidation = z.object({
  body: z.object({
    eventId: z.string({
      required_error: "Event ID is required",
    }),
    couponCode: z.string({
      required_error: "Coupon code is required",
    }).min(1, "Coupon code cannot be empty"),
  }),
});
