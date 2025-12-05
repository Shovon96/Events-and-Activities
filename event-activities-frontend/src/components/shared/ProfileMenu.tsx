"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

type User = {
    fullName?: string;
    email?: string;
    role?: string;
    profileImage?: string;
};

export default function ProfileMenu({ user }: { user: User }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function onDoc(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("click", onDoc);
        return () => document.removeEventListener("click", onDoc);
    }, []);


    const initials = user?.fullName ? user.fullName.split(" ")[0].charAt(0).toUpperCase() : "U";

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full cursor-pointer bg-gray-100 px-1 py-1"
            >
                {user?.profileImage ? (
                    <Image src={user.profileImage} alt={user.fullName || 'User'} width={30} height={30} className="rounded-full object-cover h-10 w-10" />
                ) : (
                    <div className="w-9 h-9 rounded-full bg-purple-500 text-white flex items-center justify-center font-medium">{initials}</div>
                )}
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
                    <div className="p-3 border-b">
                        <p className="font-semibold text-base">Name: {user?.fullName || 'Unknown User'}</p>
                        <p className="text-sm text-gray-500 py-1">Email: {user?.email || 'No email'}</p>
                        <p className="text-sm text-gray-400 mt-1">Role: {user?.role || 'User'}</p>
                    </div>
                    <div className="p-2">
                        <Link href="/profile" className="block px-3 py-2 rounded hover:bg-gray-50">Profile</Link>
                        <Link href={user?.role === 'HOST' ? '/host/dashboard' : user?.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'} className="block px-3 py-2 rounded hover:bg-gray-50">Dashboard</Link>
                        <div className="py-1">
                            <LogoutButton />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
