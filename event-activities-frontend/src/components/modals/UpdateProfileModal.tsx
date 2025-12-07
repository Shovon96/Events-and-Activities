"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface UpdateProfileData {
    fullName: string;
    bio?: string;
    city?: string;
    interests?: string | string[];
    profileImage?: string;
}

interface UpdateProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: UpdateProfileData, file?: File) => Promise<void>;
    initialData?: any;
}

export default function UpdateProfileModal({
    isOpen,
    onClose,
    onSubmit,
    initialData,
}: UpdateProfileModalProps) {
    const [formData, setFormData] = useState<UpdateProfileData>({
        fullName: "",
        bio: "",
        city: "",
        interests: "",
        profileImage: "",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen && initialData) {
            setFormData({
                fullName: initialData.fullName || "",
                bio: initialData.bio || "",
                city: initialData.city || "",
                interests: Array.isArray(initialData.interests)
                    ? initialData.interests.join(", ")
                    : "",
                profileImage: initialData.profileImage || "",
            });
            setImagePreview(initialData.profileImage || "");
            setImageFile(null);
        }
    }, [isOpen, initialData]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview("");
        setFormData((prev) => ({ ...prev, profileImage: "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Convert interests string to array
            const dataToSubmit = {
                ...formData,
                interests: formData.interests && typeof formData.interests === "string"
                    ? formData.interests.split(",").map((i: string) => i.trim()).filter(Boolean)
                    : [],
            };
            await onSubmit(dataToSubmit, imageFile || undefined);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        Update Profile Information
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            placeholder="Tell us about yourself"
                            rows={3}
                        />
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Enter your city"
                        />
                    </div>

                    {/* Interests */}
                    <div className="space-y-2">
                        <Label htmlFor="interests">Interests</Label>
                        <Input
                            id="interests"
                            name="interests"
                            value={formData.interests}
                            onChange={handleInputChange}
                            placeholder="Enter interests separated by commas (e.g., Music, Sports, Tech)"
                        />
                        <p className="text-xs text-gray-500">
                            Separate multiple interests with commas
                        </p>
                    </div>

                    {/* Profile Image Upload */}
                    <div className="space-y-2">
                        <Label htmlFor="profileImage">Profile Image</Label>
                        {imagePreview ? (
                            <div className="relative w-32 h-32 border border-gray-300 rounded-full overflow-hidden">
                                <Image
                                    src={imagePreview}
                                    alt="Profile preview"
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ) : (
                            <label
                                htmlFor="profileImage"
                                className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-full cursor-pointer hover:border-purple-500 transition-colors"
                            >
                                <Upload className="w-8 h-8 text-gray-400 mb-1" />
                                <span className="text-xs text-gray-600">Upload</span>
                                <input
                                    id="profileImage"
                                    name="profileImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-purple-600 hover:bg-purple-700"
                        >
                            {isSubmitting ? "Updating..." : "Update Profile"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
