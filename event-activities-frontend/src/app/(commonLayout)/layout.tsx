import PublicFooter from "@/components/shared/PublicFooter";
import { Navbar } from "@/components/shared/Navbar";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
    // const role = await getSessionRole();
    return (
        <>
            <Navbar />
            {children}
            <PublicFooter />
        </>
    );
};

export default CommonLayout;