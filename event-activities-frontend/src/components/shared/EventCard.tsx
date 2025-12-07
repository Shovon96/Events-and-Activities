import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card";
import { IEvent } from "@/types/events.interface";
import Link from "next/link";

interface IEventApiResponse {
    data: {
        data: IEvent[]
    }
}

interface ICurrentUser {
    id: string;
    email: string;
    fullName: string;
    role: string;
    profileImage?: string | null;
}

interface EventCardProps {
    events: IEventApiResponse;
    currentUser?: ICurrentUser // Optional: current logged-in user ID
}

export default function EventCard({ events, currentUser }: EventCardProps) {

    const currentUserId = currentUser?.id;
    // Check if user has joined an event with PAID status
    const hasUserJoinedWithPayment = (event: any) => {
        if (!currentUserId) return false;
        if (!event.participants || !Array.isArray(event.participants)) return false;
        return event.participants.some((p: any) =>
            p.userId === currentUserId && p.paymentStatus === "PAID"
        );
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
            {events?.data?.data?.map((event: IEvent) => {
                const isJoined = hasUserJoinedWithPayment(event);

                return (
                    <Card
                        key={event.id}
                        className={cn(
                            "group overflow-hidden rounded-xl border shadow-sm transition-all",
                            "hover:shadow-lg hover:-translate-y-1 py-0 cursor-pointer duration-400 gap-3"
                        )}
                    >
                        {/* Image */}
                        <div className="relative h-56 w-full overflow-hidden">
                            <Image
                                src={event.image || ""}
                                alt={event.name || "image"}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Category badge */}
                            <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded-full">
                                {event.type}
                            </span>

                            {/* Price badge */}
                            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                                ₤{event.ticketPrice}
                            </span>
                        </div>

                        {/* Content */}
                        <CardContent className="p-4">
                            <CardTitle className="text-xl font-bold mb-2">
                                {event.name}
                            </CardTitle>

                            {/* Date */}
                            <div className="flex items-center text-sm text-gray-600 mb-1">
                                <Calendar className="text-secondary w-4 h-4 mr-2" />
                                {new Date(event.startDate).toLocaleDateString()}
                            </div>

                            {/* Location */}
                            <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="text-secondary w-4 h-4 mr-2" />
                                {event.location}
                            </div>
                            {/* Buttons */}
                            <div className="flex justify-between items-center gap-2 py-2">
                                <Link
                                    href={`/events/${event.id}`}
                                    className="text-primary border border-primary bg-purple-50 hover:bg-white inline-block px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 w-1/2 text-center"
                                >
                                    View Details
                                </Link>

                                {isJoined ? (
                                    <button
                                        className="text-white border border-red-500 bg-red-500 hover:bg-white hover:text-red-500 inline-block px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 w-1/2 text-center cursor-pointer"
                                    >
                                        Cancel Event
                                    </button>
                                ) : currentUser?.role === "HOST" ? (
                                    <button
                                        className="text-white border border-red-500 bg-secondary hover:bg-white hover:text-secondary inline-block px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 w-1/2 text-center cursor-pointer"
                                    >
                                        Remove Event
                                    </button>
                                ) : (
                                    <Link
                                        href={`/events/${event.id}`}
                                        className="text-white border border-primary bg-primary hover:bg-white hover:text-primary inline-block px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-300 w-1/2 text-center"
                                    >
                                        Book Now
                                    </Link>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )
            })
            }
        </div >
    )
}
