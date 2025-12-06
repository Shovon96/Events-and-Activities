
import EventsFilter from "@/components/modules/events/EventsFilter";
import EventCard from "@/components/shared/EventCard";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";

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

export default async function EventsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {

    const params = await searchParams;

    // Build query string from search params
    const queryParams = new URLSearchParams();

    if (params.searchTerm) queryParams.set("searchTerm", params.searchTerm);
    if (params.status) queryParams.set("status", params.status);
    if (params.location) queryParams.set("location", params.location);
    if (params.type) queryParams.set("type", params.type);
    if (params.page) queryParams.set("page", params.page);
    if (params.limit) queryParams.set("limit", params.limit);
    if (params.sortBy) queryParams.set("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.set("sortOrder", params.sortOrder);

    // Make API call to backend with query params
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/v1/api";
    const endpoint = `${API_BASE_URL}/events?${queryParams.toString()}`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    const events = await response.json();

    // Fetch all locations (without filters) for the filter dropdown
    const allLocationsEndpoint = `${API_BASE_URL}/events`;
    const allLocationsResponse = await fetch(allLocationsEndpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });
    const allEventsData = await allLocationsResponse.json();
    
    // Get unique locations from all events
    const allLocations = allEventsData?.data?.data?.map((event: any) => event.location) || [];
    const uniqueLocations = [...new Set(allLocations)];

    // Get unique event types from all events
    const allTypes = allEventsData?.data?.data?.map((event: any) => event.type) || [];
    const uniqueTypes = [...new Set(allTypes)];


    return (
        <section className="max-w-7xl mx-auto px-4">
            <div className="py-8 flex justify-center text-center">
                <ManagementPageHeader
                    title="Explore Latest Events"
                    description="Discover the latest events and activities happening around you."
                />
            </div>

            <EventsFilter
                locations={uniqueLocations}
                types={uniqueTypes}
            />

            {/* Results Count */}
            {events?.data?.meta && (
                <div className="py-4 text-sm text-gray-600">
                    Showing {events.data.data.length} of {events.data.meta.total} events
                    {params.searchTerm && ` for "${params.searchTerm}"`}
                </div>
            )}

            {/* Grid */}
            {events?.data?.data?.length > 0 ? (
                <EventCard events={events} />
            ) : (
                <div className="py-20 text-center">
                    <p className="text-gray-500 text-lg">No events found</p>
                    <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
                </div>
            )}

        </section>
    )
}
