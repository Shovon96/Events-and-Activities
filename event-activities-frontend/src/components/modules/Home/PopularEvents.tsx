import { Button } from "@/components/ui/button";
import EventCard from "@/components/shared/EventCard";

const events = {
    data: {
        data: [
            {
                id: "1",
                name: "Summer Music Festival 2024",
                type: "Music",
                ticketPrice: 149,
                startDate: new Date("2024-08-15"),
                endDate: new Date("2024-08-17"),
                location: "Central Park, NYC",
                image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80",
            },
            {
                id: "2",
                name: "Tech Innovation Summit",
                type: "Tech",
                ticketPrice: 299,
                startDate: new Date("2024-09-05"),
                endDate: new Date("2024-09-05"),
                location: "Convention Center, SF",
                image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
            },
            {
                id: "3",
                name: "Artisan Food & Wine Expo",
                type: "Food",
                ticketPrice: 75,
                startDate: new Date("2024-09-12"),
                endDate: new Date("2024-09-12"),
                location: "Waterfront, Chicago",
                image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
            },
            {
                id: "4",
                name: "Championship Basketball Finals",
                type: "Sports",
                ticketPrice: 199,
                startDate: new Date("2024-10-01"),
                endDate: new Date("2024-10-01"),
                location: "Sports Arena, LA",
                image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80",
            },
            {
                id: "5",
                name: "Contemporary Art Exhibition",
                type: "Arts",
                ticketPrice: 35,
                startDate: new Date("2024-09-20"),
                endDate: new Date("2024-09-30"),
                location: "Modern Gallery, Miami",
                image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=600&q=80",
            },
            {
                id: "6",
                name: "Wellness & Yoga Retreat",
                type: "Wellness",
                ticketPrice: 450,
                startDate: new Date("2024-10-08"),
                endDate: new Date("2024-10-10"),
                location: "Mountain Resort, Denver",
                image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&q=80",
            },
        ]
    }
};


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
            <EventCard events={events} />
        </section>
    );
}
