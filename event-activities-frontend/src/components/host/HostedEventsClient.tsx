"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, DollarSign, Users, Edit, Trash2, Plus, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EventFormModal, { IEventCreate } from "@/components/modals/EventFormModal";
import DeleteConfirmationDialog from "@/components/modals/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface HostedEventsClientProps {
    hostedEvents: any[];
    token: string | null
}

export default function HostedEventsClient({ hostedEvents, token }: HostedEventsClientProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);
    const router = useRouter();

    const handleStatusChange = async (eventId: string, newStatus: string) => {
        setUpdatingStatusId(eventId);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}/status`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: token as string
                    },
                    body: JSON.stringify({ status: newStatus }),
                }
            );

            if (response.ok) {
                toast.success(`Event status updated to ${newStatus}`);
                router.refresh();
            } else {
                const error = await response.json();
                toast.error(error.message || "Failed to update event status");
            }
        } catch (error) {
            console.error("Error updating event status:", error);
            toast.error("An error occurred while updating event status");
        } finally {
            setUpdatingStatusId(null);
        }
    };

    const handleCreateEvent = async (data: IEventCreate, file?: File) => {
        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(data));
            if (file) {
                formData.append("file", file);
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
                method: "POST",
                body: formData,
                credentials: "include",
                headers: {
                    authorization: token as string
                }
            });

            if (response.ok) {
                toast.success("Event created successfully!");
                router.refresh();
                setIsCreateOpen(false);
            } else {
                const error = await response.json();
                toast.error(error.message || "Failed to create event");
            }
        } catch (error) {
            console.error("Error creating event:", error);
            toast.error("An error occurred while creating the event");
        }
    };

    const handleUpdateEvent = async (data: IEventCreate, file?: File) => {
        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(data));
            if (file) {
                formData.append("file", file);
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/events/${selectedEvent.id}`,
                {
                    method: "PATCH",
                    body: formData,
                    credentials: "include",
                    headers: {
                        authorization: token as string
                    }
                }
            );

            if (response.ok) {
                toast.success("Event updated successfully!");
                router.refresh();
                setIsUpdateOpen(false);
                setSelectedEvent(null);
            } else {
                const error = await response.json();
                toast.error(error.message || "Failed to update event");
            }
        } catch (error) {
            console.error("Error updating event:", error);
            toast.error("An error occurred while updating the event");
        }
    };

    const handleEditClick = (event: any) => {
        setSelectedEvent(event);
        setIsUpdateOpen(true);
    };

    const handleDeleteClick = (event: any) => {
        setSelectedEvent(event);
        setIsDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedEvent) return;

        setIsDeleting(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/events/${selectedEvent.id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        authorization: token as string
                    }
                }
            );

            if (response.ok) {
                toast.success("Event deleted successfully!");
                setIsDeleteOpen(false);
                setSelectedEvent(null);
                router.refresh();
            } else {
                const error = await response.json();
                toast.error(error.message || "Failed to delete event");
            }
        } catch (error) {
            console.error("Error deleting event:", error);
            toast.error("An error occurred while deleting the event");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">My Hosted Events</h1>
                    <p className="text-gray-600 mt-2">Manage all your hosted events</p>
                </div>
                <Button
                    onClick={() => setIsCreateOpen(true)}
                    className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                    <Plus className="w-4 h-4 mr-1" />
                    Create New Event
                </Button>
            </div>

            {hostedEvents?.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hostedEvents?.map((event: any) => (
                        <Card key={event.id} className="hover:shadow-lg transition-shadow">
                            <CardContent>
                                <div className="flex justify-end mb-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Badge
                                                className={`cursor-pointer hover:opacity-90 transition-opacity ${event.status === "OPEN"
                                                        ? "bg-green-500 hover:bg-green-600"
                                                        : event.status === "CANCELED"
                                                            ? "bg-red-500 hover:bg-red-600"
                                                            : event.status === "COMPLETED"
                                                                ? "bg-blue-500 hover:bg-blue-600"
                                                                : "bg-yellow-500 hover:bg-yellow-600"
                                                    }`}
                                            >
                                                {updatingStatusId === event.id ? "Updating..." : event.status}
                                                <ChevronDown className="ml-1 w-3 h-3" />
                                            </Badge>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-40">
                                            <DropdownMenuItem
                                                onClick={() => handleStatusChange(event.id, "OPEN")}
                                                disabled={event.status === "OPEN" || updatingStatusId === event.id}
                                                className="cursor-pointer"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                                    <span>OPEN</span>
                                                </div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleStatusChange(event.id, "FULL")}
                                                disabled={event.status === "FULL" || updatingStatusId === event.id}
                                                className="cursor-pointer"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                                    <span>FULL</span>
                                                </div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleStatusChange(event.id, "COMPLETED")}
                                                disabled={event.status === "COMPLETED" || updatingStatusId === event.id}
                                                className="cursor-pointer"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                                    <span>COMPLETED</span>
                                                </div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleStatusChange(event.id, "CANCELLED")}
                                                disabled={event.status === "CANCELLED" || updatingStatusId === event.id}
                                                className="cursor-pointer"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                                    <span>CANCELED</span>
                                                </div>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="mb-3">
                                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                                        {event.name}
                                    </h3>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <Calendar className="w-4 h-4 text-purple-500" />
                                        <span>
                                            {new Date(event.startDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <MapPin className="w-4 h-4 text-purple-500" />
                                        <span>{event.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <DollarSign className="w-4 h-4 text-purple-500" />
                                        <span className="font-semibold">৳{event.ticketPrice}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <Users className="w-4 h-4 text-purple-500" />
                                        <span>
                                            {event.participants?.length || 0} /{" "}
                                            {event.maxParticipants} participants
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-3 border-t">
                                    <Link
                                        href={`/events/${event.id}`}
                                        className="flex-1 text-center px-3 py-2 text-sm border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                    <button
                                        onClick={() => handleEditClick(event)}
                                        className="px-3 py-2 cursor-pointer text-sm border border-gray-300 text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(event)}
                                        className="px-3 py-2 cursor-pointer text-sm border border-red-300 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="p-12 text-center">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            No Events Yet
                        </h3>
                        <p className="text-gray-600 mb-4">
                            You haven't created any events yet
                        </p>
                        <Button
                            onClick={() => setIsCreateOpen(true)}
                            className="bg-purple-600 hover:bg-purple-700"
                        >
                            Create Your First Event
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Create Modal */}
            <EventFormModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onSubmit={handleCreateEvent}
                mode="create"
            />

            {/* Update Modal */}
            <EventFormModal
                isOpen={isUpdateOpen}
                onClose={() => {
                    setIsUpdateOpen(false);
                    setSelectedEvent(null);
                }}
                onSubmit={handleUpdateEvent}
                initialData={selectedEvent}
                mode="update"
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                isOpen={isDeleteOpen}
                onClose={() => {
                    setIsDeleteOpen(false);
                    setSelectedEvent(null);
                }}
                onConfirm={handleDeleteConfirm}
                title="Delete Event"
                description={`Are you sure you want to delete "${selectedEvent?.name}"? This action cannot be undone and will permanently remove the event and all associated data.`}
                isDeleting={isDeleting}
            />
        </>
    );
}
