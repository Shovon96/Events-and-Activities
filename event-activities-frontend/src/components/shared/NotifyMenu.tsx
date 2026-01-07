
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, BellDot, X } from "lucide-react";
import { Badge } from "../ui/badge";

export default function NotifyMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (!ref.current) return;
      if (e.target instanceof Node && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        aria-expanded={open}
        aria-label="Notifications"
        onClick={() => setOpen((v) => !v)}
        className="p-1 cursor-pointer rounded-md border hover:bg-gray-100 focus:outline-none"
      >
        <span className="relative">
          <Bell className="h-6 w-6 text-primary" />
          <span className="absolute -top-3 -right-1">
            <Badge variant="destructive" className="h-2 w-2 p-0 rounded-full" />
          </span>
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-md shadow-lg z-50">
          <div className="px-4 py-2 border-b">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Notifications</h4>
              <button
                onClick={() => setOpen(false)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="max-h-64 overflow-auto">
            <ul className="divide-y">
              <li className="px-4 py-3">
                <p className="text-sm font-medium">New event added</p>
                <p className="text-xs text-gray-500">Concert in Dhaka — 2 days ago</p>
              </li>
              <li className="px-4 py-3">
                <p className="text-sm font-medium">Booking confirmed</p>
                <p className="text-xs text-gray-500">You booked 1 ticket — 3 days ago</p>
              </li>
              <li className="px-4 py-3">
                <p className="text-sm font-medium">Profile updated</p>
                <p className="text-xs text-gray-500">Your profile was updated — 1 week ago</p>
              </li>
            </ul>
          </div>

          <div className="px-4 py-2 border-t text-right">
            <Link href="#" className="text-sm text-purple-600 hover:underline">
              View all
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
