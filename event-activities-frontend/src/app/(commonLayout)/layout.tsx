import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { getUserInfo } from "@/lib/getUserSession";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
    // const role = await getUserInfo();
    // console.log("role", role)
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

export default CommonLayout;