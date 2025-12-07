import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, DollarSign, Users, Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { serverFetch } from "@/lib/serverFetch";
import { Button } from "@/components/ui/button";

export default async function MyHostedEventsPage() {
    const response = await serverFetch.get("/users/my-profile", {
        cache: "no-store",
        next: { tags: ["my-profile"] }
    });

    const result = await response.json();
    const hostedEvents = result.data?.hostedEvents || [];
    console.log('hosted events', hostedEvents)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">My Hosted Events</h1>
                    <p className="text-gray-600 mt-2">
                        Manage all your hosted events
                    </p>
                </div>
                <Button className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                    <Plus className="w-4 h-4 mr-1" />
                    Create New Event
                </Button>
            </div>

            {hostedEvents?.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hostedEvents?.map((event: any) => (
                        <Card key={event.id} className="hover:shadow-lg transition-shadow">
                            <CardContent>
                                <div className="flex justify-end">
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
                                <div className="mb-3">
                                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2 flex-1">
                                        {event.name}
                                    </h3>
                                </div>

                                <div className="space-y-2 mb-4">
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
                                        <span className="font-semibold">৳{event.ticketPrice}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <Users className="w-4 h-4 text-purple-500" />
                                        <span>
                                            {event.participants?.length || 0} / {event.maxParticipants} participants
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-3 border-t">
                                    <Link
                                        href={`/events/${event.id}`}
                                        className="flex-1 text-center px-3 py-2 text-sm border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                    <button className="px-3 py-2 text-sm border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 transition-colors">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="px-3 py-2 text-sm border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="p-12 text-center">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            No Events Yet
                        </h3>
                        <p className="text-gray-600 mb-4">
                            You haven't created any events yet
                        </p>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                            Create Your First Event
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
