import { Music, Trophy, Palette, Utensils, Cpu, Heart, Users, BookOpen, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const categories = [
    {
        id: 1,
        name: "Music",
        count: "2.5K+ events",
        icon: Music,
        bg: "bg-rose-500",
    },
    {
        id: 2,
        name: "Sports",
        count: "1.8K+ events",
        icon: Trophy,
        bg: "bg-yellow-500",
    },
    {
        id: 3,
        name: "Arts",
        count: "950+ events",
        icon: Palette,
        bg: "bg-purple-500",
    },
    {
        id: 4,
        name: "Food & Drink",
        count: "1.2K+ events",
        icon: Utensils,
        bg: "bg-orange-500",
    },
    {
        id: 5,
        name: "Tech",
        count: "780+ events",
        icon: Cpu,
        bg: "bg-cyan-500",
    },
    {
        id: 6,
        name: "Wellness",
        count: "620+ events",
        icon: Heart,
        bg: "bg-green-500",
    },
    {
        id: 7,
        name: "Networking",
        count: "890+ events",
        icon: Users,
        bg: "bg-blue-500",
    },
    {
        id: 8,
        name: "Workshops",
        count: "540+ events",
        icon: BookOpen,
        bg: "bg-pink-500",
    },
];

export default function EventCategories() {
    return (
        <section className="py-20 bg-foreground text-white">
            {/* Header */}
            <div className="text-center mb-12">
                {/* Top Label */}
                <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                    Explore
                </div>

                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                    Event <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">Categories</span>
                </h2>
                <p className="text-gray-400 max-w-lg mx-auto">
                    From live music to tech conferences, find events that match your interests.
                </p>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                {categories.map((cat) => {
                    const Icon = cat.icon;

                    return (
                        <div
                            key={cat.id}
                            className={cn(
                                "bg-[#051841] rounded-xl p-10 flex items-start gap-4",
                                "transition-all hover:-translate-y-1 hover:bg-[#152039]"
                            )}
                        >
                            <div className={cn("p-3 rounded-lg text-white", cat.bg)}>
                                <Icon size={22} />
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg">{cat.name}</h3>
                                <p className="text-sm text-gray-400">{cat.count}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
                <Link
                    href="/events"
                    className="inline-flex items-center gap-2 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    <Search className="w-5 h-5" />
                    Start Exploring Events
                </Link>
            </div>
        </section>
    );
}
