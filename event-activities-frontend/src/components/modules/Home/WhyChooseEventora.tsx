import { ShieldCheck, CreditCard, Headphones, Tag } from "lucide-react";

export default function WhyChooseEventora() {
    const items = [
        {
            icon: <ShieldCheck className="h-10 w-10 text-white" />,
            title: "Verified Hosts",
            desc: "Every host goes through our rigorous verification process to ensure quality and safety.",
        },
        {
            icon: <CreditCard className="h-10 w-10 text-white" />,
            title: "Secure Payments",
            desc: "Your transactions are protected with bank-level encryption and fraud prevention.",
        },
        {
            icon: <Headphones className="h-10 w-10 text-white" />,
            title: "24/7 Support",
            desc: "Our dedicated team is always here to help, any time of day or night.",
        },
        {
            icon: <Tag className="h-10 w-10 text-white" />,
            title: "Best Price Guarantee",
            desc: "Find a lower price elsewhere? We'll match it and give you 10% off.",
        },
    ];

    return (
        <section className="w-full py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto text-center px-6">

                {/* Top small heading */}
                <p className="text-sm font-semibold text-secondary tracking-widest mb-2">
                    OUR PROMISE
                </p>

                {/* Main heading */}
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Why Choose Eventora
                </h2>

                {/* Subheading */}
                <p className="text-gray-600 max-w-3xl mx-auto mb-16">
                    We're committed to making your event experience seamless, safe, and memorable.
                </p>

                {/* Grid items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center text-center space-y-4"
                        >
                            {/* Icon with soft circle */}
                            <div className="p-6 rounded-full bg-primary flex items-center justify-center">
                                {item.icon}
                            </div>

                            <h3 className="text-lg font-semibold text-gray-800">
                                {item.title}
                            </h3>

                            <p className="text-gray-600 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
