export interface IApplyCouponRequest {
  eventId: string;
  couponCode: string;
}

export interface IApplyCouponResponse {
  valid: boolean;
  message: string;
  discount?: {
    couponCode: string;
    discountPercent: number;
    originalPrice: number;
    discountAmount: number;
    finalPrice: number;
  };
}
