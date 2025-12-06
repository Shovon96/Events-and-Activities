export interface IEvent {
    id?: string;
    name: string;
    type: string;
    description?: string;
    image?: string;
    location: string;
    startDate: Date;
    endDate: Date;
    ticketPrice?: number;
    participants?: Array<{
        id: string;
        userId: string;
        eventId: string;
        paymentStatus?: string;
    }>;
}