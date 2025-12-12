"use client";

import { useState, useMemo } from "react";
import ManagementTable from "@/components/admin/ManagementTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

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

interface HostsManagementClientProps {
    users: User[];
}

export default function HostsManagementClient({ users }: HostsManagementClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [roleFilter, setRoleFilter] = useState<string>("all");

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            // Search filter
            const matchesSearch =
                searchQuery === "" ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (user.city && user.city.toLowerCase().includes(searchQuery.toLowerCase()));

            // Status filter
            const matchesStatus = statusFilter === "all" || user.status === statusFilter;

            // Role filter
            const matchesRole = roleFilter === "all" || user.role === roleFilter;

            return matchesSearch && matchesStatus && matchesRole;
        });
    }, [users, searchQuery, statusFilter, roleFilter]);

    return (
        <div className="max-w-7xl py-8 px-4 mx-auto">
            <div className="flex justify-center items-center max-w-xl text-center mx-auto">
                <ManagementPageHeader
                    title="Manage Hosts"
                    description="Monitor host activity, update roles, and maintain a secure user ecosystem and organize, filter, and manage all hosts to keep your platform running smoothly."
                />
            </div>

            {/* Search and Filter Section */}
            <div className="flex items-center gap-8 mt-6 space-y-4">
                {/* Search Bar */}
                <div className="relative w-full mb-0">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                        type="text"
                        placeholder="Search by email, name, or city..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-full h-11"
                    />
                </div>

                {/* Filters */}
                <div className="flex items-center sm:flex-row gap-4 h-11">
                    <div className="flex items-center gap-2 h-11">
                        {/* <Filter className="text-gray-400 w-5 h-5" /> */}
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full p-5.5">
                                <SelectValue placeholder="Filter by Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="ACTIVE">Active</SelectItem>
                                <SelectItem value="INACTIVE">Inactive</SelectItem>
                                <SelectItem value="BANNED">Banned</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2 h-11">
                        {/* <Filter className="text-gray-400 w-5 h-5" /> */}
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger className="w-full p-5.5">
                                <SelectValue placeholder="Filter by Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                <SelectItem value="USER">User</SelectItem>
                                <SelectItem value="HOST">Host</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600 py-4">
                Showing {filteredUsers.length} of {users.length} hosts
            </div>

            {/* Hosts Management Table */}
            <ManagementTable users={filteredUsers} userType="HOST" />
        </div>
    );
}
