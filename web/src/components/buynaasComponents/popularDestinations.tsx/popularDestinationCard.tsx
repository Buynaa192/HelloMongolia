"use client";

import { DestinationType } from "@/app/_providers/AuthProvider";
import Image from "next/image";
import Link from "next/link";

type itemType = {
  item: DestinationType;
};

export const PopularDestinationCard = ({ item }: itemType) => {
  return (
    <Link href={`/explore-destinations/${item.region?.regionName}/${item._id}`}>
      <div className="w-full aspect-[4/5] relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-white/10">
        <Image
          src={item.destinationImages[0] || "https://res.cloudinary.com/df60cobe2/image/upload/v1750344590/h4chrkja9f1lyoxohfia.jpg"}
          alt={item.destinationName}
          fill
          className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          See more
        </span>

        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent px-4 py-3 z-30">
          <p className="text-white text-lg font-bold">{item.destinationName}</p>
        </div>
      </div>
    </Link>
  );
};
