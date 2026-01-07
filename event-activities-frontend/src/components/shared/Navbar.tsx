"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import CommonLogo from "./CommonLogo";
import ProfileMenu from "./ProfileMenu";
import MobileMenu from "./MobileMenu";
import NotifyMenu from "./NotifyMenu";

type UserRole = "GUEST" | "USER" | "HOST" | "ADMIN";

interface NavbarProps {
  userInfo: any;
  role: UserRole;
}

export function Navbar({ userInfo, role }: NavbarProps) {
  const pathname = usePathname();

  const GuestLinks = (
    <>
      <NavLink href="/events" pathname={pathname}>
        Explore Events
      </NavLink>
      <NavLink href="/become-host" pathname={pathname}>
        Become a Host
      </NavLink>
      <NavLink href="/about" pathname={pathname}>
        About
      </NavLink>
      <NavLink href="/faq" pathname={pathname}>
        FAQ's
      </NavLink>
      <NavLink href="/contact" pathname={pathname}>
        Contact
      </NavLink>

      <NotifyMenu />
      <div className="flex items-center gap-2">
        <Button variant="default" asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </>
  );

  const UserLinks = (
    <>
      <NavLink href="/events" pathname={pathname}>
        Explore Events
      </NavLink>
      <NavLink href="/my-events" pathname={pathname}>
        My Events
      </NavLink>
      <NavLink href="/my-profile" pathname={pathname}>
        Profile
      </NavLink>
      <NavLink href="/about" pathname={pathname}>
        About
      </NavLink>
      <NavLink href="/faq" pathname={pathname}>
        FAQ's
      </NavLink>
      <NavLink href="/contact" pathname={pathname}>
        Contact
      </NavLink>

      <NotifyMenu />
      <div className="flex items-center gap-3">
        <ProfileMenu user={userInfo} />
      </div>
    </>
  );

  const HostLinks = (
    <>
      <NavLink href="/events" pathname={pathname}>
        Explore Events
      </NavLink>
      <NavLink href="/hosted-events" pathname={pathname}>
        My Hosted Events
      </NavLink>
      <NavLink href="/my-profile" pathname={pathname}>
        Profile
      </NavLink>
      <NavLink href="/about" pathname={pathname}>
        About
      </NavLink>
      <NavLink href="/faq" pathname={pathname}>
        FAQ's
      </NavLink>
      <NavLink href="/contact" pathname={pathname}>
        Contact
      </NavLink>

      <NotifyMenu />
      <div className="flex items-center gap-3">
        <ProfileMenu user={userInfo} />
      </div>
    </>
  );

  const AdminLinks = (
    <>
      <NavLink href="/admin/dashboard" pathname={pathname}>
        Dashboard
      </NavLink>
      <NavLink href="/admin/users" pathname={pathname}>
        Users
      </NavLink>
      <NavLink href="/admin/hosts" pathname={pathname}>
        Hosts
      </NavLink>
      <NavLink href="/events" pathname={pathname}>
        Events
      </NavLink>
      <NavLink href="/my-profile" pathname={pathname}>
        Profile
      </NavLink>
      <NavLink href="/about" pathname={pathname}>
        About
      </NavLink>
      <NavLink href="/faq" pathname={pathname}>
        FAQ's
      </NavLink>
      <NavLink href="/contact" pathname={pathname}>
        Contact
      </NavLink>

      <NotifyMenu />
      <div className="flex items-center gap-3">
        <ProfileMenu user={userInfo} />
      </div>
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
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <CommonLogo />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">{renderLinks()}</div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileMenu links={renderLinks()} />
        </div>
      </nav>
    </header>
  );
}

function NavLink({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string;
  children: React.ReactNode;
}) {
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-all duration-200 relative group ${isActive ? "text-purple-600 font-semibold" : "text-gray-700 hover:text-purple-600"
        }`}
    >
      {children}
      {/* Active indicator */}
      <span
        className={`absolute -bottom-1 left-0 w-full h-0.5 bg-linear-to-r from-purple-600 to-pink-600 transition-transform duration-200 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`}
      />
    </Link>
  );
}
