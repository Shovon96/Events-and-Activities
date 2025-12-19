import Image from "next/image";
import { Star, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const hosts = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Music & Entertainment",
    rating: 4.9,
    events: 156,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    id: 2,
    name: "David Chen",
    role: "Tech & Innovation",
    rating: 4.8,
    events: 89,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Wellness & Lifestyle",
    rating: 5,
    events: 234,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
  {
    id: 4,
    name: "Marcus Johnson",
    role: "Sports & Fitness",
    rating: 4.9,
    events: 112,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
];

export default function TopRatedHosts() {
  return (
    <section className="py-20">
      <div className="text-center mb-12">
        {/* Top Label */}
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
          TRUSTED EXPERTS
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Top <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">Rated</span> Hosts
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Meet our community of verified hosts who create exceptional experiences.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {hosts.map((host) => (
          <div
            key={host.id}
            className={cn(
              "bg-white rounded-xl p-6 text-center shadow-sm border",
              "transition-all hover:-translate-y-1 hover:shadow-md"
            )}
          >
            {/* Avatar */}
            <div className="relative w-28 h-28 mx-auto mb-4">
              <Image
                src={host.image}
                alt={host.name}
                fill
                className="rounded-full object-cover border-4 border-white shadow"
              />

              {/* Verified Badge */}
              <div className="absolute bottom-1 right-1 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs font-bold shadow">
                ✓
              </div>
            </div>

            {/* Info */}
            <h3 className="font-semibold text-lg">{host.name}</h3>
            <p className="text-sm text-gray-500">{host.role}</p>

            <div className="border-t mt-4 pt-4 flex justify-center items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-amber-500" />
                <span className="font-medium">{host.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{host.events} events</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
