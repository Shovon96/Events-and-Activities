export const dynamic = "force-dynamic";
import { serverFetch } from "@/lib/serverFetch";
import HostedEventsClient from "@/components/host/HostedEventsClient";
import { getCookie } from "@/service/auth.service";
import EventsFilter from "@/components/modules/events/EventsFilter";
import Link from "next/link";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";

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

export default async function MyHostedEventsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
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

    return (
        <div className="space-y-6">
            {/* <EventsFilter
                locations={uniqueLocations}
                types={uniqueTypes}
            /> */}
            <div className="flex flex-col md:flex-row items-center gap-3">
            
                {/* Row 1: Filter Controls */}
                <div className="flex items-center flex-wrap gap-4">
                    {/* Status Filter */}
                    <SelectFilter
                        paramName="status"
                        placeholder="Event Status"
                        defaultValue="All Event Statuses"
                        options={[
                            { label: "Open", value: "OPEN" },
                            { label: "Full", value: "FULL" },
                            { label: "Completed", value: "COMPLETED" },
                            { label: "Cancelled", value: "CANCELLED" },
                        ]}
                    />

                    {/* Event Type Filter */}
                    <SelectFilter
                        paramName="type"
                        placeholder="Event Type"
                        defaultValue="All Event Categories"
                        options={
                            Array.isArray(uniqueTypes)
                                ? (uniqueTypes as string[]).map((type: string) => ({
                                    label: type,
                                    value: type
                                }))
                                : []
                        }
                    />

                    {/* Location Filter */}
                    <SelectFilter
                        paramName="location"
                        placeholder="Location"
                        defaultValue="All Locations"
                        options={
                            Array.isArray(uniqueLocations)
                                ? (uniqueLocations as string[]).map((location: string) => ({
                                    label: location,
                                    value: location
                                }))
                                : []
                        }
                    />

                    {/* Row 3: Clear Filters */}
                    <ClearFiltersButton
                        variant="ghost"
                        showCount={true}
                    />
                </div>
                {/* Row 21: Search and Refresh */}
                <div className="flex-1 w-full">
                    <SearchFilter
                        paramName="searchTerm"
                        placeholder="Search events by name, type, description, or location..."
                    />
                </div>
            </div>

            <HostedEventsClient hostedEvents={paginatedEvents} token={token} />

            {/* Empty State */}
            {paginatedEvents.length === 0 && (
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
        </div>
    );
}
