import { Search, Ticket, Sparkles, Star } from "lucide-react";
import Link from "next/link";

export default function HowIsWork() {
    const steps = [
        {
            icon: <Search className="w-8 h-8 text-white" />,
            number: "01",
            title: "Browse Events",
            desc: "Explore thousands of events happening near you. Filter by category, date, or location to find your perfect match.",
        },
        {
            icon: <Ticket className="w-8 h-8 text-white" />,
            number: "02",
            title: "Book Instantly",
            desc: "Secure your spot with our fast, safe checkout. Get instant confirmation and tickets delivered to your email.",
        },
        {
            icon: <Sparkles className="w-8 h-8 text-white" />,
            number: "03",
            title: "Enjoy the Experience",
            desc: "Attend your event and create unforgettable memories with friends, family, or new connections.",
        },
        {
            icon: <Star className="w-8 h-8 text-white" />,
            number: "04",
            title: "Share & Review",
            desc: "Rate your experience and share feedback to help others discover amazing events in the community.",
        },
    ];

    return (
        <section className="py-20 bg-linear-to-b from-gray-50 to-white relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    {/* Top Label */}
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                        SIMPLE PROCESS
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        How <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">Eventora</span> Works
                    </h2>

                    {/* Subtitle */}
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Finding and booking your next event is easier than ever. Just four simple steps to your next unforgettable experience.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative group"
                        >
                            <div className="bg-white rounded-2xl p-6 border-purple-200 hover:shadow-xl transition-all duration-300 border hover:border-purple-200 h-full flex flex-col items-center text-center">
                                {/* Step Number */}
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-linear-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                    {step.number}
                                </div>

                                {/* Icon Circle */}
                                <div className="bg-linear-to-br from-purple-600 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 transition-transform duration-300 mb-6">
                                    {step.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 leading-relaxed">
                                    {step.desc}
                                </p>

                                {/* Hover Effect Arrow */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <svg
                                            className="w-8 h-8"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <Search className="w-5 h-5" />
                        Start Exploring Events
                    </Link>
                </div>
            </div>
        </section>
    );
}
