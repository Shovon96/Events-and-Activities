"use server"

import { redirect } from "next/navigation";
import { deleteCookie } from "./auth.service";

export const logoutUser = async () => {
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");

    // redirect("/login?loggedOut=true");
}