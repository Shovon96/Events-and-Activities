
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, TrendingUp, DollarSign } from "lucide-react";

interface Payment {
    amount: number;
    paymentStatus: string;
}

interface UserDashboardStatsProps {
    dashboardData: any[];
    payments: Payment[] | any;
}

export default function UserDashboardStats({ dashboardData, payments }: UserDashboardStatsProps) {

    // Calculate upcoming events
    const upcomingEventsCount = dashboardData.filter((item: any) => {
        const eventStart = new Date(item.event?.startDate);
        const today = new Date();
        return eventStart.getTime() > today.getTime();
    }).length;

    // Calculate past events
    const pastEventsCount = dashboardData.filter((e: any) =>
        new Date(e.event?.endDate) < new Date()
    ).length;

    // Calculate total amount from PAID payments
    const totalPaidAmount = payments?.data
        ?.filter((p: any) => p.paymentStatus === "PAID")
        ?.reduce((sum: number, p: any) => sum + p.amount, 0);

    console.log('total amount', totalPaidAmount)

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                        Total Joined Events
                    </CardTitle>
                    <Calendar className="w-5 h-5 text-purple-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-gray-800">
                        {dashboardData.length || 0}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Events you've participated in
                    </p>
                </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                        Upcoming Events
                    </CardTitle>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-gray-800">
                        {upcomingEventsCount}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Events coming up
                    </p>
                </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                        Past Events
                    </CardTitle>
                    <Calendar className="w-5 h-5 text-gray-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-gray-800">
                        {pastEventsCount}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Completed events
                    </p>
                </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                        Total Spent
                    </CardTitle>
                    <DollarSign className="w-5 h-5 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-gray-800">
                        ৳{totalPaidAmount.toLocaleString()}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Total paid amount
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
