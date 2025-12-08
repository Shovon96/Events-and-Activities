import { Button } from "@/components/ui/button";
import { Mail, User, Star } from "lucide-react";

interface HostReview {
    id: string;
    rating: string;
    comment?: string;
    eventId: string;
}

interface Host {
    id: string;
    email: string;
    fullName: string;
    role: string;
    reviewsReceived?: HostReview[];
}

interface EventHostProps {
    host: Host;
    hostAverageRating: string | number;
}

export default function EventHost({ host, hostAverageRating }: EventHostProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Meet Your Host</h2>
            <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    {host.fullName.substring(0, 1)}
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {host?.fullName || "John Doe"}
                    </h3>

                    {/* Host Rating */}
                    {host.reviewsReceived && host.reviewsReceived.length > 0 && (
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-semibold text-gray-800">{hostAverageRating}</span>
                            </div>
                            <span className="text-xs text-gray-500">
                                ({host.reviewsReceived.length} {host.reviewsReceived.length === 1 ? 'review' : 'reviews'})
                            </span>
                        </div>
                    )}

                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{host?.email || "jdoe@ex.com"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <User className="w-4 h-4" />
                        <span className="text-sm capitalize">{host?.role || "organizer"}</span>
                    </div>
                    <Button
                        variant="outline"
                        className="cursor-pointer border-purple-300 text-purple-600 hover:bg-purple-50"
                    >
                        Contact Host
                    </Button>
                </div>
            </div>
        </div>
    );
}
