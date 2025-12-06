"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";

const EventsFilter = () => {
    return (
        <div className="space-y-3">
            {/* Row 1: Refresh */}
            <div className="flex items-center gap-3">
                <RefreshButton />
            </div>

            {/* Row 2: Filter Controls */}
            <div className="flex items-center gap-3">
                {/* Status Filter */}
                <SelectFilter
                    paramName="status"
                    placeholder="Event Status"
                    defaultValue="All Event Statuses"
                    options={[
                        { label: "Open", value: "OPEN" },
                        { label: "Full", value: "FULL" },
                        { label: "Completed", value: "COMPLETED" },
                        { label: "Canceled", value: "CANCELLED" },
                    ]}
                />

                {/* Event Location Filter */}
                <SelectFilter
                    paramName="location"
                    placeholder="Location"
                    defaultValue="All Event Locations"
                    options={[
                        // fetch locations from events and place the options here

                    ]}
                />

                {/* Payment Status Filter */}
                <SelectFilter
                    paramName="paymentStatus"
                    placeholder="Payment Status"
                    defaultValue="All Payment Statuses"
                    options={[
                        { label: "Paid", value: "PAID" },
                        { label: "Unpaid", value: "UNPAID" },
                    ]}
                />

                {/* Patient Email Filter */}
                <SearchFilter paramName="patientEmail" placeholder="Patient Email" />

                {/* Clear Filters */}
                <ClearFiltersButton />
            </div>
        </div>
    );
};

export default EventsFilter;
