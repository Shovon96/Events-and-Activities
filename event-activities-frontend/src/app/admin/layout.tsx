import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
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

    const role = user?.role || "GUEST";

    return (
        <>
            <Navbar userInfo={user} role={role} />
            <div className="min-h-screen">
                {children}
            </div>
            <Footer />
        </>
    );
}
