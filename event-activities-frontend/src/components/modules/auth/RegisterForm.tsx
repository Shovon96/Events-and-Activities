"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Eye, EyeOff, X } from "lucide-react";
import { createUserValidationSchema } from "@/zodValidations/auth.validation";
import { useRouter } from "next/navigation";

export type IUserRole = "USER" | "HOST" | "ADMIN";

export interface IUserCreateInput {
    email: string;
    password: string;
    fullName: string;
    bio?: string;
    profileImage?: string;
    interests?: string[];
    city?: string;
    role?: IUserRole;
}

export default function UserRegisterForm() {
    const [form, setForm] = useState<IUserCreateInput>({
        email: "",
        password: "",
        fullName: "",
        bio: "",
        profileImage: "",
        interests: [],
        city: "",
        role: "USER",
    });
    const [profilePreview, setProfilePreview] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const [interestsInput, setInterestsInput] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            // Validate form data using Zod schema
            const validatedData = createUserValidationSchema.parse({
                email: form.email,
                password: form.password,
                fullName: form.fullName,
                bio: form.bio,
                interests: form.interests,
                city: form.city,
                role: form.role,
            });

            // Create FormData for multipart/form-data request
            const formData = new FormData();

            // Add file if selected
            if (selectedFile) {
                formData.append("file", selectedFile);
            }

            // Add user data as JSON string in 'data' field
            const userData = {
                email: validatedData.email,
                password: validatedData.password,
                fullName: validatedData.fullName,
                interests: validatedData.interests || [],
                bio: validatedData.bio || "",
                city: validatedData.city || "",
                role: validatedData.role,
            };
            formData.append("data", JSON.stringify(userData));

            // Make API call to backend
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/v1/api";
            const endpoint = `${API_BASE_URL}/users/register`;

            const response = await fetch(endpoint, {
                method: "POST",
                body: formData,
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || "Registration failed");
            }
            setSuccess("Account created successfully! Redirecting to login...");

            // Reset form
            setForm({
                email: "",
                password: "",
                fullName: "",
                bio: "",
                profileImage: "",
                interests: [],
                city: "",
                role: "USER",
            });
            setProfilePreview("");
            setSelectedFile(null);
            setInterestsInput("");
            setShowPassword(false);

            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push("/login");
            }, 2000);

        } catch (err: any) {
            console.error("❌ Registration error:", err);
            if (err.name === "ZodError") {
                console.error("❌ Validation errors:", err.errors);
                setError(err.errors[0]?.message || "Validation failed");
            } else {
                setError(err.message || "Something went wrong. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-full lg:w-3/5 flex items-center justify-center p-6 lg:p-12">
            <Card className="w-full max-w-xl shadow-lg rounded-3xl border-0">
                <CardContent className="p-8">
                    <h2 className="text-4xl font-bold mb-2 text-center text-secondary">Create your account</h2>
                    <p className="text-gray-500 text-sm mb-8 text-center">Start discovering amazing events near you</p>

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

                        {/* Full Name */}
                        <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Full Name</Label>
                            <Input
                                placeholder="Enter your full name"
                                value={form.fullName}
                                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                className="h-11 border-gray-300"
                                required
                                disabled={isLoading}
                            />
                        </div>

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
                                    placeholder="At least 6 characters"
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

                        {/* Bio */}
                        <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Short Bio (Optional)</Label>
                            <Textarea
                                placeholder="Tell us a bit about yourself..."
                                value={form.bio}
                                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                                className="min-h-24 resize-none border-gray-300"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Profile Image Upload */}
                        <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Profile Image</Label>
                            <div
                                onClick={() => !isLoading && fileInputRef.current?.click()}
                                className={`border-2 border-dashed border-purple-300 rounded-xl p-4 text-center cursor-pointer hover:border-purple-400 transition bg-purple-50 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    disabled={isLoading}
                                />
                                {profilePreview ? (
                                    <div>
                                        <img src={profilePreview} alt="Profile preview" className="w-24 h-24 mx-auto mb-2 rounded-lg object-cover" />
                                        <p className="text-sm text-purple-600 font-medium">Change image</p>
                                    </div>
                                ) : (
                                    <div>
                                        <Upload className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                                        <p className="text-xs text-gray-400">PNG, JPG up to 4MB</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Interests */}
                        <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Interests (separate by commas)</Label>
                            <Input
                                placeholder="e.g., Music, Sports, Technology (separate with commas)"
                                value={interestsInput}
                                onChange={(e) => {
                                    setInterestsInput(e.target.value);
                                }}
                                onBlur={() => {
                                    // Split by comma when user leaves the field
                                    if (interestsInput.trim()) {
                                        const interestsArray = interestsInput
                                            .split(",")
                                            .map(interest => interest.trim())
                                            .filter(interest => interest.length > 0);
                                        setForm({ ...form, interests: interestsArray });
                                    }
                                }}
                                onKeyDown={(e) => {
                                    // Also split on Enter key
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        if (interestsInput.trim()) {
                                            const interestsArray = interestsInput
                                                .split(",")
                                                .map(interest => interest.trim())
                                                .filter(interest => interest.length > 0);
                                            setForm({ ...form, interests: interestsArray });
                                        }
                                    }
                                }}
                                className="h-11 border-gray-300"
                                disabled={isLoading}
                            />
                            {form.interests && form.interests.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {form.interests.map((interest, index) => (
                                        <span
                                            key={index}
                                            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                        >
                                            {interest}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const updatedInterests = form.interests?.filter((_, i) => i !== index);
                                                    setForm({
                                                        ...form,
                                                        interests: updatedInterests,
                                                    });
                                                    // Update input field to show remaining interests
                                                    setInterestsInput(updatedInterests?.join(", ") || "");
                                                }}
                                                className="text-purple-500 hover:text-purple-700"
                                                disabled={isLoading}
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Address */}
                        <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Address (Optional)</Label>
                            <Input
                                placeholder="Your address"
                                value={form.city}
                                onChange={(e) => setForm({ ...form, city: e.target.value })}
                                className="h-11 border-gray-300"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full h-12 bg-primary/90 hover:bg-primary cursor-pointer text-white font-semibold text-lg rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </Button>

                        {/* Sign In Link */}
                        <p className="text-center text-sm text-gray-600">
                            Already have an account? <a href="/login" className="text-secondary hover:underline font-semibold">Sign in</a>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
