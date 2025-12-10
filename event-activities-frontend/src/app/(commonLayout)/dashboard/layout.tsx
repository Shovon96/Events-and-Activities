import DashboardSidebar from "@/components/shared/DashboardSidebar";
import { getUserInfo } from "@/lib/getUserSession";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getUserInfo();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <DashboardSidebar role={user.role as "USER"} />
            <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8">{children}</main>
        </div>
    );
}
