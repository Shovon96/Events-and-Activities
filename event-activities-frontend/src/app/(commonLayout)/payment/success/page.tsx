import Link from "next/link";
import { CheckCircle, Calendar, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getUserInfo } from "@/lib/getUserSession";
import { redirect } from "next/navigation";

export default async function PaymentSuccessPage() {

    const user = await getUserInfo()

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-blue-50 flex items-center justify-center py-12 px-4">
            <Card className="max-w-2xl w-full shadow-2xl">
                <CardContent className="p-12 text-center">
                    {/* Success Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-16 h-16 text-green-600" />
                        </div>
                    </div>

                    {/* Success Message */}
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Payment Successful!
                    </h1>
                    <p className="text-lg text-gray-600 mb-2">
                        Thank you for your payment. Your event registration has been confirmed.
                    </p>
                    <p className="text-sm text-gray-500 mb-8">
                        You will receive a confirmation email shortly with all the event details.
                    </p>

                    {/* Confirmation Details */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                        <h2 className="text-lg font-semibold text-green-800 mb-2">
                            What's Next?
                        </h2>
                        <ul className="text-left text-gray-700 space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>Check your email for event confirmation and details</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>View your registered events in "My Events" section</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-600 mt-1">✓</span>
                                <span>Add the event to your calendar</span>
                            </li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/my-events">
                            <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto cursor-pointer">
                                <Calendar className="w-4 h-4 mr-2" />
                                View My Events
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
                            Need help? Contact us at{" "}
                            <a href="mailto:support@eventora.com" className="text-green-600 hover:underline">
                                support@eventora.com
                            </a>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
