import { ShieldCheck, CreditCard, Headphones, Tag } from "lucide-react";

export default function WhyChooseEventora() {
    const items = [
        {
            icon: <ShieldCheck className="h-10 w-10 text-white" />,
            title: "Verified Hosts",
            desc: "Every host goes through our rigorous verification process to ensure quality and safety for all attendees.",
            color: "from-blue-500 to-blue-600",
        },
        {
            icon: <CreditCard className="h-10 w-10 text-white" />,
            title: "Secure Payments",
            desc: "Your transactions are protected with bank-level encryption and advanced fraud prevention systems.",
            color: "from-green-500 to-green-600",
        },
        {
            icon: <Headphones className="h-10 w-10 text-white" />,
            title: "24/7 Support",
            desc: "Our dedicated support team is always here to help you, any time of day or night.",
            color: "from-orange-500 to-orange-600",
        },
        {
            icon: <Tag className="h-10 w-10 text-white" />,
            title: "Best Price Guarantee",
            desc: "Find a lower price elsewhere? We'll match it and give you an additional 10% discount.",
            color: "from-purple-500 to-purple-600",
        },
    ];

    return (
        <section className="w-full bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    {/* Top Label */}
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                        OUR PROMISES
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Why <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">Choose</span> Eventora
                    </h2>

                    {/* Subheading */}
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                        We're committed to making your event experience seamless, safe, and memorable with our trusted platform.
                    </p>
                </div>

                {/* Grid items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="group relative bg-white rounded-2xl p-8 shadow-initial hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200 hover:-translate-y-2"
                        >
                            {/* Gradient Background on Hover */}
                            <div className="absolute inset-0 bg-linear-to-br from-purple-50 to-pink-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                                {/* Icon with gradient background */}
                                <div className={`p-6 rounded-2xl bg-linear-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {item.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 leading-relaxed">
                                    {item.desc}
                                </p>

                                {/* Decorative Element */}
                                <div className="w-12 h-1 bg-linear-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Stats Section */}
                <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-linear-to-r from-purple-50 via-pink-50 to-purple-50 rounded-2xl border border-purple-100">
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600 mb-2">
                            99.9%
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Uptime</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600 mb-2">
                            500K+
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Happy Users</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600 mb-2">
                            50K+
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Events Hosted</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600 mb-2">
                            4.9/5
                        </div>
                        <div className="text-sm text-gray-600 font-medium">Average Rating</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
