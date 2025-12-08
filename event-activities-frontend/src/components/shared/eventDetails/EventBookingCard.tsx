import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import DeleteConfirmationDialog from "@/components/modals/DeleteConfirmationDialog";

interface ICurrentUser {
    id: string;
    email: string;
    fullName: string;
    role: string;
    profileImage?: string | null;
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
}: EventBookingCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-2xl p-8 sticky top-8">
            {/* Price Section */}
            <div className="text-center mb-6 pb-6 border-b">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-5xl font-bold text-gray-800">
                        ৳{ticketPrice}
                    </span>
                </div>
                <p className="text-gray-500 text-sm">per person</p>
            </div>

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
