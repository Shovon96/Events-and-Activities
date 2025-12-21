export const dynamic = "force-dynamic";
import EventCategories from "@/components/modules/Home/EventCategories";
import HomeHero from "@/components/modules/Home/HomeHero";
import HowIsWork from "@/components/modules/Home/HowIsWork";
import PopularEvents from "@/components/modules/Home/PopularEvents";
import Testimonials from "@/components/modules/Home/Testimonials";
import TopRatedHosts from "@/components/modules/Home/TopRatedHost";
import WhyChooseEventora from "@/components/modules/Home/WhyChooseEventora";
import Head from "next/head";
import { Suspense } from "react";
import HomeEventsSkeleton from "@/components/shared/skeletons/HomeEventsSkeleton";

export default function Home() {
  return (
    <>
      <Head>
        <title>Events & Activities</title>
        <meta
          name="description"
          content="Events & Activities Platform for Event Organizers and Attendees. Discover, book, and manage your events and activities effortlessly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
    </>
  );
}
