"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ChangePasswordModal({
    isOpen,
    onClose,
}: ChangePasswordModalProps) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter()

    const handleSubmit = async () => {
        // Validation
        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error("All fields are required");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("New password must be at least 6 characters long");
            return;
        }

        if (oldPassword === newPassword) {
            toast.error("New password must be different from old password");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        oldPassword,
                        newPassword,
                    }),
                }
            );

            if (response.ok) {
                toast.success("Password changed successfully!");
                handleClose();
            } else {
                const error = await response.json();
                toast.error(error.message || "Failed to change password");
            }
        } catch (error) {
            console.error("Error changing password:", error);
            toast.error("An error occurred while changing password");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setShowOldPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Lock className="w-6 h-6 text-purple-600" />
                        Change Password
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                        Enter your current password and choose a new password
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 py-4">
                    {/* Old Password */}
                    <div className="space-y-2">
                        <Label htmlFor="oldPassword" className="text-sm font-semibold text-gray-700">
                            Current Password <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="oldPassword"
                                type={showOldPassword ? "text" : "password"}
                                placeholder="Enter current password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                disabled={isSubmitting}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                disabled={isSubmitting}
                            >
                                {showOldPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-sm font-semibold text-gray-700">
                            New Password <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="newPassword"
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Enter new password (min 6 characters)"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                disabled={isSubmitting}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                disabled={isSubmitting}
                            >
                                {showNewPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Confirm New Password */}
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                            Confirm New Password <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Re-enter new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={isSubmitting}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                disabled={isSubmitting}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Password Requirements */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-xs text-blue-800 font-semibold mb-1">Password Requirements:</p>
                        <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                            <li>At least 6 characters long</li>
                            <li>Different from your current password</li>
                        </ul>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 cursor-pointer"
                    >
                        {isSubmitting ? "Changing..." : "Change Password"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
