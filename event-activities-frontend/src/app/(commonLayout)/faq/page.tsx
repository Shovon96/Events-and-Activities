"use client";

import { Metadata } from "next";
import { useState } from "react";
import { ChevronDown, HelpCircle, Users, Calendar, CreditCard, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Note: Metadata export doesn't work in client components, 
// so we'll add it via layout or convert to server component with client wrapper

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const faqData: FAQItem[] = [
    // General Questions
    {
        category: "General",
        question: "What is Eventora?",
        answer: "Eventora is a comprehensive event management platform that connects event organizers (hosts) with participants. Whether you're looking to discover exciting events or host your own, Eventora provides all the tools you need for a seamless experience.",
    },
    {
        category: "General",
        question: "How do I create an account?",
        answer: "Creating an account is simple! Click on the 'Register' button in the top right corner, fill in your details including name, email, and password, and you're ready to go. You can sign up as a regular user or as a host if you plan to organize events.",
    },
    {
        category: "General",
        question: "Is Eventora free to use?",
        answer: "Yes! Creating an account and browsing events is completely free. Event hosts may charge ticket prices for their events, and we charge a small service fee to maintain and improve the platform.",
    },

    // For Attendees
    {
        category: "For Attendees",
        question: "How do I find events near me?",
        answer: "Use our search and filter features on the Events page. You can filter by location, category, date, and price range to find events that match your interests. Our smart search algorithm helps you discover events happening in your area.",
    },
    {
        category: "For Attendees",
        question: "How do I book an event?",
        answer: "Once you find an event you like, click on it to view details. Click the 'Book Now' button, complete the payment process, and you'll receive instant confirmation via email with your ticket details.",
    },
    {
        category: "For Attendees",
        question: "Can I cancel my booking?",
        answer: "Yes, you can leave an event before it starts by going to 'My Events' and clicking 'Leave Event'. However, refund policies vary by event and host. Please check the event's cancellation policy before booking.",
    },
    {
        category: "For Attendees",
        question: "How do I leave a review?",
        answer: "After attending an event, you can leave a review by visiting the event page and clicking on 'Write a Review'. Share your experience and rate the event to help other users make informed decisions.",
    },

    // For Hosts
    {
        category: "For Hosts",
        question: "How do I become a host?",
        answer: "Click on 'Become a Host' in the navigation menu, complete the host registration form, and submit your application. Our team will verify your information, and once approved, you can start creating events!",
    },
    {
        category: "For Hosts",
        question: "How do I create an event?",
        answer: "After becoming a verified host, go to your Host Dashboard and click 'Create Event'. Fill in all the event details including name, description, location, date, ticket price, and upload an attractive image. Once published, your event will be visible to all users.",
    },
    {
        category: "For Hosts",
        question: "How do I manage my events?",
        answer: "Access your Host Dashboard to view all your events. You can edit event details, update status (OPEN, FULL, COMPLETED, CANCELLED), view participants, and track payments all from one place.",
    },
    {
        category: "For Hosts",
        question: "When do I receive payments?",
        answer: "Payments are processed securely through our platform. You'll receive your earnings after the event is completed, minus our service fee. Payment processing typically takes 3-5 business days.",
    },

    // Payments & Security
    {
        category: "Payments & Security",
        question: "Is my payment information secure?",
        answer: "Absolutely! We use Stripe, a leading payment processor, with bank-level encryption and PCI DSS compliance. Your payment information is never stored on our servers and all transactions are secured with SSL encryption.",
    },
    {
        category: "Payments & Security",
        question: "What payment methods do you accept?",
        answer: "We accept all major credit and debit cards including Visa, Mastercard, American Express, and Discover. Payments are processed securely through Stripe.",
    },
    {
        category: "Payments & Security",
        question: "How do refunds work?",
        answer: "Refund policies are set by individual event hosts. If you're eligible for a refund based on the event's policy, it will be processed back to your original payment method within 5-10 business days.",
    },
    {
        category: "Payments & Security",
        question: "What is your service fee?",
        answer: "We charge a small service fee on each ticket purchase to maintain and improve our platform. The exact fee is displayed during checkout before you complete your payment.",
    },

    // Technical Support
    {
        category: "Technical Support",
        question: "I forgot my password. What should I do?",
        answer: "Click on 'Forgot Password' on the login page. Enter your email address, and we'll send you a link to reset your password. If you don't receive the email, check your spam folder or contact support.",
    },
    {
        category: "Technical Support",
        question: "How do I update my profile?",
        answer: "Go to 'My Profile' from the navigation menu. You can update your personal information, profile picture, bio, interests, and password. Don't forget to save your changes!",
    },
    {
        category: "Technical Support",
        question: "I'm having trouble booking an event. What should I do?",
        answer: "First, ensure you're logged in and have a stable internet connection. Clear your browser cache and try again. If the problem persists, contact our 24/7 support team at support@eventora.com or use the live chat feature.",
    },
    {
        category: "Technical Support",
        question: "How do I contact customer support?",
        answer: "You can reach our support team 24/7 via email at support@eventora.com, call us at +1 (123) 456-7890, or use the live chat feature on our website. We typically respond within 2-4 hours.",
    },
];

const categories = [
    { name: "All", icon: HelpCircle },
    { name: "General", icon: HelpCircle },
    { name: "For Attendees", icon: Users },
    { name: "For Hosts", icon: Calendar },
    { name: "Payments & Security", icon: CreditCard },
    { name: "Technical Support", icon: Shield },
];

export default function FAQPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const filteredFAQs = faqData.filter((faq) => {
        const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
        const matchesSearch =
            searchQuery === "" ||
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">

            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-purple-600/10 to-pink-600/10" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center">
                        <Badge className="mb-4 bg-purple-200 text-purple-700 px-4 py-2">HELP CENTER</Badge>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            Frequently
                            <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Asked Questions</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Find answers to common questions about Eventora. Can't find what you're looking for?
                            Contact our support team.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Category Filters */}
                <div className="flex flex-wrap gap-3 justify-center mb-12">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <button
                                key={category.name}
                                onClick={() => setActiveCategory(category.name)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeCategory === category.name
                                    ? "bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {category.name}
                            </button>
                        );
                    })}
                </div>

                {/* Results Count */}
                <div className="text-center mb-8">
                    <p className="text-gray-600">
                        Showing <span className="font-semibold text-purple-600">{filteredFAQs.length}</span>{" "}
                        {filteredFAQs.length === 1 ? "question" : "questions"}
                    </p>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {filteredFAQs.length > 0 ? (
                        filteredFAQs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex-1 pr-4">
                                        <div className="flex items-start gap-3">
                                            <div className="shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mt-1">
                                                <HelpCircle className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                                                    {faq.category}
                                                </span>
                                                <h3 className="text-lg font-semibold text-gray-900 mt-1">
                                                    {faq.question}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronDown
                                        className={`w-6 h-6 text-gray-400 shrink-0 transition-transform duration-300 ${openIndex === index ? "transform rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96" : "max-h-0"
                                        }`}
                                >
                                    <div className="px-6 pb-6 pl-17">
                                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16">
                            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
                            <p className="text-gray-600">
                                Try adjusting your search or browse different categories
                            </p>
                        </div>
                    )}
                </div>

                {/* Contact Support Section */}
                <div className="mt-20 bg-linear-to-r from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12 text-center border border-purple-100">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        Still have questions?
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Can't find the answer you're looking for? Our friendly support team is here to help
                        you 24/7.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <HelpCircle className="w-5 h-5" />
                            Contact Support
                        </a>
                        <a
                            href="mailto:support@eventora.com"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-lg border-2 border-gray-200 transition-all duration-300"
                        >
                            Email Us
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
