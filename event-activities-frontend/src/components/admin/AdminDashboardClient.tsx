"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    Users, 
    UserCheck, 
    Calendar, 
    CalendarCheck, 
    DollarSign,
    TrendingUp,
    Activity,
    BarChart3
} from "lucide-react";

interface AdminDashboardData {
    totalUsers?: number;
    totalHosts?: number;
    totalEvents?: number;
    activeEvents?: number;
    upcomingEvents?: number;
    totalRevenue?: number;
    monthlyUsers?: Array<{ month: string; count: number }>;
    monthlyEvents?: Array<{ month: string; count: number }>;
    monthlyPayments?: Array<{ month: string; amount: number }>;
    topCategories?: Array<{ category: string; count: number }>;
}

interface AdminDashboardClientProps {
    data: AdminDashboardData;
}

export default function AdminDashboardClient({ data }: AdminDashboardClientProps) {
    const {
        totalUsers = 0,
        totalHosts = 0,
        totalEvents = 0,
        activeEvents = 0,
        upcomingEvents = 0,
        totalRevenue = 0,
        monthlyUsers = [],
        monthlyEvents = [],
        monthlyPayments = [],
        topCategories = []
    } = data;

    // Calculate growth percentages (mock data for now)
    const userGrowth = 12.5;
    const hostGrowth = 8.3;
    const eventGrowth = 15.7;
    const revenueGrowth = 23.4;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Admin Dashboard
                </h1>
                <p className="text-gray-600">
                    Monitor your platform's performance and analytics
                </p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Users */}
                <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
                                <h3 className="text-3xl font-bold text-gray-900">{totalUsers.toLocaleString()}</h3>
                                <div className="flex items-center gap-1 mt-2">
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                    <span className="text-sm text-green-600 font-semibold">+{userGrowth}%</span>
                                    <span className="text-xs text-gray-500">vs last month</span>
                                </div>
                            </div>
                            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                                <Users className="w-7 h-7 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Total Hosts */}
                <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Total Hosts</p>
                                <h3 className="text-3xl font-bold text-gray-900">{totalHosts.toLocaleString()}</h3>
                                <div className="flex items-center gap-1 mt-2">
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                    <span className="text-sm text-green-600 font-semibold">+{hostGrowth}%</span>
                                    <span className="text-xs text-gray-500">vs last month</span>
                                </div>
                            </div>
                            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                                <UserCheck className="w-7 h-7 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Total Events */}
                <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Total Events</p>
                                <h3 className="text-3xl font-bold text-gray-900">{totalEvents.toLocaleString()}</h3>
                                <div className="flex items-center gap-1 mt-2">
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                    <span className="text-sm text-green-600 font-semibold">+{eventGrowth}%</span>
                                    <span className="text-xs text-gray-500">vs last month</span>
                                </div>
                            </div>
                            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                                <Calendar className="w-7 h-7 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Total Revenue */}
                <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
                                <h3 className="text-3xl font-bold text-gray-900">৳{totalRevenue.toLocaleString()}</h3>
                                <div className="flex items-center gap-1 mt-2">
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                    <span className="text-sm text-green-600 font-semibold">+{revenueGrowth}%</span>
                                    <span className="text-xs text-gray-500">vs last month</span>
                                </div>
                            </div>
                            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                                <DollarSign className="w-7 h-7 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Active Events */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Active Events</p>
                                <h3 className="text-2xl font-bold text-gray-900">{activeEvents.toLocaleString()}</h3>
                                <p className="text-xs text-gray-500 mt-1">Currently running</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <Activity className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Upcoming Events</p>
                                <h3 className="text-2xl font-bold text-gray-900">{upcomingEvents.toLocaleString()}</h3>
                                <p className="text-xs text-gray-500 mt-1">Scheduled soon</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <CalendarCheck className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Users Chart */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-blue-600" />
                            Monthly New Users
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-end justify-between gap-2">
                            {monthlyUsers.length > 0 ? (
                                monthlyUsers.map((item, index) => {
                                    const maxCount = Math.max(...monthlyUsers.map(u => u.count));
                                    const height = (item.count / maxCount) * 100;
                                    return (
                                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                            <div className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-colors relative group" style={{ height: `${height}%` }}>
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    {item.count} users
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-600 font-medium">{item.month}</span>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    No data available
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Monthly Events Chart */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-orange-600" />
                            Monthly Events Created
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-end justify-between gap-2">
                            {monthlyEvents.length > 0 ? (
                                monthlyEvents.map((item, index) => {
                                    const maxCount = Math.max(...monthlyEvents.map(e => e.count));
                                    const height = (item.count / maxCount) * 100;
                                    return (
                                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                            <div className="w-full bg-orange-500 rounded-t-lg hover:bg-orange-600 transition-colors relative group" style={{ height: `${height}%` }}>
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    {item.count} events
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-600 font-medium">{item.month}</span>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    No data available
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Monthly Payments Chart */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-green-600" />
                            Payments Over Time
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-end justify-between gap-2">
                            {monthlyPayments.length > 0 ? (
                                monthlyPayments.map((item, index) => {
                                    const maxAmount = Math.max(...monthlyPayments.map(p => p.amount));
                                    const height = (item.amount / maxAmount) * 100;
                                    return (
                                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                            <div className="w-full bg-green-500 rounded-t-lg hover:bg-green-600 transition-colors relative group" style={{ height: `${height}%` }}>
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    ৳{item.amount.toLocaleString()}
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-600 font-medium">{item.month}</span>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    No data available
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Categories */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-purple-600" />
                            Top Event Categories
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {topCategories.length > 0 ? (
                                topCategories.map((item, index) => {
                                    const maxCount = Math.max(...topCategories.map(c => c.count));
                                    const percentage = (item.count / maxCount) * 100;
                                    const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500'];
                                    return (
                                        <div key={index}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-gray-700">{item.category}</span>
                                                <span className="text-sm font-semibold text-gray-900">{item.count}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div 
                                                    className={`${colors[index % colors.length]} h-2.5 rounded-full transition-all duration-500`}
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="h-48 flex items-center justify-center text-gray-400">
                                    No data available
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
