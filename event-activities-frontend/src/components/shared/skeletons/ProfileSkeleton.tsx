import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Profile Header Card */}
        <Card className="mb-8 shadow-xl">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Image */}
              <div className="relative">
                <Skeleton className="w-36 h-36 rounded-full" />
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left space-y-4">
                {/* Name */}
                <Skeleton className="h-10 w-64 mx-auto md:mx-0" />
                
                {/* Bio */}
                <Skeleton className="h-4 w-96 mx-auto md:mx-0" />
                
                {/* Email and Role */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-6 w-20" />
                </div>

                {/* Location */}
                <Skeleton className="h-6 w-32" />

                {/* Interests */}
                <div className="flex gap-3 items-center">
                  <Skeleton className="h-6 w-24" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </div>

              {/* Update Buttons */}
              <div className="flex flex-col gap-2">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Section */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">
              <Skeleton className="h-8 w-64" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="h-full">
                  <CardContent className="p-6 space-y-3">
                    {/* Event Title and Badge */}
                    <div className="flex items-start justify-between">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-6 w-16 ml-2" />
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>

                    {/* Host Info */}
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-32" />
                    </div>

                    {/* Reviews Section */}
                    <div className="pt-3 border-t space-y-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-3/4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
