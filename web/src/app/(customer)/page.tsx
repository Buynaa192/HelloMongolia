"use client";

import { TopRatedPackages } from "./_components/ariukasComponents/TopRatedPackages";
import { TopDestinationsHero } from "./_components/ariukasComponents/TopDestinations";
import { ChooseTravelType } from "./_components/ariukasComponents/TravelType";
import { PartnerCompanies } from "./_components/ariukasComponents/PartnerCompanies";
import { Hero1 } from "./_components/ariukasComponents/Hero1";
import { Hero2 } from "./_components/ariukasComponents/Hero2";
import { useState } from "react";

export type Hero1and2Props = {
  radient: "white" | "black";
  setRadient: (radient: "white" | "black") => void;
};
export default function Home() {
  const [radient, setRadient] = useState<"white" | "black">("white");

  return (
    <div className="flex flex-col w-full">
      <Hero1 radient={radient} setRadient={setRadient} />
      <Hero2 radient={radient} />
      <TopDestinationsHero />
      <ChooseTravelType />
      <TopRatedPackages />
      <PartnerCompanies />
    </div>
  );
}
