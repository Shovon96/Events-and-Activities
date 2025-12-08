"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, Edit2, Trash2 } from "lucide-react";
import ReviewModal from "@/components/modals/ReviewModal";
import DeleteConfirmationDialog from "@/components/modals/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface EventReview {
    id: string;
    rating: string;
    comment?: string;
    author: {
        id: string;
        fullName: string;
        profileImage?: string | null;
    };
}

interface ICurrentUser {
    id: string;
    email: string;
    fullName: string;
    role: string;
    profileImage?: string | null;
}

interface IEventProps {
    event: {
        id: string;
        name: string;
        type: string;
        description: string;
        image: string;
        location: string;
        startDate: string;
        endDate: string;
        minParticipants: number;
        maxParticipants: number;
        ticketPrice: number;
        status: string;
        reviews?: EventReview[];
    },
    eventAverageRating: string | number;
    currentUser?: ICurrentUser;
}

export default function EventReviews({ event, eventAverageRating, currentUser }: IEventProps) {
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editingReview, setEditingReview] = useState<EventReview | null>(null);
    const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
    const router = useRouter();
    const reviews = event.reviews || [];

    const handleReviewSuccess = () => {
        router.refresh();
        setEditingReview(null);
    };

    const handleEditClick = (review: EventReview) => {
        setEditingReview(review);
        setIsReviewModalOpen(true);
    };

    const handleDeleteClick = (reviewId: string) => {
        setDeletingReviewId(reviewId);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!deletingReviewId) return;

        setIsDeleting(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/review/${deletingReviewId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            if (response.ok) {
                toast.success("Review deleted successfully!");
                setIsDeleteDialogOpen(false);
                setDeletingReviewId(null);
                router.refresh();
            } else {
                const error = await response.json();
                toast.error(error.message || "Failed to delete review");
            }
        } catch (error) {
            console.error("Error deleting review:", error);
            toast.error("An error occurred while deleting the review");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleModalClose = () => {
        setIsReviewModalOpen(false);
        setEditingReview(null);
    };

    return (
        <>
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-gray-800">Event Reviews</h2>
                    <div className="flex items-center gap-2 bg-yellow-50 px-4 py-1 rounded-xl">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-lg font-bold text-gray-800">{eventAverageRating}</span>
                        <span className="text-sm text-gray-600">
                            ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                        </span>
                    </div>
                </div>

                {/* create review */}
                <Button 
                    onClick={() => setIsReviewModalOpen(true)}
                    // disabled={event.status !== "COMPLETED"}
                    className="bg-linear-to-br from-purple-500 to-pink-500 text-white px-4 py-2 rounded-md cursor-pointer font-semibold hover:shadow-lg transition-shadow">
                    Write a Review
                </Button>
            </div>

            {/* Horizontal Scrollable Reviews */}
            <div className="overflow-x-auto pb-4 -mx-8 px-8">
                <div className="flex gap-4 min-w-max">
                    {reviews.map((review) => {
                        const isOwnReview = currentUser?.id === review.author.id;
                        
                        return (
                            <div
                                key={review.id}
                                className="relative bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-6 min-w-[350px] max-w-[350px] border border-purple-100 hover:shadow-lg transition-shadow"
                            >
                                {/* Edit/Delete Icons */}
                                {isOwnReview && (
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        <button
                                            onClick={() => handleEditClick(review)}
                                            className="p-1.5 bg-white rounded-lg hover:bg-blue-50 transition-colors shadow-sm"
                                            title="Edit review"
                                        >
                                            <Edit2 className="w-4 h-4 text-blue-600" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(review.id)}
                                            className="p-1.5 bg-white rounded-lg hover:bg-red-50 transition-colors shadow-sm"
                                            title="Delete review"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </button>
                                    </div>
                                )}

                                {/* Reviewer Info */}
                                <div className="flex items-center gap-3 mb-4">
                                    {review.author.profileImage ? (
                                        <img
                                            src={review.author.profileImage}
                                            alt={review.author.fullName}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold shadow">
                                            {review.author.fullName.substring(0, 1)}
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-800">
                                            {review.author.fullName}
                                        </h4>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-semibold text-gray-700">
                                                {parseFloat(review.rating).toFixed(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Review Comment */}
                                {review.comment && (
                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                                        "{review.comment}"
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Scroll Indicator */}
            {reviews.length > 2 && (
                <div className="text-center mt-4">
                    <p className="text-xs text-gray-500">← Scroll to see more reviews →</p>
                </div>
            )}
        </div>

        {/* Review Modal */}
        <ReviewModal
            isOpen={isReviewModalOpen}
            onClose={handleModalClose}
            eventId={event.id}
            eventName={event.name}
            onSuccess={handleReviewSuccess}
            editMode={!!editingReview}
            reviewId={editingReview?.id}
            initialRating={editingReview ? parseFloat(editingReview.rating) : 0}
            initialComment={editingReview?.comment || ""}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmationDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => {
                setIsDeleteDialogOpen(false);
                setDeletingReviewId(null);
            }}
            onConfirm={handleDeleteConfirm}
            title="Delete Review"
            description="Are you sure you want to delete this review? This action cannot be undone."
            isDeleting={isDeleting}
        />
        </>
    );
}
