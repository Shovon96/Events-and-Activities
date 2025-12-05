"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { loginValidationZodSchema } from "@/zodValidations/auth.validation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface ILoginInput {
    email: string;
    password: string;
}

export default function LoginForm() {
    const [form, setForm] = useState<ILoginInput>({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            // Validate form data using Zod schema
            const validatedData = loginValidationZodSchema.parse({
                email: form.email,
                password: form.password,
            });

            // Make API call to backend
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/v1/api";
            const endpoint = `${API_BASE_URL}/auth/login`;

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(validatedData),
                credentials: "include", // Important for cookies
            });

            const responseData = await response.json();

            if (!response.ok) {
                toast.error(responseData?.message || "Api Error!");
                throw new Error(responseData.message || "Login failed");
            }

            setSuccess("Login successful! Redirecting...");

            // Store user data in localStorage (optional)
            if (responseData.data?.user) {
                localStorage.setItem("user", JSON.stringify(responseData.data.user));
            }

            // Reset form
            setForm({
                email: "",
                password: "",
            });
            setShowPassword(false);

            // Redirect to home/dashboard after 1 second
            setTimeout(() => {
                router.push("/");
                toast.success(responseData?.message || "Login successful!");
            }, 1000);

        } catch (err: any) {
            console.error("❌ Login error:", err);
            if (err.name === "ZodError") {
                console.error("❌ Validation errors:", err.errors);
                setError(err.errors[0]?.message || "Validation failed");
            } else {
                setError(err.message || "Invalid email or password. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full lg:w-3/5 flex items-center justify-center p-6 lg:p-12">
            <Card className="w-full max-w-xl shadow-lg rounded-3xl border-0">
                <CardContent className="p-8">
                    <h2 className="text-4xl font-bold mb-2 text-center text-secondary">Welcome back</h2>
                    <p className="text-gray-500 text-sm mb-8 text-center">Sign in to continue to your account</p>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                <p className="text-sm">{error}</p>
                            </div>
                        )}

                        {/* Success Message */}
                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                                <p className="text-sm">{success}</p>
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Email Address</Label>
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="h-11 border-gray-300"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Password</Label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="h-11 border-gray-300 pr-10"
                                    required
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    disabled={isLoading}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex justify-end">
                            <a href="/forgot-password" className="text-sm text-secondary hover:underline font-medium">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full h-12 bg-primary/90 hover:bg-primary cursor-pointer text-white font-semibold text-lg rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </Button>

                        {/* Sign Up Link */}
                        <p className="text-center text-sm text-gray-600">
                            Don't have an account? <a href="/register" className="text-secondary hover:underline font-semibold">Sign up</a>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
