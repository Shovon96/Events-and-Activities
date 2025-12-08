import { Star } from "lucide-react";

interface EventReview {
    id: string;
    rating: string;
    comment?: string;
    author: {
        fullName: string;
        profileImage?: string | null;
    };
}

interface EventReviewsProps {
    reviews: EventReview[];
    eventAverageRating: string | number;
}

export default function EventReviews({ reviews, eventAverageRating }: EventReviewsProps) {
    if (!reviews || reviews.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Event Reviews</h2>
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-bold text-gray-800">{eventAverageRating}</span>
                    <span className="text-sm text-gray-600">
                        ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                    </span>
                </div>
            </div>

            {/* Horizontal Scrollable Reviews */}
            <div className="overflow-x-auto pb-4 -mx-8 px-8">
                <div className="flex gap-4 min-w-max">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-6 min-w-[350px] max-w-[350px] border border-purple-100 hover:shadow-lg transition-shadow"
                        >
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
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            {reviews.length > 2 && (
                <div className="text-center mt-4">
                    <p className="text-xs text-gray-500">← Scroll to see more reviews →</p>
                </div>
            )}
        </div>
    );
}
