export const dynamic = "force-dynamic";
import LoginForm from "@/components/modules/auth/LoginForm";
import favicon from "@/app/favicon.ico"
import Image from "next/image";

const LoginPage = () => {
    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                {/* Left Section - Purple Branding */}
                <div className="hidden lg:flex w-2/5 bg-linear-to-b from-primary via-primary/90 to-secondary flex-col justify-between p-12 text-white">
                    <div>
                        {/* logo */}
                        <div className="flex items-center gap-2 py-3">
                            <Image height={50} width={50} src={favicon} alt="Eventora" />
                            <h1 className="text-4xl font-bold italic leading-tight">Eventora</h1>
                        </div>
                        <h1 className="text-4xl font-bold mb-4 leading-tight">Welcome back to your event journey</h1>
                        <p className="text-purple-100 mb-8">Continue exploring amazing events and connecting with your community. Your next adventure awaits!</p>
                        {/* login creadentials card */}
                        <div className="bg-black/40 shadow-lg p-4 rounded-md">
                            <p><strong>User:</strong> eventora@user.com</p>
                            <p><strong>Host:</strong> eventora@host.com</p>
                            <p><strong>Admin:</strong> eventora@admin.com</p>
                            <p><strong>All Pass:</strong> EventoraPass</p>
                        </div>
                    </div>

                    {/* Login Creadentials */}

                </div>

                {/* Right Section - Form */}
                <LoginForm />
            </div>
        </>
    );
};

export default LoginPage;
