export const dynamic = "force-dynamic";
import SignupForm from "@/components/modules/auth/SignupForm";
import logoImage from "@/assets/images/eventora-login-logo.png"
import Image from "next/image";

export default function BecomeHostPage() {
    return (
        <div className="flex min-h-screen bg-gray-50">

            {/* Left Section - Form */}
            <SignupForm
                role="HOST"
                title="Become a Host"
                subtitle="Start creating and managing your own events"
            />

            {/* Right Section - Host Branding */}
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
                        Become an Event Host
                    </h1>

                    <p className="text-purple-100 max-w-md text-lg">
                        Create and manage amazing events. Build your community and share your passion with thousands of attendees.
                    </p>
                </div>

                <div>
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                                <span className="text-2xl">🎯</span>
                            </div>
                            <div>
                                <p className="font-semibold">Create Events</p>
                                <p className="text-sm text-orange-100">Host unlimited events</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                                <span className="text-2xl">💰</span>
                            </div>
                            <div>
                                <p className="font-semibold">Earn Revenue</p>
                                <p className="text-sm text-orange-100">Monetize your events</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                                <span className="text-2xl">📊</span>
                            </div>
                            <div>
                                <p className="font-semibold">Track Analytics</p>
                                <p className="text-sm text-orange-100">Monitor your success</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-8 text-center">
                        <div>
                            <p className="text-3xl font-bold">5K+</p>
                            <p className="text-sm text-orange-100">Active Hosts</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold">50K+</p>
                            <p className="text-sm text-orange-100">Events Created</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold">1M+</p>
                            <p className="text-sm text-orange-100">Attendees</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
