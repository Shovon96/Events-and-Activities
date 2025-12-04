import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
    // const role = await getSessionRole();
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

export default CommonLayout;