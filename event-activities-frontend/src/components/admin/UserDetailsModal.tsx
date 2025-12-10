"use client";

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import UserDetailsDesktop from "./userDetails/UserDetailsDesktop";
import UserDetailsMobile from "./userDetails/UserDetailsMobile";

interface UserDetailsData {
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
    // User specific
    totalJoinedEvents?: number;
    totalPaidRevenue?: number;
    // Host specific
    totalHostedEvents?: number;
    totalEarnedRevenue?: number;
    activeEvents?: number;
    completedEvents?: number;
    // Additional stats
    totalReviews?: number;
    averageRating?: number;
}

interface UserDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    userType: "USER" | "HOST";
}

export default function UserDetailsModal({
    isOpen,
    onClose,
    userId,
    userType,
}: UserDetailsModalProps) {
    const [userData, setUserData] = useState<UserDetailsData | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && userId) {
            fetchUserDetails();
        }
    }, [isOpen, userId]);

    const fetchUserDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}/details`,
                {
                    credentials: "include",
                }
            );

            if (response.ok) {
                const result = await response.json();
                setUserData(result.data);
            } else {
                console.error("Failed to fetch user details");
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                    <DialogTitle className="text-2xl font-bold">
                        {userType === "USER" ? "User" : "Host"} Details
                    </DialogTitle>
                </DialogHeader>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    </div>
                ) : userData ? (
                    <>
                        {/* Desktop View */}
                        <div className="hidden md:block">
                            <UserDetailsDesktop userData={userData} userType={userType} />
                        </div>

                        {/* Mobile View */}
                        <div className="md:hidden">
                            <UserDetailsMobile userData={userData} userType={userType} />
                        </div>
                    </>
                ) : (
                    <div className="px-6 py-12 text-center text-gray-500">
                        No data available
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
