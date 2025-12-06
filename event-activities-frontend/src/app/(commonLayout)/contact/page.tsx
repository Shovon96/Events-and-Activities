"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle, Briefcase } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsSubmitting(false);
        setSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({ name: "", email: "", subject: "", message: "" });
            setSubmitted(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50">
            
            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-purple-600/10 to-pink-600/10" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center">
                        <Badge className="mb-4 bg-purple-100 text-purple-700 px-4 py-2">Get In Touch</Badge>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            We'd Love to
                            <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Hear From You</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Have questions, feedback, or need assistance? Our team is here to help you 
                            make the most of your Eventora experience.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-6 mb-16">
                        <Card className="p-6 text-center hover:shadow-xl transition-shadow bg-white">
                            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-7 h-7 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                            <p className="text-sm text-gray-600 mb-2">support@eventora.com</p>
                            <p className="text-xs text-gray-500">We reply within 24 hours</p>
                        </Card>
                        <Card className="p-6 text-center hover:shadow-xl transition-shadow bg-white">
                            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="w-7 h-7 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                            <p className="text-sm text-gray-600 mb-2">+1 (555) 123-4567</p>
                            <p className="text-xs text-gray-500">Mon-Fri, 9AM-6PM EST</p>
                        </Card>
                        <Card className="p-6 text-center hover:shadow-xl transition-shadow bg-white">
                            <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-7 h-7 text-pink-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
                            <p className="text-sm text-gray-600 mb-2">123 Event Street</p>
                            <p className="text-xs text-gray-500">New York, NY 10001</p>
                        </Card>
                        <Card className="p-6 text-center hover:shadow-xl transition-shadow bg-white">
                            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-7 h-7 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Working Hours</h3>
                            <p className="text-sm text-gray-600 mb-2">Mon-Fri: 9AM-6PM</p>
                            <p className="text-xs text-gray-500">Weekend: Closed</p>
                        </Card>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <Card className="p-8 bg-white shadow-xl">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                                <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>
                                
                                {submitted ? (
                                    <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Send className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                                        <p className="text-green-700">Thank you for contacting us. We'll get back to you soon.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <Label className="text-sm font-medium text-gray-700 mb-2 block">Your Name</Label>
                                                <Input
                                                    placeholder="John Doe"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="h-12"
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                            <div>
                                                <Label className="text-sm font-medium text-gray-700 mb-2 block">Email Address</Label>
                                                <Input
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="h-12"
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Subject</Label>
                                            <Input
                                                placeholder="How can we help you?"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="h-12"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        
                                        <div>
                                            <Label className="text-sm font-medium text-gray-700 mb-2 block">Message</Label>
                                            <Textarea
                                                placeholder="Tell us more about your inquiry..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                className="min-h-[150px] resize-none"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        
                                        <Button 
                                            type="submit" 
                                            size="lg"
                                            className="w-full h-14 text-lg font-semibold bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="animate-spin mr-2">⏳</span>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5 mr-2" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            
                            {/* Quick Help */}
                            <Card className="p-6 bg-white shadow-xl">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Help</h3>
                                <div className="space-y-4">
                                    <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors group">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                            <HelpCircle className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">FAQs</h4>
                                            <p className="text-sm text-gray-600">Find quick answers</p>
                                        </div>
                                    </a>
                                    <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                            <MessageSquare className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Live Chat</h4>
                                            <p className="text-sm text-gray-600">Chat with support</p>
                                        </div>
                                    </a>
                                    <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-pink-50 transition-colors group">
                                        <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                                            <Briefcase className="w-5 h-5 text-pink-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">For Business</h4>
                                            <p className="text-sm text-gray-600">Enterprise solutions</p>
                                        </div>
                                    </a>
                                </div>
                            </Card>

                            {/* Office Hours */}
                            <Card className="p-6 bg-linear-to-br from-purple-600 to-pink-600 text-white shadow-xl">
                                <h3 className="text-xl font-bold mb-4">Office Hours</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="opacity-90">Monday - Friday</span>
                                        <span className="font-semibold">9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="opacity-90">Saturday</span>
                                        <span className="font-semibold">10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="opacity-90">Sunday</span>
                                        <span className="font-semibold">Closed</span>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-white/20">
                                    <p className="text-sm opacity-90">
                                        <Clock className="w-4 h-4 inline mr-2" />
                                        Response time: Within 24 hours
                                    </p>
                                </div>
                            </Card>

                            {/* Social Media */}
                            <Card className="p-6 bg-white shadow-xl">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
                                <div className="grid grid-cols-4 gap-3">
                                    {['FB', 'TW', 'IG', 'LI'].map((social, index) => (
                                        <button
                                            key={index}
                                            className="h-12 bg-gray-100 hover:bg-purple-100 rounded-lg font-semibold text-gray-700 hover:text-purple-600 transition-colors"
                                        >
                                            {social}
                                        </button>
                                    ))}
                                </div>
                            </Card>

                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section (Placeholder) */}
            <section className="py-16 px-4 bg-white/50">
                <div className="max-w-6xl mx-auto">
                    <Card className="overflow-hidden shadow-xl">
                        <div className="h-[400px] bg-linear-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                            <div className="text-center">
                                <MapPin className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Find Us Here</h3>
                                <p className="text-gray-600">123 Event Street, New York, NY 10001</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

        </div>
    );
}
