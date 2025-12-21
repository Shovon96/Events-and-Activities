import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function HostDashboardParticipantsLoading() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <Skeleton className="h-9 w-80 mb-2" />
                <Skeleton className="h-5 w-96" />
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Card key={index}>
                        <CardContent>
                            <div className="flex items-center justify-between mb-4">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-10 w-10 rounded-full" />
                            </div>
                            <Skeleton className="h-8 w-20 mb-2" />
                            <Skeleton className="h-3 w-32" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Participants */}
            <Card>
                <CardHeader className="flex justify-between items-center">
                    <Skeleton className="h-6 w-64" />
                    <Skeleton className="h-6 w-32 rounded-full" />
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 space-y-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded-lg space-y-3">
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-10 w-10 rounded-full mb-2" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-5 w-32" />
                                        <Skeleton className="h-4 w-48" />
                                        <Skeleton className="h-4 w-40" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
