import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Mail,
    MapPin,
    Calendar,
    DollarSign,
    CalendarCheck,
    Star,
    MessageSquare,
    TrendingUp,
    Award,
} from "lucide-react";

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
    totalJoinedEvents?: number;
    totalPaidRevenue?: number;
    totalHostedEvents?: number;
    totalEarnedRevenue?: number;
    activeEvents?: number;
    completedEvents?: number;
    totalReviews?: number;
    averageRating?: number;
}

interface UserDetailsDesktopProps {
    userData: UserDetailsData;
    userType: "USER" | "HOST";
}

export default function UserDetailsDesktop({ userData, userType }: UserDetailsDesktopProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return "bg-green-500";
            case "INACTIVE":
                return "bg-yellow-500";
            case "BANNED":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case "USER":
                return "bg-blue-500";
            case "HOST":
                return "bg-purple-500";
            case "ADMIN":
                return "bg-orange-500";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <div className="p-6 space-y-4">
            {/* Profile Section */}
            <div className="flex items-start gap-6">
                <div className="shrink-0">
                    {userData.profileImage ? (
                        <img
                            src={userData.profileImage}
                            alt={userData.fullName}
                            className="w-24 h-24 rounded-full object-cover border-4 border-purple-100"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-purple-100">
                            {userData.fullName.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                <div className="flex-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{userData.fullName}</h2>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge className={getRoleColor(userData.role)}>{userData.role}</Badge>
                                <Badge className={getStatusColor(userData.status)}>{userData.status}</Badge>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">{userData.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{userData.city || "Not specified"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">
                                Joined {new Date(userData.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        {userData.averageRating && (
                            <div className="flex items-center gap-2 text-gray-600">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm">
                                    {userData.averageRating.toFixed(1)} Rating
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Bio Section */}
            {userData.bio && (
                <div className="bg-gray-50 border shadow-sm rounded-lg p-3">
                    <strong>Bio: </strong>
                    <span>{userData?.bio}</span>
                </div>
            )}

            {/* Interests Section */}
            {userData.interests && userData.interests.length > 0 && (
                <div className="bg-gray-50 border shadow-sm rounded-lg p-3">
                    <div className="flex gap-2 items-center">
                        <strong className="text-lg">Interests:</strong>
                        <div className="flex flex-wrap gap-2">
                            {userData.interests.map((interest, index) => (
                                <Badge key={index} variant="outline" className="text-sm">
                                    {interest}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Statistics Section */}
            <div className="grid grid-cols-2 gap-4">
                {userType === "USER" ? (
                    <>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <CalendarCheck className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Joined Events</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {userData.totalJoinedEvents || 0}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <DollarSign className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Total Paid</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            ৳{userData.totalPaidRevenue?.toLocaleString() || 0}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <MessageSquare className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Reviews Given</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {userData.totalReviews || 0}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <Star className="w-6 h-6 text-yellow-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Avg Rating</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {userData.averageRating?.toFixed(1) || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                ) : (
                    <>
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <CalendarCheck className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Hosted Events</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {userData.totalHostedEvents || 0}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <DollarSign className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Total Earned</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            ৳{userData.totalEarnedRevenue?.toLocaleString() || 0}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Active Events</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {userData.activeEvents || 0}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                        <Award className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Completed</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {userData.completedEvents || 0}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>

            {/* Additional Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Account Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Account ID</p>
                            <p className="text-sm font-mono text-gray-900 mt-1">{userData.id}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Last Updated</p>
                            <p className="text-sm text-gray-900 mt-1">
                                {new Date(userData.updatedAt).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
