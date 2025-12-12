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
import { MoreVertical, Mail, MapPin, Calendar, User as UserIcon, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import UserDetailsModal from "./UserDetailsModal";
import DeleteConfirmationDialog from "../modals/DeleteConfirmationDialog";

interface User {
    id: string;
    email: string;
    fullName: string;
    role: "USER" | "HOST" | "ADMIN";
    status: "ACTIVE" | "INACTIVE" | "BANNED";
    profileImage?: string;
    city?: string;
    bio?: string;
    interests?: string[];
    createdAt: string;
    updatedAt: string;
}

interface ManagementTableProps {
    users: User[];
    userType: "USER" | "HOST";
    token: string | null
}

export default function ManagementTable({ users, userType, token }: ManagementTableProps) {
    const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleViewDetails = (userId: string) => {
        setSelectedUserId(userId);
        setIsDetailsModalOpen(true);
    };

    const handleDeleteClick = (user: User) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!userToDelete) return;

        setIsDeleting(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/user/${userToDelete.id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        authorization: token as string
                    }
                }
            );

            if (response.ok) {
                toast.success(`${userType === "USER" ? "User" : "Host"} deleted successfully!`);
                setIsDeleteModalOpen(false);
                setUserToDelete(null);
                router.refresh();
            } else {
                const error = await response.json();
                toast.error(error.message || `Failed to delete ${userType.toLowerCase()}`);
            }
        } catch (error) {
            console.error(`Error deleting ${userType.toLowerCase()}:`, error);
            toast.error(`An error occurred while deleting ${userType.toLowerCase()}`);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleStatusChange = async (userId: string, newStatus: "ACTIVE" | "INACTIVE" | "BANNED") => {
        setUpdatingUserId(userId);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}/status`,
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
                toast.success(`${userType} status updated to ${newStatus}`);
                router.refresh();
            } else {
                const error = await response.json();
                toast.error(error.message || `Failed to update ${userType.toLowerCase()} status`);
            }
        } catch (error) {
            console.error(`Error updating ${userType.toLowerCase()} status:`, error);
            toast.error(`An error occurred while updating ${userType.toLowerCase()} status`);
        } finally {
            setUpdatingUserId(null);
        }
    };

    const handleRoleChange = async (userId: string, newRole: "USER" | "HOST") => {
        setUpdatingUserId(userId);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}/role`,
                {
                    method: "PATCH",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: token as string
                    },
                    body: JSON.stringify({ role: newRole }),
                }
            );

            if (response.ok) {
                toast.success(`${userType} role updated to ${newRole}`);
                router.refresh();
            } else {
                const error = await response.json();
                toast.error(error.message || `Failed to update ${userType.toLowerCase()} role`);
            }
        } catch (error) {
            console.error(`Error updating ${userType.toLowerCase()} role:`, error);
            toast.error(`An error occurred while updating ${userType.toLowerCase()} role`);
        } finally {
            setUpdatingUserId(null);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return "bg-green-500 hover:bg-green-600";
            case "INACTIVE":
                return "bg-yellow-500 hover:bg-yellow-600";
            case "BANNED":
                return "bg-red-500 hover:bg-red-600";
            default:
                return "bg-gray-500 hover:bg-gray-600";
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case "USER":
                return "bg-blue-500 hover:bg-blue-600";
            case "HOST":
                return "bg-purple-500 hover:bg-purple-600";
            case "ADMIN":
                return "bg-orange-500 hover:bg-orange-600";
            default:
                return "bg-gray-500 hover:bg-gray-600";
        }
    };

    if (!users || users.length === 0) {
        return (
            <Card className="mt-6">
                <CardContent className="p-12 text-center">
                    <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        No {userType === "USER" ? "Users" : "Hosts"} Found
                    </h3>
                    <p className="text-gray-600">
                        There are no {userType === "USER" ? "users" : "hosts"} to display at the moment.
                    </p>
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
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {userType === "USER" ? "User" : "Host"}
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Location
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Joined
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="shrink-0 h-10 w-10">
                                                        {user.profileImage ? (
                                                            <img
                                                                className="h-10 w-10 rounded-full object-cover"
                                                                src={user.profileImage}
                                                                alt={user.fullName}
                                                            />
                                                        ) : (
                                                            <div className="h-10 w-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                                                                {user.fullName.charAt(0).toUpperCase()}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {user.fullName}
                                                        </div>
                                                        {user.interests && user.interests.length > 0 && (
                                                            <div className="text-xs text-gray-500">
                                                                {user.interests.slice(0, 2).join(", ")}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm text-gray-900">
                                                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                                    {user.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm text-gray-900">
                                                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                                    {user.city || "N/A"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Badge
                                                            className={`cursor-pointer ${getRoleColor(user.role)}`}
                                                        >
                                                            {updatingUserId === user.id ? "Updating..." : user.role}
                                                            <ChevronDown/>
                                                        </Badge>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            onClick={() => handleRoleChange(user.id, "USER")}
                                                            disabled={user.role === "USER" || updatingUserId === user.id}
                                                            className="cursor-pointer"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                                                <span>USER</span>
                                                            </div>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleRoleChange(user.id, "HOST")}
                                                            disabled={user.role === "HOST" || updatingUserId === user.id}
                                                            className="cursor-pointer"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full bg-purple-500" />
                                                                <span>HOST</span>
                                                            </div>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Badge
                                                            className={`cursor-pointer ${getStatusColor(user.status)}`}
                                                        >
                                                            {updatingUserId === user.id ? "Updating..." : user.status}
                                                            <ChevronDown/>
                                                        </Badge>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            onClick={() => handleStatusChange(user.id, "ACTIVE")}
                                                            disabled={user.status === "ACTIVE" || updatingUserId === user.id}
                                                            className="cursor-pointer"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                                                <span>ACTIVE</span>
                                                            </div>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleStatusChange(user.id, "INACTIVE")}
                                                            disabled={user.status === "INACTIVE" || updatingUserId === user.id}
                                                            className="cursor-pointer"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                                                <span>INACTIVE</span>
                                                            </div>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleStatusChange(user.id, "BANNED")}
                                                            disabled={user.status === "BANNED" || updatingUserId === user.id}
                                                            className="cursor-pointer"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                                                <span>BANNED</span>
                                                            </div>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreVertical className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            className="cursor-pointer"
                                                            onClick={() => handleViewDetails(user.id)}
                                                        >
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem 
                                                            className="cursor-pointer text-red-600"
                                                            onClick={() => handleDeleteClick(user)}
                                                        >
                                                            Delete {userType === "USER" ? "User" : "Host"}
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
                {users.map((user) => (
                    <Card key={user.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    {user.profileImage ? (
                                        <img
                                            className="h-12 w-12 rounded-full object-cover"
                                            src={user.profileImage}
                                            alt={user.fullName}
                                        />
                                    ) : (
                                        <div className="h-12 w-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-lg">
                                            {user.fullName.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{user.fullName}</h3>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            className="cursor-pointer"
                                            onClick={() => handleViewDetails(user.id)}
                                        >
                                            View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem 
                                            className="cursor-pointer text-red-600"
                                            onClick={() => handleDeleteClick(user)}
                                        >
                                            Delete {userType === "USER" ? "User" : "Host"}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="space-y-2 mb-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span>{user.city || "N/A"}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 flex-wrap">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Badge className={`cursor-pointer ${getRoleColor(user.role)}`}>
                                            {updatingUserId === user.id ? "Updating..." : user.role}
                                            <ChevronDown/>
                                        </Badge>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        <DropdownMenuItem
                                            onClick={() => handleRoleChange(user.id, "USER")}
                                            disabled={user.role === "USER" || updatingUserId === user.id}
                                            className="cursor-pointer"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                                <span>USER</span>
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handleRoleChange(user.id, "HOST")}
                                            disabled={user.role === "HOST" || updatingUserId === user.id}
                                            className="cursor-pointer"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-purple-500" />
                                                <span>HOST</span>
                                            </div>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Badge className={`cursor-pointer ${getStatusColor(user.status)}`}>
                                            {updatingUserId === user.id ? "Updating..." : user.status}
                                            <ChevronDown />
                                        </Badge>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        <DropdownMenuItem
                                            onClick={() => handleStatusChange(user.id, "ACTIVE")}
                                            disabled={user.status === "ACTIVE" || updatingUserId === user.id}
                                            className="cursor-pointer"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                                <span>ACTIVE</span>
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handleStatusChange(user.id, "INACTIVE")}
                                            disabled={user.status === "INACTIVE" || updatingUserId === user.id}
                                            className="cursor-pointer"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                                <span>INACTIVE</span>
                                            </div>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => handleStatusChange(user.id, "BANNED")}
                                            disabled={user.status === "BANNED" || updatingUserId === user.id}
                                            className="cursor-pointer"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                                <span>BANNED</span>
                                            </div>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* User Details Modal */}
            {selectedUserId && (
                <UserDetailsModal
                    isOpen={isDetailsModalOpen}
                    onClose={() => {
                        setIsDetailsModalOpen(false);
                        setSelectedUserId(null);
                    }}
                    userId={selectedUserId}
                    userType={userType}
                />
            )}

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setUserToDelete(null);
                }}
                onConfirm={handleDeleteConfirm}
                title={`Delete ${userType === "USER" ? "User" : "Host"}`}
                description={`Are you sure you want to delete "${userToDelete?.fullName}"? This action cannot be undone and will permanently remove the ${userType.toLowerCase()} and all associated data.`}
                isDeleting={isDeleting}
            />
        </div>
    );
}