import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Mail, Calendar, DollarSign, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { serverFetch } from "@/lib/serverFetch";
import Image from "next/image";

export default async function ParticipantsManagementPage() {

    const response = await serverFetch.get("/users/my-profile", {
        cache: "no-store",
        next: { tags: ["my-profile"] }
    });

    const result = await response.json();
    const hostedEvents = result.data?.hostedEvents || [];

    const eventIds = hostedEvents?.map((event: any) => event?.id);

    const participantResponse = await Promise.all(
        eventIds.map((id: string) =>
            serverFetch.get(`/participants/event/${id}`, {
                cache: "no-store",
                next: { tags: ["my-profile"] }
            })
        )
    );
    const participant = await Promise.all(participantResponse.map((res) => res.json()));

    // Get all participants from all events using correct data structure
    const allParticipants: any[] = [];
    participant.forEach((participantData: any, index: number) => {
        const eventParticipants = participantData?.data?.data || [];
        const event = hostedEvents[index];
        
        eventParticipants.forEach((p: any) => {
            allParticipants.push({
                ...p,
                eventName: event.name,
                eventId: event.id,
                ticketPrice: event.ticketPrice,
            });
        });
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Participants Management</h1>
                <p className="text-gray-600 mt-2">
                    Manage all participants across your events
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Total Participants
                        </CardTitle>
                        <Users className="w-5 h-5 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-gray-800">
                            {allParticipants.length}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Across all events
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Paid Participants
                        </CardTitle>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-gray-800">
                            {allParticipants.filter(p => p.paymentStatus === "PAID").length}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Payment completed
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                            Pending Payments
                        </CardTitle>
                        <XCircle className="w-5 h-5 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-gray-800">
                            {allParticipants.filter(p => p.paymentStatus !== "PAID").length}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Awaiting payment
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Participants List by Event */}
            {hostedEvents.length > 0 ? (
                <div className="space-y-6">
                    {hostedEvents.map((event: any, eventIndex: number) => {
                        const eventParticipants = participant[eventIndex]?.data?.data || [];
                        
                        return eventParticipants.length > 0 && (
                            <Card key={event.id}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-xl">{event.name}</CardTitle>
                                        <Badge className="bg-purple-600">
                                            {eventParticipants.length} Participants
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {eventParticipants.map((p: any) => (
                                            <div
                                                key={p.id}
                                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex items-center gap-4">
                                                    {p.user?.profileImage ? (
                                                        <Image
                                                            src={p.user.profileImage}
                                                            alt={p.user.fullName}
                                                            width={48}
                                                            height={48}
                                                            className="rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                                                            {p.user?.fullName?.substring(0, 1) || "U"}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <h4 className="font-semibold text-gray-800">
                                                            {p.user?.fullName || "Unknown User"}
                                                        </h4>
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <Mail className="w-3 h-3" />
                                                            <span>{p.user?.email || "N/A"}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                                            <Calendar className="w-3 h-3" />
                                                            <span>
                                                                Joined: {new Date(p.createdAt).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <div className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                                                            <DollarSign className="w-4 h-4" />
                                                            <span>৳{event.ticketPrice}</span>
                                                        </div>
                                                        <Badge
                                                            className={`mt-1 ${p.paymentStatus === "PAID"
                                                                ? "bg-green-500"
                                                                : "bg-yellow-500"
                                                                }`}
                                                        >
                                                            {p.paymentStatus}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            ) : (
                <Card>
                    <CardContent className="p-12 text-center">
                        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            No Participants Yet
                        </h3>
                        <p className="text-gray-600">
                            You don't have any participants in your events yet
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
