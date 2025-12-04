import { Search, Ticket, Sparkles } from "lucide-react";

export default function HowIsWork() {
    const steps = [
        {
            icon: <Search className="w-8 h-8 text-white" />,
            title: "Browse Events",
            desc: "Explore thousands of events happening near you. Filter by category, date, or location.",
        },
        {
            icon: <Ticket className="w-8 h-8 text-white" />,
            title: "Book Instantly",
            desc: "Secure your spot with our fast, safe checkout. Get instant confirmation to your email.",
        },
        {
            icon: <Sparkles className="w-8 h-8 text-white" />,
            title: "Enjoy the Experience",
            desc: "Have an amazing time and rate your experience to help others discover events.",
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 text-center">

                {/* Top Label */}
                <p className="text-sm tracking-widest text-secondary font-semibold">
                    SIMPLE PROCESS
                </p>

                {/* Heading */}
                <h2 className="text-4xl font-bold mt-2 mb-4">
                    How Eventora Works
                </h2>

                {/* Subtitle */}
                <p className="text-muted-foreground max-w-2xl mx-auto mb-16">
                    Finding and booking your next event is easier than ever.
                    Just three simple steps to your next unforgettable experience.
                </p>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-14 relative">

                    {/* Connector Line for Desktop */}
                    <div className="hidden max-w-3xl mx-auto md:block absolute left-0 right-0 top-[60px] h-0.5 bg-secondary"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="relative flex flex-col items-center text-center">

                            {/* Icon Circle */}
                            <div className="bg-primary w-20 h-20 rounded-xl flex items-center justify-center shadow-md relative z-10">
                                {step.icon}
                            </div>

                            {/* Title */}
                            <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>

                            {/* Description */}
                            <p className="mt-2 text-gray-500 max-w-xs">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
