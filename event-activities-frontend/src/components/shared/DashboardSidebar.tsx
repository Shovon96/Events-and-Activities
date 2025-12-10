"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
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
    Menu,
    X,
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
        href: "/host/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "My Events",
        href: "/host/dashboard/my-hosted-events",
        icon: CalendarCog,
    },
    {
        label: "Upcoming Events",
        href: "/host/dashboard/upcoming-hosted",
        icon: Calendar,
    },
    {
        label: "Past Events",
        href: "/host/dashboard/past-hosted",
        icon: History,
    },
    {
        label: "Participants",
        href: "/host/dashboard/participants",
        icon: Users,
    },
    {
        label: "Revenue Tracking",
        href: "/host/dashboard/revenue",
        icon: DollarSign,
    },
];

const adminMenuItems: SidebarItem[] = [
    {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Users Management",
        href: "/admin/dashboard/users-management",
        icon: UserCog,
    },
    {
        label: "Hosts Management",
        href: "/admin/dashboard/hosts-management",
        icon: ShieldCheck,
    },
    {
        label: "Events Management",
        href: "/admin/dashboard/events-management",
        icon: CalendarCheck,
    },
];

export default function DashboardSidebar({ role }: DashboardSidebarProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const menuItems =
        role === "ADMIN"
            ? adminMenuItems
            : role === "HOST"
            ? hostMenuItems
            : userMenuItems;

    const dashboardTitle = role === "ADMIN" ? "Admin" : role === "HOST" ? "Host" : "User";

    const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
        <>
            <div className={cn("p-6", isMobile && "pt-0")}>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {dashboardTitle} Dashboard
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
                            onClick={() => isMobile && setIsOpen(false)}
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
        </>
    );

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="bg-white shadow-lg hover:bg-gray-100"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72 p-0">
                        <SheetHeader className="p-6 pb-4 border-b">
                            <SheetTitle className="text-left">
                                {dashboardTitle} Dashboard
                            </SheetTitle>
                        </SheetHeader>
                        <div className="overflow-y-auto h-[calc(100vh-80px)]">
                            <SidebarContent isMobile={true} />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen sticky top-0">
                <SidebarContent />
            </aside>
        </>
    );
}
