"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getCookie } from "@/service/auth.service";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getUserInfo = async (): Promise<any> => {
    try {

        // Get access token from cookies
        const accessToken = await getCookie("accessToken");

        if (!accessToken) {
            console.log("❌ No access token found");
            return null;
        }

        // Verify token
        const JWT_SECRET = process.env.JWT_SECRET || "events-activites-jwt-access-token-secret";
        if (!JWT_SECRET) {
            console.error("❌ JWT_SECRET not configured");
            return null;
        }

        const verifiedToken = jwt.verify(accessToken, JWT_SECRET) as JwtPayload;

        // Make API call to backend to get full user data
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/v1/api";
        const endpoint = `${API_BASE_URL}/auth/me`;

        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Cookie": `accessToken=${accessToken}`,
            },
            cache: "no-store",
        });

        if (!response.ok) {
            console.error("❌ API call failed:", response.statusText);
            // Return token data if API fails
            return {
                email: verifiedToken.email,
                role: verifiedToken.role,
            };
        }

        const result = await response.json();

        if (result.success && result.data) {
            const userInfo = {
                id: result.data.id,
                email: result.data.email,
                role: result.data.role,
                status: result.data.status,
                fullName: result.data.fullName,
                profileImage: result.data.profileImage
            };
            return userInfo;
        }

        // Fallback to token data
        return {
            email: verifiedToken.email,
            role: verifiedToken.role,
        };

    } catch (error: any) {
        console.error("❌ Error getting user info:", error.message);
        return null;
    }
}