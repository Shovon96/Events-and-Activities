import Link from "next/link";
import { Button } from "@/components/ui/button";
import CommonLogo from "./CommonLogo";
import ProfileMenu from "./ProfileMenu";
import { getUserInfo } from "@/lib/getUserSession";
import MobileMenu from "./MobileMenu";

type UserRole = "GUEST" | "USER" | "HOST" | "ADMIN";

export async function Navbar() {
  // Get user session
  const userInfo = await getUserInfo();
  const role: UserRole = userInfo?.role || "GUEST";
  const isLoggedIn = !!userInfo;

  const GuestLinks = (
    <>
      <NavLink href="/events">Explore Events</NavLink>
      <NavLink href="/become-host">Become a Host</NavLink>
      <NavLink href="/blogs">Blogs</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/contact">Contact</NavLink>

      <div className="flex items-center gap-2">
        <Button variant="default" asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </>
  );

  const UserLinks = (
    <>
      <NavLink href="/events">Explore Events</NavLink>
      <NavLink href="/my-events">My Events</NavLink>
      <NavLink href="/my-profile">Profile</NavLink>
      <NavLink href="/blogs">Blogs</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/contact">Contact</NavLink>
      <div className="flex items-center gap-3">
        <ProfileMenu user={userInfo} />
      </div>
    </>
  );

  const HostLinks = (
    <>
      <NavLink href="/events">Explore Events</NavLink>
      <NavLink href="/host/events">My Hosted Events</NavLink>
      <NavLink href="/host/create">Create Event</NavLink>
      <NavLink href="/my-profile">Profile</NavLink>
      <NavLink href="/blogs">Blogs</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/contact">Contact</NavLink>
      <div className="flex items-center gap-3">
        <ProfileMenu user={userInfo} />
      </div>
    </>
  );

  const AdminLinks = (
    <>
      <NavLink href="/admin/dashboard">Dashboard</NavLink>
      <NavLink href="/admin/users">Users</NavLink>
      <NavLink href="/admin/hosts">Hosts</NavLink>
      <NavLink href="/admin/events">Events</NavLink>
      <NavLink href="/my-profile">Profile</NavLink>
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
    <header className="border-b bg-yellow-50 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

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

