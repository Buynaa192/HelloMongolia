"use client";

import { DestinationType, RegionType } from "@/app/_providers/AuthProvider";
import { PopularDestinationCard } from "./popularDestinationCard";

type destinationType = {
  destination: DestinationType[];
  regions: RegionType[];
};
export const PopularDestination = ({ destination }: destinationType) => {
  return (
    <div className="flex flex-col gap-3 p-5">
      <p className="font-bold text-3xl ml-5">Popular destinations</p>
      <div className="w-full grid grid-cols-5 gap-4">
        {destination.map((item, i) => (
          <PopularDestinationCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
};
