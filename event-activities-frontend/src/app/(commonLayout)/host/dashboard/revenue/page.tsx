export const dynamic = "force-dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Calendar, Users, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { serverFetch } from "@/lib/serverFetch";

export default async function RevenueTrackingPage() {
    const response = await serverFetch.get("/users/my-profile", {
        cache: "no-store",
        next: { tags: ["my-profile"] }
    });

    const result = await response.json();
    const hostedEvents = result.data?.hostedEvents || [];

    // Calculate revenue statistics
    const totalRevenue = hostedEvents.reduce((acc: number, event: any) => {
        const paidParticipants = event.participants?.filter((p: any) => p.paymentStatus === "PAID").length || 0;
        return acc + (event.ticketPrice * paidParticipants);
    }, 0);

    const pendingRevenue = hostedEvents.reduce((acc: number, event: any) => {
        const pendingParticipants = event.participants?.filter((p: any) => p.paymentStatus !== "PAID").length || 0;
        return acc + (event.ticketPrice * pendingParticipants);
    }, 0);

    const totalParticipants = hostedEvents.reduce((acc: number, event: any) => {
        return acc + (event.participants?.length || 0);
    }, 0);

    const paidParticipants = hostedEvents.reduce((acc: number, event: any) => {
        return acc + (event.participants?.filter((p: any) => p.paymentStatus === "PAID").length || 0);
    }, 0);

    // Revenue by event
    const revenueByEvent = hostedEvents.map((event: any) => {
        const paidCount = event.participants?.filter((p: any) => p.paymentStatus === "PAID").length || 0;
        const pendingCount = event.participants?.filter((p: any) => p.paymentStatus !== "PAID").length || 0;
        return {
            ...event,
            paidRevenue: event.ticketPrice * paidCount,
            pendingRevenue: event.ticketPrice * pendingCount,
            paidCount,
            pendingCount,
        };
    }).sort((a: any, b: any) => b.paidRevenue - a.paidRevenue);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Revenue & Payment Tracking</h1>
                <p className="text-gray-600 mt-2">
                    Monitor your earnings and payment status
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-linear-to-br from-green-50 to-green-100 border-green-200">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-green-800">
                            Total Revenue
                        </CardTitle>
                        <DollarSign className="w-5 h-5 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-800">
                            ৳{totalRevenue.toLocaleString()}
                        </div>
                        <p className="text-xs text-green-700 mt-2">
                            From paid participants
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-linear-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-yellow-800">
                            Pending Revenue
                        </CardTitle>
                        <TrendingUp className="w-5 h-5 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-yellow-800">
                            ৳{pendingRevenue.toLocaleString()}
                        </div>
                        <p className="text-xs text-yellow-700 mt-2">
                            Awaiting payment
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-linear-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-blue-800">
                            Paid Participants
                        </CardTitle>
                        <Users className="w-5 h-5 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-blue-800">
                            {paidParticipants}
                        </div>
                        <p className="text-xs text-blue-700 mt-2">
                            Out of {totalParticipants} total
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-linear-to-br from-purple-50 to-purple-100 border-purple-200">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-purple-800">
                            Payment Rate
                        </CardTitle>
                        <CreditCard className="w-5 h-5 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-purple-800">
                            {totalParticipants > 0 
                                ? Math.round((paidParticipants / totalParticipants) * 100)
                                : 0}%
                        </div>
                        <p className="text-xs text-purple-700 mt-2">
                            Successful payments
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Revenue by Event */}
            <Card>
                <CardHeader>
                    <CardTitle>Revenue by Event</CardTitle>
                </CardHeader>
                <CardContent>
                    {revenueByEvent.length > 0 ? (
                        <div className="space-y-4">
                            {revenueByEvent.map((event: any) => (
                                <div
                                    key={event.id}
                                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800 mb-1">
                                                {event.name}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    <span>{new Date(event.startDate).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users className="w-3 h-3" />
                                                    <span>{event.participants?.length || 0} participants</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Badge
                                            className={`${
                                                event.status === "OPEN"
                                                    ? "bg-green-500"
                                                    : event.status === "CLOSED"
                                                    ? "bg-red-500"
                                                    : "bg-yellow-500"
                                            }`}
                                        >
                                            {event.status}
                                        </Badge>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                                        <div className="bg-green-50 p-3 rounded-lg">
                                            <div className="text-xs text-green-700 mb-1">Paid Revenue</div>
                                            <div className="text-xl font-bold text-green-800">
                                                ৳{event.paidRevenue.toLocaleString()}
                                            </div>
                                            <div className="text-xs text-green-600 mt-1">
                                                {event.paidCount} paid × ৳{event.ticketPrice}
                                            </div>
                                        </div>

                                        <div className="bg-yellow-50 p-3 rounded-lg">
                                            <div className="text-xs text-yellow-700 mb-1">Pending Revenue</div>
                                            <div className="text-xl font-bold text-yellow-800">
                                                ৳{event.pendingRevenue.toLocaleString()}
                                            </div>
                                            <div className="text-xs text-yellow-600 mt-1">
                                                {event.pendingCount} pending × ৳{event.ticketPrice}
                                            </div>
                                        </div>

                                        <div className="bg-purple-50 p-3 rounded-lg">
                                            <div className="text-xs text-purple-700 mb-1">Total Potential</div>
                                            <div className="text-xl font-bold text-purple-800">
                                                ৳{(event.paidRevenue + event.pendingRevenue).toLocaleString()}
                                            </div>
                                            <div className="text-xs text-purple-600 mt-1">
                                                {event.participants?.length || 0} total participants
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-4">
                                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                                            <span>Payment Progress</span>
                                            <span>
                                                {event.participants?.length > 0
                                                    ? Math.round((event.paidCount / event.participants.length) * 100)
                                                    : 0}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-green-600 h-2 rounded-full"
                                                style={{
                                                    width: `${event.participants?.length > 0
                                                        ? Math.min((event.paidCount / event.participants.length) * 100, 100)
                                                        : 0}%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                No Revenue Data
                            </h3>
                            <p className="text-gray-600">
                                You don't have any events with participants yet
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
