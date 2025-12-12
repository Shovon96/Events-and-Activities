export const dynamic = "force-dynamic";
import { Star, DollarSign, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { serverFetch } from "@/lib/serverFetch";
import { getUserInfo } from "@/lib/getUserSession";
import { redirect } from "next/navigation";
import ProfileClient from "@/components/profile/ProfileClient";
import { getCookie } from "@/service/auth.service";

interface HostEvent {
    id: string;
    name: string;
    status: string;
    ticketPrice: number;
    host: {
        id: string;
        email: string;
        fullName: string;
        profileImage: string;
    };
}

interface JoinedEvent {
    id: string;
    paymentStatus: string;
    event: {
        id: string;
        name: string;
        status: string;
        ticketPrice: number;
        reviews?: Array<{
            id: string;
            rating: string;
            comment?: string;
        }>;
        host: {
            id: string;
            email: string;
            fullName: string;
            profileImage: string;
        };
    };
}

interface ProfileData {
    id: string;
    email: string;
    fullName: string;
    interests?: string[];
    bio?: string;
    city?: string;
    role: "HOST" | "USER" | "ADMIN";
    status: string;
    profileImage?: string;
    hostedEvents?: HostEvent[];
    joinedEvents?: JoinedEvent[];
}

export default async function MyProfilePage() {

    const user = await getUserInfo();

    if (!user) {
        redirect("/login");
    }

    const token = await getCookie("accessToken");

    const response = await serverFetch.get("/users/my-profile", {
        cache: "no-store",
        next: { tags: ["my-profile"] }
    })

    const result = await response.json();
    const profile: ProfileData = result.data;

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50 py-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Profile Header */}
                <ProfileClient profile={profile} token={token} />

                {/* Events Section - HOST */}
                {profile?.role === "HOST" && profile?.hostedEvents && (
                    <Card className="shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-gray-800">
                                My Hosted Events ({profile?.hostedEvents.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {profile?.hostedEvents.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {profile?.hostedEvents.map((event) => (
                                        <Link
                                            key={event.id}
                                            href={`/events/${event.id}`}
                                            className="block"
                                        >
                                            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                                                <CardContent className="p-6">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                                                            {event.name}
                                                        </h3>
                                                        <Badge
                                                            className={`ml-2 ${event.status === "OPEN"
                                                                ? "bg-green-500"
                                                                : event.status === "CLOSED"
                                                                    ? "bg-red-500"
                                                                    : "bg-yellow-500"
                                                                }`}
                                                        >
                                                            {event.status}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <DollarSign className="w-4 h-4 text-purple-500" />
                                                        <span className="font-semibold">
                                                            ৳{event.ticketPrice}
                                                        </span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">
                                        You haven't hosted any events yet
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Events Section - USER */}
                {profile?.role === "USER" && profile?.joinedEvents && (
                    <Card className="shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-gray-800">
                                My Joined Events ({profile?.joinedEvents.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {profile?.joinedEvents.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {profile?.joinedEvents.map((joined) => (
                                        <Link
                                            key={joined.id}
                                            href={`/events/${joined.event.id}`}
                                            className="block"
                                        >
                                            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                                                <CardContent className="p-6">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                                                            {joined.event.name}
                                                        </h3>
                                                        <Badge
                                                            className={`ml-2 ${joined.paymentStatus === "PAID"
                                                                ? "bg-green-500"
                                                                : "bg-yellow-500"
                                                                }`}
                                                        >
                                                            {joined.paymentStatus}
                                                        </Badge>
                                                    </div>

                                                    <div className="space-y-2 mb-3">
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <DollarSign className="w-4 h-4 text-purple-500" />
                                                            <span className="font-semibold">
                                                                ৳{joined.event.ticketPrice}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-600">
                                                            <User className="w-4 h-4 text-purple-500" />
                                                            <span className="text-sm">
                                                                Host: {joined.event.host.fullName}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Reviews */}
                                                    {joined.event.reviews &&
                                                        joined.event.reviews.length > 0 && (
                                                            <div className="mt-3 pt-3 border-t">
                                                                <div className="flex items-center gap-2">
                                                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                                    <span className="text-sm font-semibold">
                                                                        {joined.event.reviews[0].rating}
                                                                    </span>
                                                                    <span className="text-xs text-gray-500">
                                                                        ({joined.event.reviews.length}{" "}
                                                                        {joined.event.reviews.length === 1
                                                                            ? "review"
                                                                            : "reviews"}
                                                                        )
                                                                    </span>
                                                                </div>
                                                                {joined.event.reviews[0].comment && (
                                                                    <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                                                                        "{joined.event.reviews[0].comment}"
                                                                    </p>
                                                                )}
                                                            </div>
                                                        )}
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">
                                        You haven't joined any events yet
                                    </p>
                                    <Link
                                        href="/events"
                                        className="text-purple-600 hover:text-purple-700 font-semibold mt-2 inline-block"
                                    >
                                        Explore Events →
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
