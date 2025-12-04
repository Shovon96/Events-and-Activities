import HomeHero from "@/components/modules/Home/HomeHero";
import Head from "next/head";

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
      </main>
    </>
  );
}
