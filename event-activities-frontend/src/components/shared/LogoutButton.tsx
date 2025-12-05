"use client";

import { logoutUser } from "@/service/logoutUser";
import { Button } from "../ui/button";

const LogoutButton = () => {
    const handleLogout = async () => {
        await logoutUser();
    };
    return (
        <Button variant="outline" className="hover:bg-primary/10 cursor-pointer" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;