import EventDetails from "@/components/shared/EventDetails";

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`);
    const result = await res.json()
    // console.log(result)

    return <EventDetails data={result.data} />;
}