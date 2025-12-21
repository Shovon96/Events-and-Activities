export const dynamic = "force-dynamic";
import EventCard from "@/components/shared/EventCard";
import { serverFetch } from "@/lib/serverFetch";
import EventsFilter from "@/components/modules/events/EventsFilter";
import { getUserInfo } from "@/lib/getUserSession";
import { redirect } from "next/navigation";
import { getCookie } from "@/service/auth.service";
import Link from "next/link";

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
            <div className="py-6 text-center">
                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    My <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">Hosted Events</span>
                </h2>
                <p className="text-gray-600 mt-2 max-w-[500px] mx-auto">View and manage your hosted events here. You can create, update, and delete events as needed.</p>
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
                <EventCard events={formattedData} currentUser={user} token={token} />
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

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="py-6 flex justify-center space-x-2">
                    {Array.from({ length: totalPages }).map((_, index) => {
                        const pageNum = index + 1;
                        const isActive = pageNum === page;

                        // Preserve all existing query parameters
                        const queryParams = new URLSearchParams();
                        if (params.searchTerm) queryParams.set("searchTerm", params.searchTerm);
                        if (params.status) queryParams.set("status", params.status);
                        if (params.location) queryParams.set("location", params.location);
                        if (params.type) queryParams.set("type", params.type);
                        if (params.sortBy) queryParams.set("sortBy", params.sortBy);
                        if (params.sortOrder) queryParams.set("sortOrder", params.sortOrder);
                        if (params.limit) queryParams.set("limit", params.limit);
                        queryParams.set("page", pageNum.toString());

                        return (
                            <Link
                                key={pageNum}
                                href={`?${queryParams.toString()}`}
                                className={`px-4 py-2 rounded-md text-sm font-medium ${isActive
                                    ? "bg-purple-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {pageNum}
                            </Link>
                        );
                    })}
                </div>
            )}
        </section>
    )
}
