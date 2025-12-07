import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, DollarSign, Users } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { serverFetch } from "@/lib/serverFetch";

export default async function UpcomingHostedEventsPage() {
    const response = await serverFetch.get("/users/my-profile", {
        cache: "no-store",
        next: { tags: ["my-profile"] }
    });

    const result = await response.json();
    const hostedEvents = result.data?.hostedEvents || [];

    // Filter upcoming events
    const upcomingEvents = hostedEvents.filter((event: any) => 
        new Date(event.startDate) > new Date()
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Upcoming Hosted Events</h1>
                <p className="text-gray-600 mt-2">
                    Events you're hosting that are coming up
                </p>
            </div>

            {upcomingEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map((event: any) => (
                        <Link key={event.id} href={`/events/${event.id}`}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                                            {event.name}
                                        </h3>
                                        <Badge className="ml-2 bg-green-500">
                                            {event.status}
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <Calendar className="w-4 h-4 text-purple-500" />
                                            <span>
                                                {new Date(event.startDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <MapPin className="w-4 h-4 text-purple-500" />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <DollarSign className="w-4 h-4 text-purple-500" />
                                            <span className="font-semibold">
                                                ৳{event.ticketPrice}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <Users className="w-4 h-4 text-purple-500" />
                                            <span>
                                                {event.participants?.length || 0} / {event.maxParticipants} participants
                                            </span>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-4">
                                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                                            <span>Capacity</span>
                                            <span>
                                                {Math.round(((event.participants?.length || 0) / event.maxParticipants) * 100)}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-purple-600 h-2 rounded-full"
                                                style={{
                                                    width: `${Math.min(((event.participants?.length || 0) / event.maxParticipants) * 100, 100)}%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="p-12 text-center">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            No Upcoming Events
                        </h3>
                        <p className="text-gray-600">
                            You don't have any upcoming events scheduled
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
