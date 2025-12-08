import { Users } from "lucide-react";

interface EventParticipantsProps {
    participantsCount: number;
    maxParticipants: number;
}

export default function EventParticipants({ participantsCount, maxParticipants }: EventParticipantsProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Participants</h3>
            </div>
            <div className="ml-15">
                <p className="text-3xl font-bold text-gray-800">
                    {participantsCount} / {maxParticipants}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                    {participantsCount} joined • {maxParticipants - participantsCount} spots left
                </p>
                <div className="mt-4">
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full bg-linear-to-br from-purple-400 to-pink-400 border-2 border-white"
                                />
                            ))}
                        </div>
                        {participantsCount > 4 && (
                            <span className="text-sm text-gray-600 font-medium">+{participantsCount - 4} more</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
