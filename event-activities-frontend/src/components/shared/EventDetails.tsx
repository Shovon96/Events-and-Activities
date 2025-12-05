"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Calendar, Clock, MapPin, Users, DollarSign, User, Mail, Tag } from "lucide-react";

interface Host {
    id: string;
    email: string;
    fullName: string;
    role: string;
}

interface EventDetailsProps {
    data: {
        id: string;
        name: string;
        type: string;
        description: string;
        image: string;
        location: string;
        startDate: string;
        endDate: string;
        minParticipants: number;
        maxParticipants: number;
        ticketPrice: number;
        status: string;
        host: Host;
    };
}

export default function EventDetails({ data }: EventDetailsProps) {
    const event = data;

    // Hydration-safe formatted values
    const [formattedStart, setFormattedStart] = useState({
        date: "",
        time: "",
        day: "",
        month: "",
        year: "",
    });
    const [formattedEnd, setFormattedEnd] = useState({
        date: "",
        time: "",
    });

    // Format dates on client only
    useEffect(() => {
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);

        setFormattedStart({
            date: start.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            }),
            time: start.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            day: start.getDate().toString(),
            month: start.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
            year: start.getFullYear().toString(),
        });

        setFormattedEnd({
            date: end.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            }),
            time: end.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            }),
        });
    }, [event.startDate, event.endDate]);

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-pink-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                
                {/* Hero Section with Image */}
                <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-8">
                    <Image
                        src={event.image}
                        alt={event.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                    
                    {/* Event Badge */}
                    <div className="absolute top-6 right-6">
                        <Badge className="bg-white/90 text-purple-700 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                            <Tag className="w-4 h-4 mr-2" />
                            {event.type}
                        </Badge>
                    </div>

                    {/* Date Badge */}
                    <div className="absolute top-6 left-6 bg-white rounded-2xl shadow-lg p-4 text-center min-w-20">
                        <div className="text-3xl font-bold text-purple-600">{formattedStart.day}</div>
                        <div className="text-xs font-semibold text-gray-600 uppercase">{formattedStart.month}</div>
                        <div className="text-xs text-gray-500">{formattedStart.year}</div>
                    </div>

                    {/* Event Title at Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                            {event.name}
                        </h1>
                        <div className="flex items-center gap-2 text-white/90">
                            <MapPin className="w-5 h-5" />
                            <span className="text-lg">{event.location}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Left Column - Event Details */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Description Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Event</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {event.description}
                            </p>
                        </div>

                        {/* Event Information Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            
                            {/* Date & Time Card */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <Calendar className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Date & Time</h3>
                                </div>
                                <div className="space-y-3 ml-15">
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Start</p>
                                        <p className="text-gray-800 font-semibold">{formattedStart.date}</p>
                                        <p className="text-gray-600 flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            {formattedStart.time}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">End</p>
                                        <p className="text-gray-800 font-semibold">{formattedEnd.date}</p>
                                        <p className="text-gray-600 flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            {formattedEnd.time}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Participants Card */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Users className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">Participants</h3>
                                </div>
                                <div className="ml-15">
                                    <p className="text-3xl font-bold text-gray-800">
                                        {event.minParticipants} - {event.maxParticipants}
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1">Expected attendees</p>
                                    <div className="mt-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="w-8 h-8 rounded-full bg-linear-to-br from-purple-400 to-pink-400 border-2 border-white"
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-600 font-medium">+{event.minParticipants} joined</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Host Information Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Meet Your Host</h2>
                            <div className="flex items-start gap-6">
                                <div className="w-20 h-20 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                    {event?.host.fullName.substring(0, 1)}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                                        {event?.host?.fullName || "John Doe"}
                                    </h3>
                                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                                        <Mail className="w-4 h-4" />
                                        <span className="text-sm">{event?.host?.email || "jdoe@ex.com"}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <User className="w-4 h-4" />
                                        <span className="text-sm capitalize">{event?.host?.role || "organizer"}</span>
                                    </div>
                                    <Button 
                                        variant="outline" 
                                        className="mt-4 cursor-pointer border-purple-300 text-purple-600 hover:bg-purple-50"
                                    >
                                        Contact Host
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 sticky top-8">
                            
                            {/* Price Section */}
                            <div className="text-center mb-6 pb-6 border-b">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <span className="text-5xl font-bold text-gray-800">
                                        ৳{event.ticketPrice}
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm">per person</p>
                            </div>

                            {/* Status Badge */}
                            <div className="mb-6">
                                <div className="flex items-center justify-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-xl">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="font-semibold">{event.status}</span>
                                </div>
                            </div>

                            {/* Quick Info */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Calendar className="w-5 h-5 text-purple-500" />
                                    <span className="text-sm">{formattedStart.date}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Clock className="w-5 h-5 text-purple-500" />
                                    <span className="text-sm">{formattedStart.time}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <MapPin className="w-5 h-5 text-purple-500" />
                                    <span className="text-sm">{event.location}</span>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <Button 
                                size="lg" 
                                className="w-full cursor-pointer h-14 text-lg font-semibold bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all"
                            >
                                Join This Event
                            </Button>

                            {/* Additional Info */}
                            <div className="mt-6 pt-6 border-t">
                                <p className="text-xs text-gray-500 text-center">
                                    🎉 Limited spots available! Book now to secure your place.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
