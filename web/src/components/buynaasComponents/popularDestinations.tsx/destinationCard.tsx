"use client";

import { DestinationType } from "@/app/_providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";
type itemType = {
  item: DestinationType;
  region: string;
};

export const DestinationCard = ({ item, region }: itemType) => {
  console.log("item", item);

  return (
    <Link href={`/explore-destinations/${region}/${item._id}`}>
      <div className="w-full h-100 relative group overflow-hidden flex flex-col  rounded-lg border-1 gap-2">
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <div className="w-full h-[600px] relative rounded-lg flex items-center justify-center">
          <Image
            src={item.destinationImages[0]}
            alt={item.destinationName}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 300px"
          />
          <span className="absolute text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 text-lg">
            See more
          </span>
        </div>

        <p className="relative z-10 text-white text-2xl font-bold text-center ">
          {item.destinationName}
        </p>
        <p className="text-[12px] h-100 p-4 pt-0 ">{item.description}</p>
      </div>
    </Link>
  );
};
