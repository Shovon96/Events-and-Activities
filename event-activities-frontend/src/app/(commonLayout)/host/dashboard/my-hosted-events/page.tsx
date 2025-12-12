export const dynamic = "force-dynamic";
import { serverFetch } from "@/lib/serverFetch";
import HostedEventsClient from "@/components/host/HostedEventsClient";
import { getCookie } from "@/service/auth.service";

export default async function MyHostedEventsPage() {
    const response = await serverFetch.get("/users/my-profile", {
        cache: "no-store",
        next: { tags: ["my-profile"] }
    });

    const token = await getCookie("accessToken");

    const result = await response.json();
    const hostedEvents = result.data?.hostedEvents || [];

    return (
        <div className="space-y-6">
            <HostedEventsClient hostedEvents={hostedEvents} token={token} />
        </div>
    );
}
