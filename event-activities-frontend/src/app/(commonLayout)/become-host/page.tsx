export const dynamic = "force-dynamic";
import SignupForm from "@/components/modules/auth/SignupForm";
import favicon from "@/app/favicon.ico";
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
            <div className="hidden lg:flex w-2/5 bg-linear-to-b from-orange-600 via-orange-500 to-pink-600 flex-col justify-between p-12 text-white">
                <div>
                    {/* logo */}
                    <div className="flex items-center gap-2 py-3">
                        <Image height={50} width={50} src={favicon} alt="Eventora" />
                        <h1 className="text-4xl font-bold italic leading-tight">Eventora</h1>
                    </div>
                    <h1 className="text-4xl font-bold mb-4 leading-tight">Become an Event Host</h1>
                    <p className="text-orange-100 mb-8">
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
