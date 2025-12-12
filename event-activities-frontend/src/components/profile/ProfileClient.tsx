"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, User, Tag, MapPin, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import UpdateProfileModal from "../modals/UpdateProfileModal";
import ChangePasswordModal from "../modals/ChangePasswordModal";

interface ProfileData {
    id: string;
    email: string;
    fullName: string;
    interests?: string[];
    bio?: string;
    city?: string;
    role: "HOST" | "USER" | "ADMIN";
    status: string;
    profileImage?: string;
}

interface ProfileClientProps {
    profile: ProfileData;
}

export default function ProfileClient({ profile }: ProfileClientProps) {
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const router = useRouter();

    const handleUpdateProfile = async (data: any, file?: File) => {
        try {
            const formData = new FormData();
            formData.append("data", JSON.stringify(data));
            if (file) {
                formData.append("file", file);
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users/update-profile`,
                {
                    method: "PATCH",
                    body: formData,
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );

            if (response.ok) {
                toast.success("Profile updated successfully!");
                setIsUpdateOpen(false);
                router.refresh();
            } else {
                const error = await response.json();
                toast.error(error.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("An error occurred while updating profile");
        }
    };

    return (
        <>
            <Card className="mb-8 shadow-xl">
                <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        {/* Profile Image */}
                        <div className="relative">
                            {profile?.profileImage ? (
                                <Image
                                    src={profile.profileImage}
                                    alt={profile.fullName}
                                    width={150}
                                    height={150}
                                    className="rounded-full object-cover border-4 border-purple-200 shadow-lg"
                                />
                            ) : (
                                <div className="w-36 h-36 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-5xl font-bold shadow-lg border-4 border-purple-200">
                                    {profile?.fullName.substring(0, 1)}
                                </div>
                            )}
                            <Badge
                                className={`absolute bottom-2 right-2 ${profile?.status === "ACTIVE"
                                        ? "bg-green-500"
                                        : "bg-gray-500"
                                    }`}
                            >
                                {profile?.status}
                            </Badge>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                                {profile?.fullName}
                            </h1>
                            {profile?.bio && (
                                <h2 className="text-base italic text-gray-600 mb-2">
                                    {profile?.bio}
                                </h2>
                            )}
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-2">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Mail className="w-5 h-5 text-purple-500" />
                                    <span>{profile?.email}</span>
                                </div>
                                <Badge
                                    variant="outline"
                                    className="bg-purple-100 text-purple-700 border-purple-300"
                                >
                                    <User className="w-4 h-4 mr-1" />
                                    {profile?.role}
                                </Badge>
                            </div>

                            {/* Location */}
                            {profile?.city && (
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="w-5 h-5 text-purple-500" />
                                    <span className="font-semibold text-gray-700">
                                        {profile?.city}
                                    </span>
                                </div>
                            )}

                            {/* Interests */}
                            {profile?.interests && profile?.interests.length > 0 && (
                                <div className="flex gap-3 items-center">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Tag className="w-5 h-5 text-purple-500" />
                                        <span className="font-semibold text-gray-700">
                                            Interests:
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {profile?.interests.map((interest, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                                className="bg-pink-100 text-pink-700"
                                            >
                                                {interest}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Update Button */}
                        <div className="flex flex-col gap-2">
                            <Button
                                onClick={() => setIsUpdateOpen(true)}
                                className="bg-primary hover:bg-primary/90 cursor-pointer"
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Update Info
                            </Button>
                            <Button
                                onClick={() => setIsChangePasswordOpen(true)}
                                className="bg-transparent text-blue-600 underline hover:text-blue-800 hover:bg-transparent p-1 cursor-pointer "
                            >
                                Change Password
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Update Profile Modal */}
            <UpdateProfileModal
                isOpen={isUpdateOpen}
                onClose={() => setIsUpdateOpen(false)}
                onSubmit={handleUpdateProfile}
                initialData={profile}
            />

            {/* Change Password Modal */}
            <ChangePasswordModal
                isOpen={isChangePasswordOpen}
                onClose={() => setIsChangePasswordOpen(false)}
            />
        </>
    );
}
