export const dynamic = "force-dynamic";
import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { getUserInfo } from "@/lib/getUserSession";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
    const userInfo = await getUserInfo();
    const role = userInfo?.role || "GUEST";

    return (
        <>
            <Navbar userInfo={userInfo} role={role} />
            <div className="min-h-screen">
                {children}
            </div>
            <Footer />
        </>
    );
};

export default CommonLayout;