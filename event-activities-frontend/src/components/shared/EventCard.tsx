import EventCardClient from "./EventCardClient";
import { IEvent } from "@/types/events.interface";

interface IEventApiResponse {
    data: {
        data: IEvent[];
    };
}

interface ICurrentUser {
    id: string;
    email: string;
    fullName: string;
    role: string;
    profileImage?: string | null;
}

interface EventCardProps {
    events: IEventApiResponse;
    currentUser?: ICurrentUser;
}

export default function EventCard({ events, currentUser }: EventCardProps) {
    return <EventCardClient events={events} currentUser={currentUser} />;
}
