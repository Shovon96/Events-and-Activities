import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, DollarSign, TrendingUp } from "lucide-react";

interface HostDashboardStatsProps {
    dashboardData: any;
}

export default function HostDashboardStats({ dashboardData }: HostDashboardStatsProps) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                        Total Events
                    </CardTitle>
                    <Calendar className="w-5 h-5 text-purple-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-gray-800">
                        {dashboardData.hostedEvents?.length || 0}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Events you've hosted
                    </p>
                </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                        Active Events
                    </CardTitle>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-gray-800">
                        {dashboardData.hostedEvents?.filter((e: any) =>
                            e.status === "OPEN"
                        ).length || 0}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Currently open events
                    </p>
                </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                        Total Participants
                    </CardTitle>
                    <Users className="w-5 h-5 text-blue-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-gray-800">
                        {dashboardData.hostedEvents?.reduce((acc: number, event: any) =>
                            acc + (event.participants?.length || 0), 0
                        ) || 0}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Across all events
                    </p>
                </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                        Total Revenue
                    </CardTitle>
                    <DollarSign className="w-5 h-5 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-gray-800">
                        ৳{dashboardData.hostedEvents?.reduce((acc: number, event: any) =>
                            acc + (event.ticketPrice * (event.participants?.length || 0)), 0
                        ).toLocaleString() || 0}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Total earnings
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
