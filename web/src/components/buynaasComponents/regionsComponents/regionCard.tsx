"use client";
import { RegionType } from "@/app/_providers/AuthProvider";

type itemType = {
  item: RegionType;
};

export const RegionCard = ({ item }: itemType) => {
  return (
    <div className="w-full h-80 relative group rounded-lg overflow-hidden  shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      <div className="w-full h-[calc(100%-40px)] relative">
        <video key={item._id} className="w-full h-full object-cover" autoPlay muted loop playsInline src={item.videoUrl} />

        <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 text-lg font-semibold">
          See more
        </span>

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      </div>

      <div className="h-10 bg-white flex items-center justify-center rounded-b-lg">
        <p className="text-gray-800 font-semibold text-sm md:text-base">{item.regionName}</p>
      </div>
    </div>
  );
};
