export const dynamic = "force-dynamic";
import EventCard from "@/components/shared/EventCard";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { serverFetch } from "@/lib/serverFetch";
import EventsFilter from "@/components/modules/events/EventsFilter";
import { getUserInfo } from "@/lib/getUserSession";
import { redirect } from "next/navigation";
import { getCookie } from "@/service/auth.service";

interface SearchParams {
    searchTerm?: string;
    status?: string;
    location?: string;
    type?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
}

export default async function HostedEventsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {

    const user = await getUserInfo();
    // console.log(user)

    if (!user) {
        redirect("/login");
    }

    const params = await searchParams;
    const token = await getCookie("accessToken");

    const response = await serverFetch.get("/users/my-profile", {
        cache: "no-store",
        next: { tags: ["my-profile"] }
    });

    const result = await response.json();
    const allHostedEvents = result.data?.hostedEvents || [];

    // Apply filters
    let filteredEvents = allHostedEvents;

    // Filter by search term
    if (params.searchTerm) {
        filteredEvents = filteredEvents.filter((event: any) =>
            event.name.toLowerCase().includes(params.searchTerm!.toLowerCase()) ||
            event.description?.toLowerCase().includes(params.searchTerm!.toLowerCase())
        );
    }

    // Filter by status
    if (params.status) {
        filteredEvents = filteredEvents.filter((event: any) =>
            event.status === params.status
        );
    }

    // Filter by location
    if (params.location) {
        filteredEvents = filteredEvents.filter((event: any) =>
            event.location === params.location
        );
    }

    // Filter by type
    if (params.type) {
        filteredEvents = filteredEvents.filter((event: any) =>
            event.type === params.type
        );
    }

    // Sort events
    if (params.sortBy) {
        filteredEvents = [...filteredEvents].sort((a: any, b: any) => {
            const order = params.sortOrder === 'desc' ? -1 : 1;
            if (params.sortBy === 'startDate') {
                return order * (new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
            }
            if (params.sortBy === 'ticketPrice') {
                return order * (a.ticketPrice - b.ticketPrice);
            }
            return 0;
        });
    }

    // Pagination
    const page = parseInt(params.page || '1');
    const limit = parseInt(params.limit || '9');
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredEvents.length / limit);

    // Get unique locations and types from all hosted events
    const allLocations = allHostedEvents.map((event: any) => event.location);
    const uniqueLocations = [...new Set(allLocations)];

    const allTypes = allHostedEvents.map((event: any) => event.type);
    const uniqueTypes = [...new Set(allTypes)];

    const formattedData = {
        data: {
            data: paginatedEvents
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-4">
            <div className="py-6 flex justify-center text-center">
                <ManagementPageHeader
                    title="My Hosted Events"
                    description="View and manage your hosted events here. You can create, update, and delete events as needed."
                />
            </div>

            <EventsFilter
                locations={uniqueLocations}
                types={uniqueTypes}
            />

            {/* Results Count */}
            {filteredEvents.length > 0 && (
                <div className="py-4 text-sm text-gray-600">
                    Showing {paginatedEvents.length} of {filteredEvents.length} events
                    {params.searchTerm && ` for "${params.searchTerm}"`}
                </div>
            )}

            {/* Grid */}
            {paginatedEvents.length > 0 ? (
                <EventCard events={formattedData} currentUser={user} token={token}/>
            ) : (
                <div className="py-20 text-center">
                    <p className="text-gray-500 text-lg">No events found</p>
                    <p className="text-gray-400 text-sm mt-2">
                        {params.searchTerm || params.status || params.location || params.type
                            ? "Try adjusting your filters"
                            : "You haven't created any events yet"}
                    </p>
                </div>
            )}
        </section>
    )
}
