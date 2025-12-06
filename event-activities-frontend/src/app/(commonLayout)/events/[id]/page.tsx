import EventDetails from "@/components/shared/EventDetails";
import { getUserInfo } from "@/lib/getUserSession";

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`);
    const result = await res.json()
    
    // Get current user session
    const user = await getUserInfo();
    const currentUserId = user?.id;

    return <EventDetails data={result.data} currentUserId={currentUserId} />;
}