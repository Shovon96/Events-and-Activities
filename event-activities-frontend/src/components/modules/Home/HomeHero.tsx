"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Star } from "lucide-react";
import Link from "next/link";

const heroSlides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1920&q=80",
        badge: "10,000+ Events This Week",
        title: "Discover Unforgettable",
        highlight: "Experiences",
        subtitle: "Connect with amazing events and trusted hosts in your city. From concerts to workshops, find your next adventure.",
        stats: [
            { icon: Calendar, value: "50K+", label: "Active Events" },
            { icon: Users, value: "12K+", label: "Verified Hosts" },
            { icon: Star, value: "98%", label: "Happy Attendees" },
        ],
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80",
        badge: "Join the Community",
        title: "Create Your Lasting",
        highlight: "Memories",
        subtitle: "Experience the best events in your area. Meet new people, learn new skills, and make unforgettable memories.",
        stats: [
            { icon: Calendar, value: "500+", label: "Daily Events" },
            { icon: Users, value: "100K+", label: "Active Users" },
            { icon: Star, value: "4.9", label: "Average Rating" },
        ],
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80",
        badge: "Trending Now",
        title: "Explore Amazing",
        highlight: "Activities",
        subtitle: "From music festivals to tech workshops, discover events that match your interests and passions.",
        stats: [
            { icon: Calendar, value: "200+", label: "Categories" },
            { icon: Users, value: "5K+", label: "Event Hosts" },
            { icon: Star, value: "1M+", label: "Tickets Sold" },
        ],
    },
];

export default function HomeHero({ user }: { user: any }) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);

    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: false })
    );

    React.useEffect(() => {
        if (!api) return;

        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <section className="relative w-full">
            <Carousel
                setApi={setApi}
                plugins={[plugin.current]}
                className="w-full"
                opts={{
                    loop: true,
                }}
            >
                <CarouselContent>
                    {heroSlides.map((slide) => (
                        <CarouselItem key={slide.id}>
                            <div className="relative w-full h-[650px] flex items-center justify-center">
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={slide.image}
                                        alt="Event Background"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
                                </div>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-purple-900/50 via-blue-950/50 to-transparent" />

                                {/* Content */}
                                <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                                    <div>
                                        {/* Badge */}
                                        <div className="inline-flex items-center bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm mb-6 animate-fade-in">
                                            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                                            {slide.badge}
                                        </div>

                                        {/* Heading */}
                                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 animate-slide-up">
                                            {slide.title} <br />
                                            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
                                                {slide.highlight}
                                            </span>
                                        </h1>

                                        {/* Subtitle */}
                                        <p className="text-gray-200 text-lg sm:text-xl mb-8 max-w-2xl animate-slide-up-delay">
                                            {slide.subtitle}
                                        </p>

                                        {/* CTA Buttons */}
                                        <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up-delay-2">
                                            <Link href="/events">
                                                <Button className="w-full sm:w-auto px-8 py-6 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                                                    Explore Events
                                                </Button>
                                            </Link>
                                            {user?.role === 'USER' ? (
                                                <Link href="/my-events">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full sm:w-auto px-8 py-6 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white hover:text-white font-semibold text-lg rounded-lg transition-all duration-300 cursor-pointer"
                                                    >
                                                        My Events
                                                    </Button>
                                                </Link>
                                            ) : user?.role === 'HOST' ? (
                                                <Link href="/hosted-events">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full sm:w-auto px-8 py-6 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white hover:text-white font-semibold text-lg rounded-lg transition-all duration-300 cursor-pointer"
                                                    >
                                                        Hosted Events
                                                    </Button>
                                                </Link>
                                            ) : user?.role === 'ADMIN' ? (
                                                <Link href="/admin/dashboard">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full sm:w-auto px-8 py-6 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white hover:text-white font-semibold text-lg rounded-lg transition-all duration-300 cursor-pointer"
                                                    >
                                                        Admin Dashboard
                                                    </Button>
                                                </Link>
                                            ) : (
                                                <Link href="/become-host">
                                                    <Button
                                                        variant="outline"
                                                        className="w-full sm:w-auto px-8 py-6 bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white hover:text-white font-semibold text-lg rounded-lg transition-all duration-300 cursor-pointer"
                                                    >
                                                        Become a Host
                                                    </Button>
                                                </Link>
                                            )
                                            }
                                        </div>

                                        {/* Stats */}
                                        <div className="flex flex-wrap gap-8 text-white animate-fade-in-delay">
                                            {slide.stats.map((stat, index) => (
                                                <div key={index} className="flex items-center gap-3">
                                                    <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg">
                                                        <stat.icon className="w-5 h-5 text-purple-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                                                        <p className="text-sm text-gray-300">{stat.label}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Carousel Indicators (Dots) */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => api?.scrollTo(index)}
                            className={`transition-all duration-300 rounded-full ${current === index
                                ? "w-8 h-2 bg-white"
                                : "w-2 h-2 bg-white/50 hover:bg-white/75"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </Carousel>

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }

                .animate-fade-in-delay {
                    animation: fade-in 0.8s ease-out 0.6s both;
                }

                .animate-slide-up {
                    animation: slide-up 0.8s ease-out 0.2s both;
                }

                .animate-slide-up-delay {
                    animation: slide-up 0.8s ease-out 0.4s both;
                }

                .animate-slide-up-delay-2 {
                    animation: slide-up 0.8s ease-out 0.6s both;
                }
            `}</style>
        </section>
    );
}
