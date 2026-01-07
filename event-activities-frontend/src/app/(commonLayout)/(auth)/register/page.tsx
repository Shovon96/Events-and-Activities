export const dynamic = "force-dynamic";
import SignupForm from "@/components/modules/auth/SignupForm";
import logoImage from "@/assets/images/eventora-login-logo.png"
import Image from "next/image";

const RegisterPage = () => {
    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                {/* Left Branding Section */}
                <div className="relative hidden lg:flex flex-col justify-between px-14 py-12 text-white 
                      bg-linear-to-br from-primary via-primary/90 to-secondary w-1/2">

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
                            Discover events that match your passion
                        </h1>

                        <p className="text-purple-100 max-w-md text-lg">
                            Join thousands of event enthusiasts. Find, attend, and create memorable experiences in your community.
                        </p>
                    </div>

                    <div>
                        <div className="flex gap-1 mb-8 items-center">
                            {[0, 1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 bg-white bg-opacity-30 rounded-full" />
                            ))}
                            <p className="text-sm text-purple-100 ml-3">10,000+ event lovers joined this month</p>
                        </div>
                        <div className="flex items-center gap-8 text-center">
                            <div>
                                <p className="text-3xl font-bold">50K+</p>
                                <p className="text-sm text-purple-100">Events</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold">200+</p>
                                <p className="text-sm text-purple-100">Cities</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold">1M+</p>
                                <p className="text-sm text-purple-100">Members</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section - Form */}
                <SignupForm
                    role="USER"
                    title="Create your account"
                    subtitle="Start discovering amazing events near you"
                />
            </div>
        </>
    );
};

export default RegisterPage;
