"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";

interface EventsFilterProps {
    locations: any;
    types: any
}

const EventsFilter = ({ locations, types }: EventsFilterProps) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
            {/* Row 1: Search and Refresh */}
            <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="flex-1 w-full">
                    <SearchFilter
                        paramName="searchTerm"
                        placeholder="Search events by name, type, description, or location..."
                    />
                </div>
                <RefreshButton />
            </div>

            {/* Row 2: Filter Controls */}
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
                        Array.isArray(types)
                            ? types.map((type: string) => ({
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
                        Array.isArray(locations)
                            ? locations.map((location: string) => ({
                                label: location,
                                value: location
                            }))
                            : []
                    }
                />

                {/* Sort By */}
                <SelectFilter
                    paramName="sortBy"
                    placeholder="Sort By"
                    defaultValue="Latest"
                    options={[
                        { label: "Event Name", value: "name" },
                        { label: "Start Date", value: "startDate" },
                        { label: "Price (Low to High)", value: "ticketPrice" },
                        { label: "Created Date", value: "createdAt" },
                    ]}
                />

                {/* Row 3: Clear Filters */}
                <ClearFiltersButton
                    variant="ghost"
                    showCount={true}
                />
            </div>
        </div>
    );
};

export default EventsFilter;
