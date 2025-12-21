export const dynamic = "force-dynamic";

import { Metadata } from "next";
import EventCategories from "@/components/modules/Home/EventCategories";
import HomeHero from "@/components/modules/Home/HomeHero";
import HowIsWork from "@/components/modules/Home/HowIsWork";
import PopularEvents from "@/components/modules/Home/PopularEvents";
import Testimonials from "@/components/modules/Home/Testimonials";
import TopRatedHosts from "@/components/modules/Home/TopRatedHost";
import WhyChooseEventora from "@/components/modules/Home/WhyChooseEventora";
import { Suspense } from "react";
import HomeEventsSkeleton from "@/components/shared/skeletons/HomeEventsSkeleton";

export const metadata: Metadata = {
  title: "Eventora - Discover & Book Amazing Events Near You",
  description: "Join Eventora to discover, book, and manage exciting events and activities. Connect with event organizers and attendees. Find music festivals, workshops, conferences, and more.",
  keywords: ["events", "activities", "event booking", "event management", "concerts", "workshops", "conferences", "festivals", "event platform"],
  authors: [{ name: "Eventora Team" }],
  openGraph: {
    title: "Eventora - Discover & Book Amazing Events Near You",
    description: "Join Eventora to discover, book, and manage exciting events and activities. Connect with event organizers and attendees.",
    type: "website",
    url: "https://eventora.com",
    siteName: "Eventora",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eventora - Discover & Book Amazing Events Near You",
    description: "Join Eventora to discover, book, and manage exciting events and activities.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <main>
      <HomeHero />
      <HowIsWork />
      <Suspense fallback={<HomeEventsSkeleton />}>
        <PopularEvents />
      </Suspense>
      <EventCategories />
      <TopRatedHosts />
      <WhyChooseEventora />
      <Testimonials />
    </main>
  );
}
