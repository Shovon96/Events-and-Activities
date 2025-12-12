"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    MoreVertical,
    Calendar,
    MapPin,
    DollarSign,
    Users,
    Eye,
    Trash2,
    ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DeleteConfirmationDialog from "../modals/DeleteConfirmationDialog";

interface Event {
    id: string;
    name: string;
    type: string;
    description?: string;
    image?: string;
    location: string;
    startDate: string;
    endDate: string;
    minParticipants?: number;
    maxParticipants?: number;
    status: "OPEN" | "FULL" | "CANCELLED" | "COMPLETED";
    ticketPrice?: number;
    createdAt: string;
    host: {
        id: string;
        fullName: string;
        email: string;
    };
    participants?: any[];
}

interface EventsManagementTableProps {
    events: Event[];
    token: string | null;
}

export default function EventsManagementTable({ events, token }: EventsManagementTableProps) {
    const [updatingEventId, setUpdatingEventId] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleStatusChange = async (eventId: string, newStatus: string) => {
        setUpdatingEventId(eventId);
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
            setUpdatingEventId(null);
        }
    };

    const handleDeleteClick = (event: Event) => {
        setEventToDelete(event);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!eventToDelete) return;

        setIsDeleting(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/events/${eventToDelete.id}`,
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
                setIsDeleteModalOpen(false);
                setEventToDelete(null);
                router.refresh();
            } else {
                const error = await response.json();
                toast.error(error.message || "Failed to delete event");
            }
        } catch (error) {
            console.error("Error deleting event:", error);
            toast.error("An error occurred while deleting event");
        } finally {
            setIsDeleting(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "OPEN":
                return "bg-green-500 hover:bg-green-600";
            case "FULL":
                return "bg-yellow-500 hover:bg-yellow-600";
            case "COMPLETED":
                return "bg-blue-500 hover:bg-blue-600";
            case "CANCELLED":
                return "bg-red-500 hover:bg-red-600";
            default:
                return "bg-gray-500 hover:bg-gray-600";
        }
    };

    if (!events || events.length === 0) {
        return (
            <Card className="mt-6">
                <CardContent className="p-12 text-center">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Events Found</h3>
                    <p className="text-gray-600">There are no events to display at the moment.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="mt-6">
            {/* Desktop Table View */}
            <div className="hidden md:block">
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Event
                                        </th>
                                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Host
                                        </th>
                                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Location
                                        </th>
                                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Participants
                                        </th>
                                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-4 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {events.map((event) => (
                                        <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {event.image ? (
                                                        <img
                                                            src={event.image}
                                                            alt={event.name}
                                                            className="w-12 h-12 rounded-lg object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                                                            {event.name.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 line-clamp-1">
                                                            {event.name}
                                                        </div>
                                                        <div className="text-xs text-gray-500">{event.type}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{event.host.fullName}</div>
                                                <div className="text-xs text-gray-500">{event.host.email}</div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm text-gray-900">
                                                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                                    {event.location}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    {new Date(event.startDate).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm text-gray-900">
                                                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                                                    {event.participants?.length || 0} / {event.maxParticipants || "∞"}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm font-semibold text-gray-900">
                                                    <DollarSign className="w-4 h-4 text-gray-400" />
                                                    ৳{event.ticketPrice || 0}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Badge
                                                            className={`cursor-pointer ${getStatusColor(event.status)}`}
                                                        >
                                                            {updatingEventId === event.id
                                                                ? "Updating..."
                                                                : event.status}
                                                            <ChevronDown />
                                                        </Badge>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            onClick={() => handleStatusChange(event.id, "OPEN")}
                                                            disabled={
                                                                event.status === "OPEN" ||
                                                                updatingEventId === event.id
                                                            }
                                                            className="cursor-pointer"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                                                <span>OPEN</span>
                                                            </div>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleStatusChange(event.id, "FULL")}
                                                            disabled={
                                                                event.status === "FULL" ||
                                                                updatingEventId === event.id
                                                            }
                                                            className="cursor-pointer"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                                                <span>FULL</span>
                                                            </div>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleStatusChange(event.id, "COMPLETED")}
                                                            disabled={
                                                                event.status === "COMPLETED" ||
                                                                updatingEventId === event.id
                                                            }
                                                            className="cursor-pointer"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                                                <span>COMPLETED</span>
                                                            </div>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleStatusChange(event.id, "CANCELLED")}
                                                            disabled={
                                                                event.status === "CANCELLED" ||
                                                                updatingEventId === event.id
                                                            }
                                                            className="cursor-pointer"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                                                <span>CANCELLED</span>
                                                            </div>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreVertical className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link
                                                                href={`/events/${event.id}`}
                                                                className="cursor-pointer flex items-center"
                                                            >
                                                                <Eye className="w-4 h-4 mr-2" />
                                                                View Details
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="cursor-pointer text-red-600"
                                                            onClick={() => handleDeleteClick(event)}
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            Delete Event
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden grid gap-4">
                {events.map((event) => (
                    <Card key={event.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-start gap-3 mb-3">
                                {event.image ? (
                                    <img
                                        src={event.image}
                                        alt={event.name}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                                        {event.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 line-clamp-2">{event.name}</h3>
                                    <p className="text-xs text-gray-500 mt-1">{event.type}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Badge className={`cursor-pointer ${getStatusColor(event.status)}`}>
                                                    {updatingEventId === event.id ? "Updating..." : event.status}
                                                </Badge>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start">
                                                <DropdownMenuItem
                                                    onClick={() => handleStatusChange(event.id, "OPEN")}
                                                    disabled={
                                                        event.status === "OPEN" || updatingEventId === event.id
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                                        <span>OPEN</span>
                                                    </div>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleStatusChange(event.id, "FULL")}
                                                    disabled={
                                                        event.status === "FULL" || updatingEventId === event.id
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                                        <span>FULL</span>
                                                    </div>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleStatusChange(event.id, "COMPLETED")}
                                                    disabled={
                                                        event.status === "COMPLETED" || updatingEventId === event.id
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                                        <span>COMPLETED</span>
                                                    </div>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleStatusChange(event.id, "CANCELLED")}
                                                    disabled={
                                                        event.status === "CANCELLED" || updatingEventId === event.id
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-red-500" />
                                                        <span>CANCELLED</span>
                                                    </div>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 mb-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Users className="w-4 h-4" />
                                    <span>Host: {event.host.fullName}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span>{event.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(event.startDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Users className="w-4 h-4" />
                                        <span>
                                            {event.participants?.length || 0} / {event.maxParticipants || "∞"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 font-semibold text-gray-900">
                                        <DollarSign className="w-4 h-4" />
                                        ৳{event.ticketPrice || 0}
                                    </div>
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

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setEventToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                title="Delete Event"
                description={`Are you sure you want to delete "${eventToDelete?.name}"? This action cannot be undone and will permanently remove the event and all associated data.`}
                isDeleting={isDeleting}
            />
        </div>
    );
}
