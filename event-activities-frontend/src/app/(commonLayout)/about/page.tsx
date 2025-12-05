import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, MapPin, Heart, Target, Zap, Shield, Award } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
            
            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center">
                        <Badge className="mb-4 bg-purple-100 text-purple-700 px-4 py-2">About Eventora</Badge>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            Connecting People Through
                            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Amazing Events</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            We're on a mission to make event discovery and participation seamless, 
                            bringing communities together through memorable experiences.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-6">
                        <Card className="p-6 text-center hover:shadow-xl transition-shadow bg-white">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">50K+</h3>
                            <p className="text-gray-600">Events Hosted</p>
                        </Card>
                        <Card className="p-6 text-center hover:shadow-xl transition-shadow bg-white">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">1M+</h3>
                            <p className="text-gray-600">Active Members</p>
                        </Card>
                        <Card className="p-6 text-center hover:shadow-xl transition-shadow bg-white">
                            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-8 h-8 text-pink-600" />
                            </div>
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">200+</h3>
                            <p className="text-gray-600">Cities Worldwide</p>
                        </Card>
                        <Card className="p-6 text-center hover:shadow-xl transition-shadow bg-white">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">98%</h3>
                            <p className="text-gray-600">Satisfaction Rate</p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Founded in 2020, Eventora was born from a simple idea: making it easier for people 
                                    to discover and participate in events that matter to them. What started as a small 
                                    platform has grown into a thriving community of event enthusiasts.
                                </p>
                                <p>
                                    We believe that great experiences bring people together. Whether it's a tech conference, 
                                    a music festival, a workshop, or a community gathering, every event has the power to 
                                    create lasting memories and meaningful connections.
                                </p>
                                <p>
                                    Today, we're proud to serve millions of users across hundreds of cities, helping them 
                                    discover events that align with their interests and passions.
                                </p>
                            </div>
                        </div>
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                <div className="text-center text-white p-8">
                                    <Calendar className="w-24 h-24 mx-auto mb-4 opacity-80" />
                                    <h3 className="text-3xl font-bold mb-2">Since 2020</h3>
                                    <p className="text-lg opacity-90">Building Communities</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-16 px-4 bg-white/50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                        <p className="text-xl text-gray-600">The principles that guide everything we do</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Card className="p-6 hover:shadow-xl transition-shadow bg-white">
                            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                <Target className="w-7 h-7 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">User-Focused</h3>
                            <p className="text-gray-600">
                                Every decision we make starts with our users. Your experience is our priority.
                            </p>
                        </Card>
                        <Card className="p-6 hover:shadow-xl transition-shadow bg-white">
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                <Zap className="w-7 h-7 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
                            <p className="text-gray-600">
                                We constantly evolve and improve, embracing new technologies and ideas.
                            </p>
                        </Card>
                        <Card className="p-6 hover:shadow-xl transition-shadow bg-white">
                            <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                                <Heart className="w-7 h-7 text-pink-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
                            <p className="text-gray-600">
                                Building strong, inclusive communities where everyone feels welcome.
                            </p>
                        </Card>
                        <Card className="p-6 hover:shadow-xl transition-shadow bg-white">
                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                <Shield className="w-7 h-7 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Trust</h3>
                            <p className="text-gray-600">
                                Maintaining transparency and security in every interaction and transaction.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
                        <p className="text-xl text-gray-600">The passionate people behind Eventora</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Sarah Johnson", role: "CEO & Founder", color: "from-purple-500 to-pink-500" },
                            { name: "Michael Chen", role: "CTO", color: "from-blue-500 to-cyan-500" },
                            { name: "Emily Rodriguez", role: "Head of Community", color: "from-pink-500 to-rose-500" },
                        ].map((member, index) => (
                            <Card key={index} className="p-6 text-center hover:shadow-xl transition-shadow bg-white">
                                <div className={`w-24 h-24 bg-gradient-to-br ${member.color} rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold`}>
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                <p className="text-gray-600 mb-4">{member.role}</p>
                                <div className="flex justify-center gap-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-purple-100 transition-colors cursor-pointer">
                                        <span className="text-xs">in</span>
                                    </div>
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-purple-100 transition-colors cursor-pointer">
                                        <span className="text-xs">tw</span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Why Choose Eventora?</h2>
                        <p className="text-xl opacity-90">What makes us different</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Verified Events</h3>
                            <p className="opacity-90">
                                All events are verified and vetted to ensure quality and authenticity.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
                            <p className="opacity-90">
                                Your transactions are protected with industry-leading security measures.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
                            <p className="opacity-90">
                                Our dedicated support team is always here to help you.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
