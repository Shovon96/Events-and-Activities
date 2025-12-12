export const dynamic = "force-dynamic";
import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <Navbar />
            <div className="min-h-screen">
                {children}
            </div>
            <Footer />
        </>
    );
};

export default CommonLayout;