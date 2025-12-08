import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MapPin, Tag } from "lucide-react";

interface EventHeroProps {
    image: string;
    name: string;
    type: string;
    location: string;
    formattedStart: {
        day: string | number;
        month: string | number;
        year: string | number;
    };
}

export default function EventHero({ image, name, type, location, formattedStart }: EventHeroProps) {
    return (
        <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-8">
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover"
                priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

            {/* Event Badge */}
            <div className="absolute top-6 right-6">
                <Badge className="bg-white/90 text-purple-700 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                    <Tag className="w-4 h-4 mr-2" />
                    {type}
                </Badge>
            </div>

            {/* Date Badge */}
            <div className="absolute top-6 left-6 bg-white rounded-2xl shadow-lg p-4 text-center min-w-20">
                <div className="text-3xl font-bold text-purple-600">{formattedStart.day}</div>
                <div className="text-xs font-semibold text-gray-600 uppercase">{formattedStart.month}</div>
                <div className="text-xs text-gray-500">{formattedStart.year}</div>
            </div>

            {/* Event Title at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                    {name}
                </h1>
                <div className="flex items-center gap-2 text-white/90">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg">{location}</span>
                </div>
            </div>
        </div>
    );
}
