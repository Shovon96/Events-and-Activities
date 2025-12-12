export const dynamic = "force-dynamic";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, DollarSign, Users, Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { serverFetch } from "@/lib/serverFetch";

export default async function PastHostedEventsPage() {
    const response = await serverFetch.get("/users/my-profile", {
        cache: "no-store",
        next: { tags: ["my-profile"] }
    });

    const result = await response.json();
    const hostedEvents = result.data?.hostedEvents || [];

    // Filter past events
    const pastEvents = hostedEvents.filter((event: any) =>
        new Date(event.endDate) < new Date()
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Past Hosted Events</h1>
                <p className="text-gray-600 mt-2">
                    Events you've successfully hosted
                </p>
            </div>

            {pastEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pastEvents.map((event: any) => (
                        <Link key={event.id} href={`/events/${event.id}`}>
                            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                                <CardContent>
                                    <div className="flex justify-end">
                                        <Badge className="ml-2 bg-gray-500">
                                            Completed
                                        </Badge>
                                    </div>
                                    <div className="mb-3">
                                        <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                                            {event.name}
                                        </h3>
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
                                                {event.participants?.length || 0} participants
                                            </span>
                                        </div>
                                    </div>

                                    {/* Revenue */}
                                    <div className="mt-4 pt-3 border-t">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Total Revenue</span>
                                            <span className="text-lg font-bold text-green-600">
                                                ৳{(event.ticketPrice * (event.participants?.length || 0)).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Reviews */}
                                    {event.reviews && event.reviews.length > 0 && (
                                        <div className="mt-3 pt-3 border-t">
                                            <div className="flex items-center gap-2">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-semibold">
                                                    {(event.reviews.reduce((acc: number, r: any) => acc + parseFloat(r.rating), 0) / event.reviews.length).toFixed(1)}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    ({event.reviews.length} reviews)
                                                </span>
                                            </div>
                                        </div>
                                    )}
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
                            No Past Events
                        </h3>
                        <p className="text-gray-600">
                            You haven't hosted any completed events yet
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
