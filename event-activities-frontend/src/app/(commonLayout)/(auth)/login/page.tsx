export const dynamic = "force-dynamic";
import LoginForm from "@/components/modules/auth/LoginForm";
import logoImage from "@/assets/images/eventora-login-logo.png"
import Image from "next/image";

const LoginPage = () => {
    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                {/* Left Section - Purple Branding */}
                {/* Left Branding Section */}
                <div className="relative hidden lg:flex flex-col justify-between px-14 py-12 text-white 
                      bg-linear-to-br from-primary via-primary/90 to-secondary">

                    {/* Decorative overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_60%)]" />

                    <div className="relative z-10">
                        {/* Logo */}
                        <div className="mb-12">
                            <Image
                                src={logoImage}
                                alt="Eventora"
                                height={60}
                                width={220}
                                priority
                            />
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-6">
                            Welcome back to <br /> Eventora
                        </h1>

                        <p className="text-purple-100 max-w-md text-lg">
                            Discover events, manage your experiences, and stay connected with
                            your community — all in one place.
                        </p>
                    </div>

                    {/* Footer */}
                    <p className="relative z-10 text-sm text-purple-200">
                        © {new Date().getFullYear()} Eventora. All rights reserved.
                    </p>
                </div>

                {/* Right Section - Form */}
                <LoginForm />
            </div>
        </>
    );
};

export default LoginPage;
