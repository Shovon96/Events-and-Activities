"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";
import Image from "next/image";

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

interface EventFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: IEventCreate, file?: File) => Promise<void>;
    initialData?: Partial<IEventCreate>;
    mode: "create" | "update";
}

export default function EventFormModal({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    mode,
}: EventFormModalProps) {
    const [formData, setFormData] = useState<IEventCreate>({
        name: "",
        type: "",
        description: "",
        image: "",
        location: "",
        startDate: new Date(),
        endDate: new Date(),
        minParticipants: 1,
        maxParticipants: 100,
        ticketPrice: 0,
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset form when modal opens/closes or initialData changes
    useEffect(() => {
        if (isOpen) {
            if (mode === "update" && initialData) {
                setFormData({
                    name: initialData.name || "",
                    type: initialData.type || "",
                    description: initialData.description !== undefined ? initialData.description : "",
                    image: initialData.image || "",
                    location: initialData.location || "",
                    startDate: initialData.startDate ? new Date(initialData.startDate) : new Date(),
                    endDate: initialData.endDate ? new Date(initialData.endDate) : new Date(),
                    minParticipants: initialData.minParticipants !== undefined ? initialData.minParticipants : 1,
                    maxParticipants: initialData.maxParticipants !== undefined ? initialData.maxParticipants : 100,
                    ticketPrice: initialData.ticketPrice !== undefined ? initialData.ticketPrice : 0,
                });
                setImagePreview(initialData.image || "");
            } else {
                // Reset for create mode
                setFormData({
                    name: "",
                    type: "",
                    description: "",
                    image: "",
                    location: "",
                    startDate: new Date(),
                    endDate: new Date(),
                    minParticipants: 1,
                    maxParticipants: 100,
                    ticketPrice: 0,
                });
                setImagePreview("");
                setImageFile(null);
            }
        }
    }, [isOpen, mode, initialData]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value ? parseInt(value) : 0,
        }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const selectedDate = new Date(value);
        setFormData((prev) => ({
            ...prev,
            [name]: selectedDate,
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
        setFormData((prev) => ({ ...prev, image: "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(formData, imageFile || undefined);
            onClose();
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDateTimeForInput = (date: Date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const hours = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const getMinDateTime = () => {
        const now = new Date();
        return formatDateTimeForInput(now);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {mode === "create" ? "Create New Event" : "Update Event"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Event Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Event Name *</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter event name"
                            required
                        />
                    </div>

                    {/* Event Type */}
                    <div className="space-y-2">
                        <Label htmlFor="type">Event Type *</Label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        >
                            <option value="">Select event type</option>
                            <option value="Music">Music</option>
                            <option value="Tech">Tech</option>
                            <option value="Food">Food</option>
                            <option value="Sports">Sports</option>
                            <option value="Arts">Arts</option>
                            <option value="Wellness">Wellness</option>
                            <option value="Business">Business</option>
                            <option value="Education">Education</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Enter event location"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Enter event description"
                            rows={4}
                        />
                    </div>

                    {/* Date Range */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startDate">Start Date & Time *</Label>
                            <Input
                                id="startDate"
                                name="startDate"
                                type="datetime-local"
                                value={formatDateTimeForInput(formData.startDate)}
                                onChange={handleDateChange}
                                min={getMinDateTime()}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endDate">End Date & Time *</Label>
                            <Input
                                id="endDate"
                                name="endDate"
                                type="datetime-local"
                                value={formatDateTimeForInput(formData.endDate)}
                                onChange={handleDateChange}
                                min={formatDateTimeForInput(formData.startDate)}
                                required
                            />
                        </div>
                    </div>

                    {/* Participants */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="minParticipants">Min Participants</Label>
                            <Input
                                id="minParticipants"
                                name="minParticipants"
                                type="number"
                                value={formData.minParticipants}
                                onChange={handleNumberChange}
                                min="1"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="maxParticipants">Max Participants</Label>
                            <Input
                                id="maxParticipants"
                                name="maxParticipants"
                                type="number"
                                value={formData.maxParticipants}
                                onChange={handleNumberChange}
                                min="1"
                            />
                        </div>
                    </div>

                    {/* Ticket Price */}
                    <div className="space-y-2">
                        <Label htmlFor="ticketPrice">Ticket Price (৳)</Label>
                        <Input
                            id="ticketPrice"
                            name="ticketPrice"
                            type="number"
                            value={formData.ticketPrice}
                            onChange={handleNumberChange}
                            min="0"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <Label htmlFor="image">Event Image *</Label>
                        {imagePreview ? (
                            <div className="relative w-full h-48 border border-gray-300 rounded-md overflow-hidden">
                                <Image
                                    src={imagePreview}
                                    alt="Event preview"
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <label
                                htmlFor="image"
                                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-purple-500 transition-colors"
                            >
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-600">
                                    Click to upload event image
                                </span>
                                <input
                                    id="image"
                                    name="image"
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
                            className="bg-gray-100 text-black hover:bg-gray-200 cursor-pointer"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-linear-to-r from-purple-600 to-pink-600 cursor-pointer"
                        >
                            {isSubmitting
                                ? mode === "create"
                                    ? "Creating..."
                                    : "Updating..."
                                : mode === "create"
                                ? "Create Event"
                                : "Update Event"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
