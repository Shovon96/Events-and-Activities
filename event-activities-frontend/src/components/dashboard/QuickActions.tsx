import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface QuickActionsProps {
    role: "USER" | "HOST" | "ADMIN";
}

export default function QuickActions({ role }: QuickActionsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {role === "USER" && (
                        <>
                            <Link
                                href="/events"
                                className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                            >
                                <h3 className="font-semibold text-gray-800">Browse Events</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Discover new events to join
                                </p>
                            </Link>
                            <Link
                                href="/dashboard/upcoming-events"
                                className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                            >
                                <h3 className="font-semibold text-gray-800">Upcoming Events</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    View your scheduled events
                                </p>
                            </Link>
                        </>
                    )}

                    {role === "HOST" && (
                        <>
                            <Link
                                href="/dashboard/my-hosted-events"
                                className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                            >
                                <h3 className="font-semibold text-gray-800">Create Event</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Host a new event
                                </p>
                            </Link>
                            <Link
                                href="/dashboard/participants"
                                className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                            >
                                <h3 className="font-semibold text-gray-800">Manage Participants</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    View and manage attendees
                                </p>
                            </Link>
                            <Link
                                href="/dashboard/revenue"
                                className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                            >
                                <h3 className="font-semibold text-gray-800">Revenue Report</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Track your earnings
                                </p>
                            </Link>
                        </>
                    )}

                    {role === "ADMIN" && (
                        <>
                            <Link
                                href="/dashboard/users"
                                className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                            >
                                <h3 className="font-semibold text-gray-800">Manage Users</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    View and manage all users
                                </p>
                            </Link>
                            <Link
                                href="/dashboard/hosts"
                                className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                            >
                                <h3 className="font-semibold text-gray-800">Manage Hosts</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Oversee event organizers
                                </p>
                            </Link>
                            <Link
                                href="/dashboard/events"
                                className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                            >
                                <h3 className="font-semibold text-gray-800">Manage Events</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Monitor all platform events
                                </p>
                            </Link>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
