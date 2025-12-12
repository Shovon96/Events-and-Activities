export const dynamic = "force-dynamic";
import HostDashboardStats from "@/components/dashboard/HostDashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import { getUserInfo } from "@/lib/getUserSession";
import { serverFetch } from "@/lib/serverFetch";

export default async function HostDashboardPage() {

    const user = await getUserInfo();

    // Fetch dashboard data based on role
    let dashboardData: any = {};
    if (user?.role === "HOST") {
        // Fetch host's profile with hosted events
        const response = await serverFetch.get("/users/my-profile", {
            cache: "no-store",
            next: { tags: ["my-profile"] }
        });
        const result = await response.json();
        dashboardData = result.data || {};
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

            {/* HOST Dashboard */}
            {user?.role === "HOST" && (
                <HostDashboardStats dashboardData={dashboardData} />
            )}

            {/* Quick Actions */}
            <QuickActions role={user?.role as "HOST"} />
        </div>
    )
}
