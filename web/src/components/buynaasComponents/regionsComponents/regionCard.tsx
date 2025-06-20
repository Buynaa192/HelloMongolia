"use client";
import Image from "next/image";

type itemType = {
  item: { name: string; image: string };
};

export const RegionCard = ({ item }: itemType) => {
  return (
    <div className="w-full h-80 relative group rounded-lg overflow-hidden border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      <div className="w-full h-[calc(100%-40px)] relative">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded-t-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 text-lg font-semibold">
          See more
        </span>

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      </div>

      <div className="h-10 bg-white flex items-center justify-center rounded-b-lg">
        <p className="text-gray-800 font-semibold text-sm md:text-base">
          {item.name}
        </p>
      </div>
    </div>
  );
};
