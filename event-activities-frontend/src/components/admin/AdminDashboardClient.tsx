"use client";

import { Users, UserCheck, Calendar, CalendarCheck, DollarSign, Activity } from "lucide-react";
import StatsCard from "./StatsCard";
import SecondaryStatsCard from "./SecondaryStatsCard";
import MonthlyUsersChart from "./MonthlyUsersChart";
import MonthlyEventsChart from "./MonthlyEventsChart";
import MonthlyPaymentsChart from "./MonthlyPaymentsChart";
import TopCategoriesChart from "./TopCategoriesChart";

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
                <StatsCard
                    title="Total Users"
                    value={totalUsers}
                    growth={userGrowth}
                    icon={Users}
                    iconColor="text-blue-600"
                    iconBgColor="bg-blue-100"
                    borderColor="border-l-blue-500"
                />
                <StatsCard
                    title="Total Hosts"
                    value={totalHosts}
                    growth={hostGrowth}
                    icon={UserCheck}
                    iconColor="text-purple-600"
                    iconBgColor="bg-purple-100"
                    borderColor="border-l-purple-500"
                />
                <StatsCard
                    title="Total Events"
                    value={totalEvents}
                    growth={eventGrowth}
                    icon={Calendar}
                    iconColor="text-orange-600"
                    iconBgColor="bg-orange-100"
                    borderColor="border-l-orange-500"
                />
                <StatsCard
                    title="Total Revenue"
                    value={totalRevenue}
                    growth={revenueGrowth}
                    icon={DollarSign}
                    iconColor="text-green-600"
                    iconBgColor="bg-green-100"
                    borderColor="border-l-green-500"
                    formatValue={(val) => `৳${val.toLocaleString()}`}
                />
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SecondaryStatsCard
                    title="Active Events"
                    value={activeEvents}
                    subtitle="Currently running"
                    icon={Activity}
                    iconColor="text-green-600"
                    iconBgColor="bg-green-100"
                />
                <SecondaryStatsCard
                    title="Upcoming Events"
                    value={upcomingEvents}
                    subtitle="Scheduled soon"
                    icon={CalendarCheck}
                    iconColor="text-blue-600"
                    iconBgColor="bg-blue-100"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MonthlyUsersChart data={monthlyUsers} />
                <MonthlyEventsChart data={monthlyEvents} />
                <MonthlyPaymentsChart data={monthlyPayments} />
                <TopCategoriesChart data={topCategories} />
            </div>
        </div>
    );
}
