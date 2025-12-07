
import { getUserInfo } from "@/lib/getUserSession";
import { serverFetch } from "@/lib/serverFetch";
import UserDashboardStats from "@/components/dashboard/UserDashboardStats";
import AdminDashboardStats from "@/components/dashboard/AdminDashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";

export default async function DashboardPage() {
    const user = await getUserInfo();
    const userId = user?.id;

    // Fetch dashboard data based on role
    let dashboardData: any = {};
    let payments: any[] = [];

    if (user?.role === "USER") {
        // Fetch user's joined events
        const response = await serverFetch.get("/participants/my-events", {
            cache: "no-store",
            next: { tags: ["my-events"] }
        });

        const res = await serverFetch.get(`/payments/user/${userId}`, {
            cache: "no-store",
            next: { tags: ["user-payments"] }
        });

        const result = await response.json();
        const paymentsResult = await res.json();
        dashboardData = result.data || [];
        payments = paymentsResult.data || [];
    } 
    
    else if (user?.role === "ADMIN") {
        // Fetch all users for admin
        const response = await serverFetch.get("/users", {
            cache: "no-store",
            next: { tags: ["users"] }
        });
        const result = await response.json();
        dashboardData = result.data || [];
    }



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
                <UserDashboardStats dashboardData={dashboardData} payments={payments} />
            )}

            {/* ADMIN Dashboard */}
            {user?.role === "ADMIN" && (
                <AdminDashboardStats dashboardData={dashboardData} />
            )}

            {/* Quick Actions */}
            <QuickActions role={user?.role as "USER"} />
        </div>
    );
}
