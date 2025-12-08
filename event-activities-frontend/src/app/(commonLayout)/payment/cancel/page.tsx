import Link from "next/link";
import { XCircle, ArrowLeft, Home, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getUserInfo } from "@/lib/getUserSession";
import { redirect } from "next/navigation";

export default async function PaymentCancelPage() {
    
    const user = await getUserInfo()

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-orange-50 flex items-center justify-center py-12 px-4">
            <Card className="max-w-2xl w-full shadow-2xl">
                <CardContent className="p-12 text-center">
                    {/* Cancel Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                            <XCircle className="w-16 h-16 text-red-600" />
                        </div>
                    </div>

                    {/* Cancel Message */}
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Payment Cancelled
                    </h1>
                    <p className="text-lg text-gray-600 mb-2">
                        Your payment has been cancelled and no charges were made.
                    </p>
                    <p className="text-sm text-gray-500 mb-8">
                        You can try again anytime or explore other events.
                    </p>

                    {/* Information Box */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
                        <h2 className="text-lg font-semibold text-orange-800 mb-2">
                            What Happened?
                        </h2>
                        <ul className="text-left text-gray-700 space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-orange-600 mt-1">•</span>
                                <span>Your payment was not processed</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-600 mt-1">•</span>
                                <span>No charges were made to your account</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-600 mt-1">•</span>
                                <span>Your event registration was not completed</span>
                            </li>
                        </ul>
                    </div>

                    {/* Reasons Box */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">
                            Common reasons for cancellation:
                        </h3>
                        <ul className="text-left text-sm text-gray-600 space-y-1">
                            <li>• Changed your mind about the event</li>
                            <li>• Payment method issues</li>
                            <li>• Accidentally closed the payment window</li>
                            <li>• Need more time to decide</li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/events">
                            <Button className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto cursor-pointer">
                                <Calendar className="w-4 h-4 mr-2" />
                                Browse Events
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button variant="outline" className="w-full sm:w-auto cursor-pointer">
                                <Home className="w-4 h-4 mr-2" />
                                Back to Home
                            </Button>
                        </Link>
                    </div>

                    {/* Support Info */}
                    <div className="mt-8 pt-8 border-t">
                        <p className="text-xs text-gray-500">
                            Having trouble with payment? Contact us at{" "}
                            <a href="mailto:support@eventora.com" className="text-purple-600 hover:underline">
                                support@eventora.com
                            </a>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
