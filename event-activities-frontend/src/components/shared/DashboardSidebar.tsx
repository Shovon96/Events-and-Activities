"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Calendar,
    CalendarCheck,
    Bookmark,
    Users,
    DollarSign,
    UserCog,
    ShieldCheck,
    CalendarCog,
    History,
} from "lucide-react";

interface SidebarItem {
    label: string;
    href: string;
    icon: React.ElementType;
}

interface DashboardSidebarProps {
    role: "USER" | "HOST" | "ADMIN";
}

const userMenuItems: SidebarItem[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Upcoming Events",
        href: "/dashboard/upcoming-events",
        icon: Calendar,
    },
    {
        label: "Past Events",
        href: "/dashboard/past-events",
        icon: History,
    },
    {
        label: "Saved Events",
        href: "/dashboard/saved-events",
        icon: Bookmark,
    },
];

const hostMenuItems: SidebarItem[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "My Events",
        href: "/dashboard/my-hosted-events",
        icon: CalendarCog,
    },
    {
        label: "Upcoming Events",
        href: "/dashboard/upcoming-hosted",
        icon: Calendar,
    },
    {
        label: "Past Events",
        href: "/dashboard/past-hosted",
        icon: History,
    },
    {
        label: "Participants",
        href: "/dashboard/participants",
        icon: Users,
    },
    {
        label: "Revenue Tracking",
        href: "/dashboard/revenue",
        icon: DollarSign,
    },
];

const adminMenuItems: SidebarItem[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "User Management",
        href: "/dashboard/users",
        icon: UserCog,
    },
    {
        label: "Host Management",
        href: "/dashboard/hosts",
        icon: ShieldCheck,
    },
    {
        label: "Event Management",
        href: "/dashboard/events",
        icon: CalendarCheck,
    },
];

export default function DashboardSidebar({ role }: DashboardSidebarProps) {
    const pathname = usePathname();

    const menuItems =
        role === "ADMIN"
            ? adminMenuItems
            : role === "HOST"
            ? hostMenuItems
            : userMenuItems;

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-0">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {role === "ADMIN" ? "Admin" : role === "HOST" ? "Host" : "User"} Dashboard
                </h2>
                <p className="text-sm text-gray-500">Manage your activities</p>
            </div>

            <nav className="px-4 space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                                isActive
                                    ? "bg-purple-100 text-purple-700 font-semibold"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
