import EventCard from "@/components/shared/EventCard";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { getUserInfo } from "@/lib/getUserSession";
import { serverFetch } from "@/lib/serverFetch";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function MyEventsPage() {

    const user = await getUserInfo();

    if (!user) {
        redirect("/login");
    }

    const response = await serverFetch.get("/participants/my-events", {
        cache: "no-store",
        next: { tags: ["my-events"] }
    })

    const participantsData = await response.json();

    // Extract events from participants data
    const events = participantsData?.data?.map((participant: any) => participant.event) || [];

    // Format data to match EventCard expected structure
    const formattedData = {
        data: {
            data: events
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-4">
            <div className="py-4 flex justify-center text-center">
                <ManagementPageHeader
                    title="My Booked Events"
                    description="View and manage all the events you've joined"
                />
            </div>

            {/* Results Count */}
            {events.length > 0 && (
                <div className="py-4 text-sm text-gray-600">
                    You have joined {events.length} {events.length === 1 ? 'event' : 'events'}
                </div>
            )}

            {/* Events Grid */}
            {events.length > 0 ? (
                <EventCard events={formattedData} currentUser={user} />
            ) : (
                <div className="py-20 text-center">
                    <p className="text-gray-500 text-lg mb-4">You haven't joined any events yet</p>
                    <p className="text-gray-400 text-sm mb-6">Explore events and start your journey!</p>
                    <Link
                        href="/events"
                        className="inline-block bg-linear-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 font-semibold transition-all shadow-lg"
                    >
                        Explore Events
                    </Link>
                </div>
            )}
        </section>
    )
}
