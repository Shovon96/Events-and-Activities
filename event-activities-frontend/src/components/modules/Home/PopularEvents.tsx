import EventCard from "@/components/shared/EventCard";
import Link from "next/link";
import { getUserInfo } from "@/lib/getUserSession";
import { getCookie } from "@/service/auth.service";
import { serverFetch } from "@/lib/serverFetch";

export default async function PopularEvents() {
    const user = await getUserInfo();
    const token = await getCookie("accessToken");

    // Fetch events on server side
    let events: any[] = [];
    try {
        const res = await serverFetch.get("/events", {
            cache: "no-store",
        });

        const result = await res.json();
        events = result?.data?.data || [];
    } catch (error) {
        console.error("Failed to fetch events", error);
    }

    // Get first 6 events
    const showEvents = events?.slice(0, 6);

    const formattedData = {
        data: {
            data: showEvents,
        },
    };

    return (
        <section className="pb-20 max-w-7xl mx-auto px-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                        TRENDING NOW
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                        Popular{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">
                            Events
                        </span>
                    </h2>
                </div>

                <Link
                    href="/events"
                    className="text-sm font-semibold text-primary hover:underline"
                >
                    View All Events →
                </Link>
            </div>

            {/* Grid */}
            <EventCard events={formattedData} currentUser={user} token={token} />
        </section>
    );
}