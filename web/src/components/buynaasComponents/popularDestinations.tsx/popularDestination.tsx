"use client";

import { DestinationType } from "@/app/_providers/AuthProvider";
import { PopularDestinationCard } from "./popularDestinationCard";

type destinationType = {
  destination: DestinationType[];
};
export const PopularDestination = ({ destination }: destinationType) => {
  return (
    <div className="w-[1440px] m-auto">
      <div className="flex flex-col gap-6 p-5">
        <p className="font-medium text-3xl">All destinations</p>
        <div className="w-full grid grid-cols-5 gap-4">
          {destination.map((item, i) => (
            <PopularDestinationCard key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
