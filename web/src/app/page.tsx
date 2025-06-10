"use client";

import { Header } from "./_components/ariukas/Header";
import { Hero1 } from "./_components/ariukas/Hero1";
import { Hero2 } from "./_components/ariukas/Hero2";
import { TopDestinationsHero } from "./_components/ariukas/TopDestinations";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <Header />
      <Hero1 />
      <Hero2 />
      <TopDestinationsHero />
    </div>
  );
}
