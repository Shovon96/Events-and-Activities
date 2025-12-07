
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";
import { getUserInfo } from "@/lib/getUserSession";
import { serverFetch } from "@/lib/serverFetch";

export default async function DashboardPage() {
    const user = await getUserInfo();

    // Fetch dashboard data based on role
    let dashboardData: any = {};

    if (user?.role === "USER") {
        // Fetch user's joined events
        const response = await serverFetch.get("/participants/my-events", {
            cache: "no-store",
            next: { tags: ["my-events"] }
        });
        const result = await response.json();
        dashboardData = result.data || [];
    } else if (user?.role === "HOST") {
        // Fetch host's profile with hosted events
        const response = await serverFetch.get("/users/my-profile", {
            cache: "no-store",
            next: { tags: ["my-profile"] }
        });
        const result = await response.json();
        dashboardData = result.data || {};
    } else if (user?.role === "ADMIN") {
        // Fetch all users for admin
        const response = await serverFetch.get("/users", {
            cache: "no-store",
            next: { tags: ["users"] }
        });
        const result = await response.json();
        dashboardData = result.data || [];
    }

    const upcomingEventsCount = dashboardData.filter((item: any) => {
        const eventStart = new Date(item.event?.startDate);
        const today = new Date();

        return eventStart.getTime() > today.getTime();
    }).length;



    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome back, {user?.fullName}!
                </h1>
                <p className="text-gray-600 mt-2">
                    Here's what's happening with your account today.
                </p>
            </div>

            {/* USER Dashboard */}
            {user?.role === "USER" && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                Joined Upcoming Events
                            </CardTitle>
                            <TrendingUp className="w-5 h-5 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-800">
                                {/* {dashboardData.filter((e: any) =>
                                    new Date(e.event?.startDate) > new Date()
                                ).length || 0} */}
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
                                {dashboardData.filter((e: any) =>
                                    new Date(e.event?.endDate) < new Date()
                                ).length || 0}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Completed events
                            </p>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* HOST Dashboard */}
            {user?.role === "HOST" && (
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
            )}

            {/* ADMIN Dashboard */}
            {user?.role === "ADMIN" && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Total Users
                            </CardTitle>
                            <Users className="w-5 h-5 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-800">
                                {dashboardData.length || 0}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Registered users
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Total Hosts
                            </CardTitle>
                            <Users className="w-5 h-5 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-800">
                                {dashboardData.filter((u: any) => u.role === "HOST").length || 0}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Event organizers
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Regular Users
                            </CardTitle>
                            <Users className="w-5 h-5 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-800">
                                {dashboardData.filter((u: any) => u.role === "USER").length || 0}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Event participants
                            </p>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {user?.role === "USER" && (
                            <>
                                <Link
                                    href="/events"
                                    className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                                >
                                    <h3 className="font-semibold text-gray-800">Browse Events</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Discover new events to join
                                    </p>
                                </Link>
                                <Link
                                    href="/dashboard/upcoming-events"
                                    className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                                >
                                    <h3 className="font-semibold text-gray-800">Upcoming Events</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        View your scheduled events
                                    </p>
                                </Link>
                            </>
                        )}

                        {user?.role === "HOST" && (
                            <>
                                <Link
                                    href="/dashboard/my-hosted-events"
                                    className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                                >
                                    <h3 className="font-semibold text-gray-800">Create Event</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Host a new event
                                    </p>
                                </Link>
                                <Link
                                    href="/dashboard/participants"
                                    className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                                >
                                    <h3 className="font-semibold text-gray-800">Manage Participants</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        View and manage attendees
                                    </p>
                                </Link>
                                <Link
                                    href="/dashboard/revenue"
                                    className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                                >
                                    <h3 className="font-semibold text-gray-800">Revenue Report</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Track your earnings
                                    </p>
                                </Link>
                            </>
                        )}

                        {user?.role === "ADMIN" && (
                            <>
                                <Link
                                    href="/dashboard/users"
                                    className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                                >
                                    <h3 className="font-semibold text-gray-800">Manage Users</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        View and manage all users
                                    </p>
                                </Link>
                                <Link
                                    href="/dashboard/hosts"
                                    className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                                >
                                    <h3 className="font-semibold text-gray-800">Manage Hosts</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Oversee event organizers
                                    </p>
                                </Link>
                                <Link
                                    href="/dashboard/events"
                                    className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                                >
                                    <h3 className="font-semibold text-gray-800">Manage Events</h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Monitor all platform events
                                    </p>
                                </Link>
                            </>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
