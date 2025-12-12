"use server"

import { setCookie } from "./auth.service";

export const loginUser = async (email: string, password: string) => {
    try {

        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/v1/api";
        const endpoint = `${API_BASE_URL}/auth/login`;

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error("❌ Login failed:", responseData.message);
            return {
                success: false,
                message: responseData.message || "Login failed",
            };
        }

        // Set cookies from backend response
        if (responseData.data?.accessToken) {
            localStorage.setItem("token", responseData.data.accessToken);
            await setCookie("accessToken", responseData.data.accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                // maxAge: 60 * 60 * 24 * 7, // 7 days
            });
        }

        if (responseData.data?.refreshToken) {
            await setCookie("refreshToken", responseData.data.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                // maxAge: 60 * 60 * 24 * 90, // 90 days
            });
        }

        return {
            success: true,
            message: responseData.message || "Login successful",
            data: responseData.data,
        };

    } catch (error: any) {
        console.error("❌ Login error:", error);
        return {
            success: false,
            message: error.message || "Something went wrong",
        };
    }
}
