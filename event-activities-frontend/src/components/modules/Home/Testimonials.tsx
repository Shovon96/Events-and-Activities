import { Quote, Star } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
    const testimonials = [
        {
            text: `“Eventora made finding local events so easy! I've discovered amazing concerts and workshops I never would have found otherwise. The booking process is seamless.”`,
            name: "Jessica Thompson",
            role: "Event Enthusiast",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
        },
        {
            text: `“As a host, Eventora has transformed how I reach my audience. The platform is intuitive, and the support team is incredibly responsive. Highly recommend!”`,
            name: "Michael Park",
            role: "Workshop Host",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
        },
        {
            text: `“The variety of events is incredible. From tech meetups to food festivals, there's always something exciting happening. Best event platform I've used!”`,
            name: "Amanda Foster",
            role: "Tech Professional",
            avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
        },
    ];

    return (
        <section className="w-full py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 text-center">

                {/* Top Label */}
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                        TESTIMONIALS
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Our <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">Community</span> Says
                    </h2>

                {/* Subheading */}
                <p className="text-gray-600 max-w-2xl mx-auto mb-16">
                    Join thousands of happy event-goers and hosts who trust Eventora.
                </p>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {testimonials.map((item, i) => (
                        <div
                            key={i}
                            className="relative bg-white shadow-sm border border-gray-200 rounded-3xl p-8 text-left hover:shadow-md transition"
                        >
                            {/* Quote Badge */}
                            <div className="absolute -top-6 left-6 bg-rose-400 text-white p-3 rounded-full shadow-md">
                                <Quote className="h-5 w-5" />
                            </div>

                            {/* Rating */}
                            <div className="flex space-x-1 mb-4 mt-4">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                    <Star
                                        key={idx}
                                        className="h-5 w-5 text-amber-400 fill-amber-400"
                                    />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-700 leading-relaxed mb-8">{item.text}</p>

                            <hr className="border-gray-200 mb-6" />

                            {/* User Info */}
                            <div className="flex items-center space-x-3">
                                <Image
                                    src={item.avatar}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                    className="rounded-full object-cover h-16 w-16"
                                />

                                <div>
                                    <p className="font-semibold text-gray-900">{item.name}</p>
                                    <p className="text-sm text-gray-600">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
