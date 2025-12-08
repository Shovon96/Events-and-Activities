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
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventId: string;
    eventName: string;
    onSuccess?: () => void;
}

export default function ReviewModal({
    isOpen,
    onClose,
    eventId,
    eventName,
    onSuccess,
}: ReviewModalProps) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/review/post-review`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        eventId,
                        rating,
                        comment: comment.trim() || undefined,
                    }),
                }
            );

            if (response.ok) {
                toast.success("Review submitted successfully!");
                setRating(0);
                setComment("");
                onClose();
                if (onSuccess) {
                    onSuccess();
                }
            } else {
                const error = await response.json();
                toast.error(error.message || "Failed to submit review");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            toast.error("An error occurred while submitting the review");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setRating(0);
            setHoveredRating(0);
            setComment("");
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-800">
                        Write a Review
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                        Share your experience about <span className="font-semibold">{eventName}</span>
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
                        {isSubmitting ? "Submitting..." : "Submit Review"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
