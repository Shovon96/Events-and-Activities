import { Calendar, Clock } from "lucide-react";

interface EventDateTimeProps {
    formattedStart: {
        date: string | number;
        time: string | number;
    };
    formattedEnd: {
        date: string | number;
        time: string | number;
    };
}

export default function EventDateTime({ formattedStart, formattedEnd }: EventDateTimeProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Date & Time</h3>
            </div>
            <div className="space-y-3 ml-15">
                <div>
                    <p className="text-sm text-gray-500 font-medium">Start</p>
                    <p className="text-gray-800 font-semibold">{formattedStart.date}</p>
                    <p className="text-gray-600 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {formattedStart.time}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-medium">End</p>
                    <p className="text-gray-800 font-semibold">{formattedEnd.date}</p>
                    <p className="text-gray-600 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {formattedEnd.time}
                    </p>
                </div>
            </div>
        </div>
    );
}
