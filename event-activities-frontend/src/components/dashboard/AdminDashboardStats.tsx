import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface AdminDashboardStatsProps {
    dashboardData: any[];
}

export default function AdminDashboardStats({ dashboardData }: AdminDashboardStatsProps) {
    return (
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
    );
}
