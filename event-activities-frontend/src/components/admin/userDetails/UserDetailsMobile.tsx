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

interface UserDetailsMobileProps {
    userData: UserDetailsData;
    userType: "USER" | "HOST";
}

export default function UserDetailsMobile({ userData, userType }: UserDetailsMobileProps) {
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
        <div className="p-4 space-y-4">
            {/* Profile Section */}
            <div className="text-center">
                <div className="flex justify-center mb-4">
                    {userData.profileImage ? (
                        <img
                            src={userData.profileImage}
                            alt={userData.fullName}
                            className="w-20 h-20 rounded-full object-cover border-4 border-purple-100"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold border-4 border-purple-100">
                            {userData.fullName.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                <h2 className="text-xl font-bold text-gray-900">{userData.fullName}</h2>

                <div className="flex items-center justify-center gap-2 mt-2">
                    <Badge className={getRoleColor(userData.role)}>{userData.role}</Badge>
                    <Badge className={getStatusColor(userData.status)}>{userData.status}</Badge>
                </div>
            </div>

            {/* Contact Info */}
            <Card>
                <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4 shrink-0" />
                        <span className="text-sm break-all">{userData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span className="text-sm">{userData.city || "Not specified"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span className="text-sm">
                            Joined {new Date(userData.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    {userData.averageRating && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <Star className="w-4 h-4 shrink-0 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">
                                {userData.averageRating.toFixed(1)} Rating
                            </span>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Bio Section */}
            {userData.bio && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Bio</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <p className="text-sm text-gray-700">{userData.bio}</p>
                    </CardContent>
                </Card>
            )}

            {/* Interests Section */}
            {userData.interests && userData.interests.length > 0 && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Interests</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-2">
                            {userData.interests.map((interest, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                    {interest}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Statistics Section */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">Statistics</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                    {userType === "USER" ? (
                        <>
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <CalendarCheck className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Joined Events</p>
                                        <p className="text-lg font-bold text-gray-900">
                                            {userData.totalJoinedEvents || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <DollarSign className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Total Paid</p>
                                        <p className="text-lg font-bold text-gray-900">
                                            ৳{userData.totalPaidRevenue?.toLocaleString() || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                        <MessageSquare className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Reviews Given</p>
                                        <p className="text-lg font-bold text-gray-900">
                                            {userData.totalReviews || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <Star className="w-5 h-5 text-yellow-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Avg Rating</p>
                                        <p className="text-lg font-bold text-gray-900">
                                            {userData.averageRating?.toFixed(1) || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                        <CalendarCheck className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Hosted Events</p>
                                        <p className="text-lg font-bold text-gray-900">
                                            {userData.totalHostedEvents || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <DollarSign className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Total Earned</p>
                                        <p className="text-lg font-bold text-gray-900">
                                            ৳{userData.totalEarnedRevenue?.toLocaleString() || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Active Events</p>
                                        <p className="text-lg font-bold text-gray-900">
                                            {userData.activeEvents || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                        <Award className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Completed</p>
                                        <p className="text-lg font-bold text-gray-900">
                                            {userData.completedEvents || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Account Info */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">Account Information</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-2">
                    <div>
                        <p className="text-xs text-gray-600">Account ID</p>
                        <p className="text-xs font-mono text-gray-900 mt-1 break-all">{userData.id}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-600">Last Updated</p>
                        <p className="text-xs text-gray-900 mt-1">
                            {new Date(userData.updatedAt).toLocaleString()}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
