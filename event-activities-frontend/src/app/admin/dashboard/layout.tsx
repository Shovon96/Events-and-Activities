import DashboardSidebar from "@/components/shared/DashboardSidebar";
import { getUserInfo } from "@/lib/getUserSession";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getUserInfo();

    if (user?.role !== "ADMIN") {
        redirect("/login");
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <DashboardSidebar role={user.role as "ADMIN"} />
            <main className="flex-1 p-4 pt-8">{children}</main>
        </div>
    );
}
