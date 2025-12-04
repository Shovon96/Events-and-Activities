"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";

export default function HomeHero() {
    return (
        <section className="relative w-full h-[650px] flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1920&q=80"
                    alt="Event Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
            </div>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-[#c042c9]/50 via-blue-950/50 to-transparent" />

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center md:text-left">

                {/* Badge */}
                <div className="inline-flex items-center bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm mb-6">
                    <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                    10,000+ events happening this week
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                    Discover <span className="text-primary">Unforgettable</span> <br />
                    Experiences
                </h1>

                {/* Subtitle */}
                <p className="text-gray-200 mt-4 max-w-xl">
                    Connect with amazing events and trusted hosts in your city.
                    From concerts to workshops, find your next adventure.
                </p>

                {/* Search Bar */}
                <div className="mt-10 bg-white rounded-xl shadow-xl p-3 flex flex-col md:flex-row items-center gap-3">
                    {/* Search Events */}
                    <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg w-full">
                        <Search className="text-secondary mr-3" size={20} />
                        <Input
                            placeholder="Search events..."
                            className="border-none bg-transparent shadow-none focus:ring-0"
                        />
                    </div>

                    {/* Location */}
                    <div className="flex items-center px-4 py-3 bg-gray-100 rounded-lg w-full">
                        <MapPin className="text-secondary mr-3" size={20} />
                        <Input
                            placeholder="Location"
                            className="border-none bg-transparent shadow-none focus:ring-0"
                        />
                    </div>

                    {/* Button */}
                    <Button className="w-full md:w-auto px-6 py-6 bg-primary hover:bg-primary/90 text-white font-semibold text-lg">
                        Explore Events
                    </Button>
                </div>

                {/* Stats */}
                <div className="flex justify-center md:justify-start gap-10 mt-10 text-white">
                    <div>
                        <h3 className="text-2xl font-bold">50K+</h3>
                        <p className="text-sm text-gray-300">Active Events</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">12K+</h3>
                        <p className="text-sm text-gray-300">Verified Hosts</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">98%</h3>
                        <p className="text-sm text-gray-300">Happy Attendees</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
