"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EventHero from "./eventDetails/EventHero";
import EventDescription from "./eventDetails/EventDescription";
import EventDateTime from "./eventDetails/EventDateTime";
import EventParticipants from "./eventDetails/EventParticipants";
import EventHost from "./eventDetails/EventHost";
import EventReviews from "./eventDetails/EventReviews";
import EventBookingCard from "./eventDetails/EventBookingCard";

interface HostReview {
    id: string;
    rating: string;
    comment?: string;
    eventId: string;
}

interface Host {
    id: string;
    email: string;
    fullName: string;
    role: string;
    reviewsReceived?: HostReview[];
}

interface EventReview {
    id: string;
    rating: string;
    comment?: string;
    author: {
        id: string;
        fullName: string;
        profileImage?: string | null;
    };
}

interface Participant {
    id: string;
    userId: string;
    eventId: string;
    paymentStatus: string;
}

interface EventDetailsProps {
    data: {
        id: string;
        name: string;
        type: string;
        description: string;
        image: string;
        location: string;
        startDate: string;
        endDate: string;
        minParticipants: number;
        maxParticipants: number;
        ticketPrice: number;
        status: string;
        host: Host;
        participants?: Participant[];
        reviews?: EventReview[];
    };
    currentUser?: ICurrentUser;
    token: string | null;
}

interface ICurrentUser {
    id: string;
    email: string;
    fullName: string;
    role: string;
    profileImage?: string | null;
}

export default function EventDetails({ data, currentUser, token }: EventDetailsProps) {
    const event = data;
    const currentUserId = currentUser?.id;
    const router = useRouter();
    const [isLeaveOpen, setIsLeaveOpen] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

    // Check if current user has joined this event
    const hasUserJoined = currentUserId && event.participants && Array.isArray(event.participants)
        ? event.participants.some(p => p.userId === currentUserId)
        : false;

    // Calculate average ratings
    const calculateAverageRating = (reviews?: HostReview[] | EventReview[]) => {
        if (!reviews || !Array.isArray(reviews) || reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, review) => acc + parseFloat(review.rating), 0);
        return (sum / reviews.length).toFixed(1);
    };

    const hostAverageRating = calculateAverageRating(event.host?.reviewsReceived);
    const eventAverageRating = calculateAverageRating(event.reviews);
    const participantsCount = event.participants && Array.isArray(event.participants) ? event.participants.length : 0;

    // Hydration-safe formatted values
    const [formattedStart, setFormattedStart] = useState({
        date: "",
        time: "",
        day: "",
        month: "",
        year: "",
    });
    const [formattedEnd, setFormattedEnd] = useState({
        date: "",
        time: "",
    });

    // Format dates on client only
    useEffect(() => {
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);

        setFormattedStart({
            date: start.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            }),
            time: start.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            day: start.getDate().toString(),
            month: start.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
            year: start.getFullYear().toString(),
        });

        setFormattedEnd({
            date: end.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            }),
            time: end.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            }),
        });
    }, [event.startDate, event.endDate]);


    const isPaymentComplete = event?.participants?.some(p => p.userId === currentUserId && p.paymentStatus === "PAID");

    // Handle leave event
    const handleLeaveEvent = async () => {
        setIsLeaving(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/participants/leave/${event.id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        authorization: token as string
                    },
                }
            );

            if (response.ok) {
                toast.success("Successfully left the event!");
                setIsLeaveOpen(false);
                router.refresh();
            } else {
                const error = await response.json();
                toast.error(error.message || "Failed to leave event");
            }
        } catch (error) {
            console.error("Error leaving event:", error);
            toast.error("An error occurred while leaving the event");
        } finally {
            setIsLeaving(false);
        }
    };

    // Handle payments
    const handlePayment = async (eventId: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}/join`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    authorization: token as string
                },
                body: JSON.stringify({ eventId }),
            });

            const result = await res.json();

            if (!result?.data?.paymentUrl) {
                toast.error("Payment URL not found try gain 2min later");
                throw new Error("Payment URL not found");
            }

            if (result?.error) {
                toast.error(result?.error);
                throw new Error(result?.error);
            }

            window.location.href = result?.data?.paymentUrl

        } catch (error) {
            console.error("Payment error:", error);
        }
    };



    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50">
            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Hero Section */}
                <EventHero
                    image={event.image}
                    name={event.name}
                    type={event.type}
                    location={event.location}
                    formattedStart={formattedStart}
                />

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left Column - Event Details */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Description */}
                        <EventDescription description={event.description} />

                        {/* Event Information Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <EventDateTime
                                formattedStart={formattedStart}
                                formattedEnd={formattedEnd}
                            />
                            <EventParticipants
                                participantsCount={participantsCount}
                                maxParticipants={event.maxParticipants}
                            />
                        </div>

                        {/* Host Information */}
                        <EventHost
                            host={event.host}
                            hostAverageRating={hostAverageRating}
                        />

                        {/* Reviews Section */}
                        <EventReviews
                            event={event}
                            eventAverageRating={eventAverageRating}
                            currentUser={currentUser}
                            token={token}
                        />

                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="lg:col-span-1">
                        <EventBookingCard
                            ticketPrice={event.ticketPrice}
                            status={event.status}
                            formattedStart={formattedStart}
                            location={event.location}
                            hasUserJoined={hasUserJoined}
                            isPaymentComplete={isPaymentComplete}
                            currentUser={currentUser}
                            isLeaveOpen={isLeaveOpen}
                            isLeaving={isLeaving}
                            onLeaveClick={() => setIsLeaveOpen(true)}
                            onLeaveClose={() => setIsLeaveOpen(false)}
                            onLeaveConfirm={handleLeaveEvent}
                            onJoinClick={() => handlePayment(event.id)}
                        />
                    </div>

                </div>

            </div>
        </div>
    );
}
