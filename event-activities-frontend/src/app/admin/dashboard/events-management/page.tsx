export const dynamic = "force-dynamic";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import EventsManagementTable from "@/components/admin/EventsManagementTable";
import { serverFetch } from "@/lib/serverFetch";

export default async function EventsManagementPage() {
    const response = await serverFetch.get("/events", {
        cache: "no-cache",
        next: { tags: ["events"] },
    });

    const result = await response.json();
    const events = result?.data?.data || [];

    return (
        <div>
            <ManagementPageHeader
                title="Manage Events"
                description="Monitor and manage all events on the platform."
            />

            {/* Events Management Table */}
            <EventsManagementTable events={events} />
        </div>
    );
}
