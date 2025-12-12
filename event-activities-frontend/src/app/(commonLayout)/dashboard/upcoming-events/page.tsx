export const dynamic = "force-dynamic";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, DollarSign, User } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { serverFetch } from "@/lib/serverFetch";

export default async function UpcomingEventsPage() {
    const response = await serverFetch.get("/participants/my-events", {
        cache: "no-store",
        next: { tags: ["my-events"] }
    });

    const result = await response.json();
    const joinedEvents = result.data || [];

    // Filter upcoming events
    const upcomingEvents = joinedEvents.filter((item: any) => 
        new Date(item.event?.startDate) > new Date()
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Upcoming Events</h1>
                <p className="text-gray-600 mt-2">
                    Events you've joined that are coming up
                </p>
            </div>

            {upcomingEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingEvents.map((item: any) => (
                        <Link key={item.id} href={`/events/${item.event.id}`}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                                            {item.event.name}
                                        </h3>
                                        <Badge className="ml-2 bg-green-500">
                                            {item.paymentStatus}
                                        </Badge>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <Calendar className="w-4 h-4 text-purple-500" />
                                            <span>
                                                {new Date(item.event.startDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <MapPin className="w-4 h-4 text-purple-500" />
                                            <span>{item.event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <DollarSign className="w-4 h-4 text-purple-500" />
                                            <span className="font-semibold">
                                                ৳{item.event.ticketPrice}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <User className="w-4 h-4 text-purple-500" />
                                            <span>Host: {item.event.host.fullName}</span>
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
                        <p className="text-gray-600 mb-4">
                            You haven't joined any upcoming events yet
                        </p>
                        <Link
                            href="/events"
                            className="text-purple-600 hover:text-purple-700 font-semibold"
                        >
                            Browse Events →
                        </Link>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
