
import EventCard from "@/components/shared/EventCard";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";

export default async function EventsPage() {

    // Make API call to backend to get full user data
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/v1/api";
    const endpoint = `${API_BASE_URL}/events`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    const events = await response.json();

    return (
        <section className="max-w-7xl mx-auto px-4">
            <div className="py-4 flex justify-center text-center">
                <ManagementPageHeader title="Explore Latest Events" description="Discover the latest events and activities happening around you." />
            </div>

            {/* Grid */}
                <EventCard events={events} />
        
        </section>
    )
}
