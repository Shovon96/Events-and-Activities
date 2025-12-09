import AdminDashboardClient from "@/components/admin/AdminDashboardClient";
import { serverFetch } from "@/lib/serverFetch";

export default async function AdminDashboardPage() {
    // Fetch admin dashboard data
    const response = await serverFetch.get("/admin/dashboard-stats");
    const data = await response.json();
    const dashboardData = data?.data || {};

    return <AdminDashboardClient data={dashboardData} />;
}
