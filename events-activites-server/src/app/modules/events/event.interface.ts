export interface IEventCreate {
    name: string;
    type: string;
    description?: string;
    image?: string;
    location: string;
    startDate: Date;
    endDate: Date;
    minParticipants?: number;
    maxParticipants?: number;
    ticketPrice?: number;
}

export interface IEventUpdate {
    name?: string;
    type?: string;
    description?: string;
    image?: string;
    location?: string;
    startDate?: Date;
    endDate?: Date;
    minParticipants?: number;
    maxParticipants?: number;
    ticketPrice?: number;
    status?: string;
}