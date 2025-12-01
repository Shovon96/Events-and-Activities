import { z } from "zod";

const createEventValidation = z.object({
    name: z.string().min(2, "Name is required"),
    type: z.string().min(2, "Type is required"),
    description: z.string().optional(),
    image: z.string().optional(),
    location: z.string().min(1, "Location is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    minParticipants: z.number().optional(),
    maxParticipants: z.number().optional(),
    ticketPrice: z.number().optional(),
})

const updateEventValidation = z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    location: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    minParticipants: z.number().optional(),
    maxParticipants: z.number().optional(),
    ticketPrice: z.number().optional(),
    status: z.string().optional(),
})


export const eventValidation = {
    createEventValidation,
    updateEventValidation
}