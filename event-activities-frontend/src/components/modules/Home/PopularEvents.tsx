import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const events = [
    {
        id: 1,
        title: "Summer Music Festival 2024",
        category: "Music",
        price: 149,
        date: "Aug 15-17, 2024",
        location: "Central Park, NYC",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80",
    },
    {
        id: 2,
        title: "Tech Innovation Summit",
        category: "Tech",
        price: 299,
        date: "Sep 5, 2024",
        location: "Convention Center, SF",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    },
    {
        id: 3,
        title: "Artisan Food & Wine Expo",
        category: "Food",
        price: 75,
        date: "Sep 12, 2024",
        location: "Waterfront, Chicago",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    },
    {
        id: 4,
        title: "Championship Basketball Finals",
        category: "Sports",
        price: 199,
        date: "Oct 1, 2024",
        location: "Sports Arena, LA",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80",
    },
    {
        id: 5,
        title: "Contemporary Art Exhibition",
        category: "Arts",
        price: 35,
        date: "Sep 20-30, 2024",
        location: "Modern Gallery, Miami",
        image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=600&q=80",
    },
    {
        id: 6,
        title: "Wellness & Yoga Retreat",
        category: "Wellness",
        price: 450,
        date: "Oct 8-10, 2024",
        location: "Mountain Resort, Denver",
        image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80",
    },
];

export default function PopularEvents() {
    return (
        <section className="pb-20 max-w-7xl mx-auto px-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-sm text-secondary font-semibold tracking-wide">
                        TRENDING NOW
                    </p>
                    <h2 className="text-4xl font-bold">Popular Events</h2>
                </div>
                <Button variant={"outline"} className="cursor-pointer hover:bg-primary/10">
                    View All Events →
                </Button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <Card
                        key={event.id}
                        className={cn(
                            "group overflow-hidden rounded-xl border shadow-sm transition-all",
                            "hover:shadow-lg hover:-translate-y-1 py-0 cursor-pointer duration-400"
                        )}
                    >
                        {/* Image */}
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Category badge */}
                            <span className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded-full">
                                {event.category}
                            </span>

                            {/* Price badge */}
                            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                                ${event.price}
                            </span>
                        </div>

                        {/* Content */}
                        <CardContent className="p-4">
                            <CardTitle className="text-base font-semibold mb-2">
                                {event.title}
                            </CardTitle>

                            {/* Date */}
                            <div className="flex items-center text-sm text-gray-600 mb-1">
                                <Calendar className="text-secondary w-4 h-4 mr-2" />
                                {event.date}
                            </div>

                            {/* Location */}
                            <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="text-secondary w-4 h-4 mr-2" />
                                {event.location}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
