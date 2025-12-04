"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CommonLogo from "./CommonLogo";

type UserRole = "GUEST" | "USER" | "HOST" | "ADMIN";

interface NavbarProps {
  role?: UserRole;
}

export function Navbar({ role = "GUEST" }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const GuestLinks = (
    <>
      <NavLink href="/events">Explore Events</NavLink>
      <NavLink href="/become-host">Become a Host</NavLink>
      <NavLink href="/become-host">Blogs</NavLink>
      <NavLink href="/become-host">Contact</NavLink>

      <div className="flex items-center gap-2">
        <Button variant="outline" asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </>
  );

  const UserLinks = (
    <>
      <NavLink href="/events">Explore Events</NavLink>
      <NavLink href="/my-events">My Events</NavLink>
      <NavLink href="/profile">Profile</NavLink>
      <NavLink href="/become-host">Blogs</NavLink>
      <NavLink href="/become-host">Contact</NavLink>
      <LogoutButton />
    </>
  );

  const HostLinks = (
    <>
      <NavLink href="/events">Explore Events</NavLink>
      <NavLink href="/host/events">My Events (Hosted)</NavLink>
      <NavLink href="/host/create">Create Event</NavLink>
      <NavLink href="/profile">Profile</NavLink>
      <NavLink href="/become-host">Blogs</NavLink>
      <NavLink href="/become-host">Contact</NavLink>
      <LogoutButton />
    </>
  );

  const AdminLinks = (
    <>
      <NavLink href="/admin">Admin Dashboard</NavLink>
      <NavLink href="/admin/users">Manage Users</NavLink>
      <NavLink href="/admin/hosts">Manage Hosts</NavLink>
      <NavLink href="/admin/events">Manage Events</NavLink>
      <NavLink href="/profile">Profile</NavLink>
      <NavLink href="/become-host">Blogs</NavLink>
      <NavLink href="/become-host">Contact</NavLink>
      <LogoutButton />
    </>
  );

  const renderLinks = () => {
    switch (role) {
      case "USER":
        return UserLinks;
      case "HOST":
        return HostLinks;
      case "ADMIN":
        return AdminLinks;
      default:
        return GuestLinks;
    }
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

        {/* Logo */}
        <CommonLogo />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">{renderLinks()}</div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={24} />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-4 mt-6">{renderLinks()}</div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-gray-700 hover:text-black transition"
    >
      {children}
    </Link>
  );
}

function LogoutButton() {
  return (
    <Button variant="destructive" size="sm" onClick={() => console.log("logout")}>
      Logout
    </Button>
  );
}
