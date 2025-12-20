import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, MapPin, Tag, X } from "lucide-react";
import DeleteConfirmationDialog from "@/components/modals/DeleteConfirmationDialog";
import { useState } from "react";

interface ICurrentUser {
    id: string;
    email: string;
    fullName: string;
    role: string;
    profileImage?: string | null;
}

interface CouponDiscount {
    couponCode: string;
    discountPercent: number;
    originalPrice: number;
    discountAmount: number;
    finalPrice: number;
}

interface EventBookingCardProps {
    ticketPrice: number;
    status: string;
    formattedStart: {
        date: string | number;
        time: string | number;
    };
    location: string;
    hasUserJoined: boolean;
    isPaymentComplete: boolean | undefined;
    currentUser?: ICurrentUser;
    isLeaveOpen: boolean;
    isLeaving: boolean;
    onLeaveClick: () => void;
    onLeaveClose: () => void;
    onLeaveConfirm: () => void;
    onJoinClick: () => void;
    // Coupon props
    couponCode?: string | null;
    couponActive?: boolean;
    appliedDiscount: CouponDiscount | null;
    onApplyCoupon: (code: string) => Promise<void>;
    onRemoveCoupon: () => void;
    isApplyingCoupon: boolean;
}

export default function EventBookingCard({
    ticketPrice,
    status,
    formattedStart,
    location,
    hasUserJoined,
    isPaymentComplete,
    currentUser,
    isLeaveOpen,
    isLeaving,
    onLeaveClick,
    onLeaveClose,
    onLeaveConfirm,
    onJoinClick,
    couponCode,
    couponActive,
    appliedDiscount,
    onApplyCoupon,
    onRemoveCoupon,
    isApplyingCoupon,
}: EventBookingCardProps) {
    const [couponInput, setCouponInput] = useState("");

    const handleApplyCoupon = async () => {
        if (!couponInput.trim()) return;
        await onApplyCoupon(couponInput.trim().toUpperCase());
    };

    const handleRemoveCoupon = () => {
        setCouponInput("");
        onRemoveCoupon();
    };

    const displayPrice = appliedDiscount ? appliedDiscount.finalPrice : ticketPrice;

    return (
        <div className="bg-white rounded-2xl shadow-2xl p-8 sticky top-8">
            {/* Price Section */}
            <div className="text-center mb-6 pb-6 border-b">
                {appliedDiscount ? (
                    <>
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="text-3xl font-bold text-gray-400 line-through">
                                ৳{appliedDiscount.originalPrice}
                            </span>
                        </div>
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="text-5xl font-bold text-green-600">
                                ৳{appliedDiscount.finalPrice}
                            </span>
                        </div>
                        <p className="text-green-600 text-sm font-semibold">
                            You save ৳{appliedDiscount.discountAmount} ({appliedDiscount.discountPercent}% off)
                        </p>
                    </>
                ) : (
                    <>
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="text-5xl font-bold text-gray-800">
                                ৳{ticketPrice}
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm">per person</p>
                    </>
                )}
            </div>

            {/* Coupon Section - Only show if not joined and coupon is available */}
            {!hasUserJoined && couponActive && couponCode && (
                <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <Label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-purple-600" />
                        Have a coupon code?
                    </Label>
                    
                    {appliedDiscount ? (
                        // Show applied coupon
                        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Tag className="w-5 h-5 text-green-600" />
                                    <div>
                                        <p className="text-green-700 font-bold text-sm">
                                            {appliedDiscount.couponCode}
                                        </p>
                                        <p className="text-green-600 text-xs">
                                            {appliedDiscount.discountPercent}% discount applied
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    onClick={handleRemoveCoupon}
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0 hover:bg-red-100"
                                >
                                    <X className="w-4 h-4 text-red-600" />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        // Show coupon input
                        <>
                            <div className="flex gap-2 mt-2">
                                <Input
                                    placeholder="Enter code"
                                    value={couponInput}
                                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                                    className="flex-1 uppercase"
                                    disabled={isApplyingCoupon}
                                />
                                <Button
                                    onClick={handleApplyCoupon}
                                    disabled={!couponInput.trim() || isApplyingCoupon}
                                    className="bg-purple-600 hover:bg-purple-700"
                                >
                                    {isApplyingCoupon ? "Applying..." : "Apply"}
                                </Button>
                            </div>
                            <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
                                <Tag className="w-3 h-3" />
                                Available code: <span className="font-bold">{couponCode}</span>
                            </p>
                        </>
                    )}
                </div>
            )}

            {/* Status Badge */}
            <div className="mb-6">
                <div className="flex items-center justify-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-xl">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-semibold">{status}</span>
                </div>
            </div>

            {/* Quick Info */}
            <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                    <Calendar className="w-5 h-5 text-purple-500" />
                    <span className="text-sm">{formattedStart.date}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5 text-purple-500" />
                    <span className="text-sm">{formattedStart.time}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-purple-500" />
                    <span className="text-sm">{location}</span>
                </div>
                {hasUserJoined && isPaymentComplete &&
                    <p className="text-base text-green-600">✔ You have already joined this event</p>
                }
            </div>

            {/* Price Breakdown - Show if coupon applied */}
            {appliedDiscount && !hasUserJoined && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Original Price:</span>
                        <span className="line-through">৳{appliedDiscount.originalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600 font-semibold">
                        <span>Discount ({appliedDiscount.couponCode}):</span>
                        <span>-৳{appliedDiscount.discountAmount}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
                        <span>Total:</span>
                        <span>৳{appliedDiscount.finalPrice}</span>
                    </div>
                </div>
            )}

            {/* CTA Button */}
            {hasUserJoined && isPaymentComplete ? (
                <>
                    <Button
                        onClick={onLeaveClick}
                        size="lg"
                        variant="destructive"
                        className="w-full cursor-pointer h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                        Leave Event
                    </Button>
                    <DeleteConfirmationDialog
                        isOpen={isLeaveOpen}
                        onClose={onLeaveClose}
                        onConfirm={onLeaveConfirm}
                        title="Leave Event"
                        description="Are you sure you want to leave this event? This action cannot be undone."
                        isDeleting={isLeaving}
                    />
                </>
            ) : currentUser?.role === "HOST" ? (
                <Button
                    size="lg"
                    variant="destructive"
                    className="w-full cursor-pointer h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                    Remove Event
                </Button>
            ) : (
                <>
                    <Button
                        onClick={onJoinClick}
                        size="lg"
                        className="w-full cursor-pointer h-14 text-lg font-semibold bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all"
                    >
                        Join This Event
                    </Button>
                    <p className="text-sm pt-2 text-red-500">
                        NOTE: For joining event after redirect to payment page, you have 2 minutes to complete the payment.
                    </p>
                </>
            )}

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t">
                <p className="text-xs text-gray-500 text-center">
                    🎉 Limited spots available! Book now to secure your place.
                </p>
            </div>
        </div>
    );
}
