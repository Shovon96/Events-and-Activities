"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { loginValidationZodSchema } from "@/zodValidations/auth.validation";
import { useRouter } from "next/navigation";
import { loginUser } from "@/service/loginUser";
import { toast } from "sonner";
import Link from "next/link";

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

    // Demo credentials
    const demoCredentials = {
        user: {
            email: "eventora@user.com",
            password: "EventoraPass",
        },
        host: {
            email: "eventora@host.com",
            password: "EventoraPass",
        },
        admin: {
            email: "eventora@admin.com",
            password: "EventoraPass",
        },
    };
    // Function to fill demo credentials
    const fillDemoCredentials = (role: "user" | "host" | "admin") => {
        setForm({
            email: demoCredentials[role].email,
            password: demoCredentials[role].password,
        });
    };

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

            // Call server action to login
            const result = await loginUser(validatedData.email, validatedData.password);

            // Check if login was successful
            if (!result.success) {
                const errorMessage = result.message || "Invalid email or password.";
                toast.error(errorMessage);
                throw new Error(errorMessage);
            }
            setSuccess("Login successful! Redirecting...");

            // Store user data in localStorage (optional)
            // if (result.data?.user) {
            //     localStorage.setItem("user", JSON.stringify(result.data.user));
            // }

            // Reset form
            setForm({
                email: "",
                password: "",
            });
            setShowPassword(false);

            // Redirect to home/dashboard after 1 second
            setTimeout(() => {
                router.push("/");
                toast.success(result?.message);
                // router.refresh(); // Refresh to update navbar
            }, 1000);

        } catch (err: any) {
            toast.error("Invalid email or password. Please try again.");
            if (err.name === "ZodError") {
                // Handle Zod validation errors
                console.error("❌ Validation errors:", err.errors);
                const errorMessage = err.errors[0]?.message || "Validation failed";
                setError(errorMessage);
                toast.error(errorMessage || "Validation failed");
            } else {
                const errorMessage = err.message || "Invalid email or password. Please try again.";
                setError(errorMessage);
                toast.error(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full lg:w-3/5 flex items-center justify-center p-6 lg:p-12">
            <Card className="w-full max-w-xl shadow-lg rounded-3xl border-0">
                <CardContent className="p-8">
                    <h2 className="text-transparent text-4xl font-bold mb-2 text-center bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">Welcome Back</h2>
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
                        <div className="flex justify-between">
                            {/* Login with */}
                            <div className="flex items-center justify-start gap-2">
                                <span className="text-sm">Login With: </span>
                                <button
                                    type="button"
                                    onClick={() => fillDemoCredentials("user")}
                                    className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 text-sm cursor-pointer px-3 py-1 border border-purple-300 rounded-lg transition-all duration-200 font-medium"
                                >
                                    User
                                </button>
                                <button
                                    type="button"
                                    onClick={() => fillDemoCredentials("host")}
                                    className="text-green-600 hover:text-green-700 hover:bg-green-50 text-sm cursor-pointer px-3 py-1 border border-green-300 rounded-lg transition-all duration-200 font-medium"
                                >
                                    Host
                                </button>
                                <button
                                    type="button"
                                    onClick={() => fillDemoCredentials("admin")}
                                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm cursor-pointer px-3 py-1 border border-blue-300 rounded-lg transition-all duration-200 font-medium"
                                >
                                    Admin
                                </button>
                            </div>
                            <Link href="/#forgot-password" className="text-sm text-secondary hover:underline font-medium">
                                Forgot password?
                            </Link>
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
