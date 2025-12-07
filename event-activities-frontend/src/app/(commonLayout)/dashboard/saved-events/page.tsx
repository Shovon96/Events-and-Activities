import { Card, CardContent } from "@/components/ui/card";
import { Bookmark } from "lucide-react";

export default function SavedEventsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Saved Events</h1>
                <p className="text-gray-600 mt-2">
                    Events you've bookmarked for later
                </p>
            </div>

            <Card>
                <CardContent className="p-12 text-center">
                    <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        No Saved Events
                    </h3>
                    <p className="text-gray-600">
                        Feature coming soon! You'll be able to save events for later.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
