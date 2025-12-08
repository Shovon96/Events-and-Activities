"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventId: string;
    eventName: string;
    onSuccess?: () => void;
    editMode?: boolean;
    reviewId?: string;
    initialRating?: number;
    initialComment?: string;
}

export default function ReviewModal({
    isOpen,
    onClose,
    eventId,
    eventName,
    onSuccess,
    editMode = false,
    reviewId,
    initialRating = 0,
    initialComment = "",
}: ReviewModalProps) {
    const [rating, setRating] = useState(initialRating);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState(initialComment);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Update state when props change (for edit mode)
    useEffect(() => {
        setRating(initialRating);
        setComment(initialComment);
    }, [initialRating, initialComment, isOpen]);

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        setIsSubmitting(true);
        try {
            const url = editMode
                ? `${process.env.NEXT_PUBLIC_API_URL}/review/${reviewId}`
                : `${process.env.NEXT_PUBLIC_API_URL}/review/post-review`;

            const method = editMode ? "PATCH" : "POST";

            const response = await fetch(url, {
                method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    eventId,
                    rating,
                    comment: comment.trim() || undefined,
                }),
            });

            if (response.ok) {
                toast.success(editMode ? "Review updated successfully!" : "Review submitted successfully!");
                setRating(0);
                setComment("");
                onClose();
                if (onSuccess) {
                    onSuccess();
                }
            } else {
                const error = await response.json();
                toast.error(error.message || `Failed to ${editMode ? 'update' : 'submit'} review`);
            }
        } catch (error) {
            console.error(`Error ${editMode ? 'updating' : 'submitting'} review:`, error);
            toast.error(`An error occurred while ${editMode ? 'updating' : 'submitting'} the review`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setRating(editMode ? initialRating : 0);
            setHoveredRating(0);
            setComment(editMode ? initialComment : "");
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-800">
                        {editMode ? "Edit Review" : "Write a Review"}
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                        {editMode ? "Update your review for" : "Share your experience about"} <span className="font-semibold">{eventName}</span>
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Rating Section */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">
                            Rating <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    className="transition-transform hover:scale-110 focus:outline-none"
                                    disabled={isSubmitting}
                                >
                                    <Star
                                        className={`w-10 h-10 ${
                                            star <= (hoveredRating || rating)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"
                                        } transition-colors`}
                                    />
                                </button>
                            ))}
                            {rating > 0 && (
                                <span className="ml-2 text-lg font-semibold text-gray-700">
                                    {rating}.0
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Comment Section */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">
                            Comment
                        </label>
                        <Textarea
                            placeholder="Share your thoughts about this event..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="min-h-[120px] resize-none"
                            disabled={isSubmitting}
                            maxLength={500}
                        />
                        <p className="text-xs text-gray-500 text-right">
                            {comment.length}/500 characters
                        </p>
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
                        disabled={isSubmitting || rating === 0}
                        className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 cursor-pointer"
                    >
                        {isSubmitting ? (editMode ? "Updating..." : "Submitting...") : (editMode ? "Update Review" : "Submit Review")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
