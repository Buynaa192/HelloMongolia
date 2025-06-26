"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Regions } from "@/components/buynaasComponents/regionsComponents/regions";
import { PopularDestination } from "@/components/buynaasComponents/popularDestinations.tsx/popularDestination";
import { api } from "@/axios";
import { DestinationType, RegionType } from "@/app/_providers/AuthProvider";

export default function DestinatioExplore() {
  const [destination, setDestination] = useState<DestinationType[]>([]);
  const [searchDestination, SetsearchDestination] = useState("");
  const [regions, setRegions] = useState<RegionType[]>([]);
  const getRegions = async () => {
    try {
      const response = await api.get("/regions");
      setRegions(response.data.regions);
    } catch (err) {
      console.error("failed to fetch packages", err);
    }
  };

  const getDestination = async () => {
    try {
      const res = await api.get(`/destination`);
      setDestination(res.data.destinations);
    } catch (error) {
      console.error("Failed to fetch destinations:", error);
    }
  };

  useEffect(() => {
    getDestination();
    getRegions();
  }, []);

  const filteredDestinations = destination.filter((dest) => dest.destinationName.toLowerCase().includes(searchDestination.toLowerCase()));

  if (destination.length === 0) return null;

  return (
    <div className="w-full h-full  text-white flex flex-col gap-4">
      <div className="relative w-full h-[800px] overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="https://res.cloudinary.com/df60cobe2/video/upload/v1750321530/hangaivideo_ys3x25.mp4"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white bg-black/30  px-4 text-center">
          <p className="font-bold text-[60px]">Wander far. Discover more.</p>
          <p className="max-w-4xl">Discover over 30 handpicked destinations—each capturing the untamed spirit and soul of Mongolia.</p>
          <div className="flex gap-2 items-center bg-white rounded-md px-4 py-2 max-w-md w-full mx-auto">
            <SearchIcon className="text-black" />
            <p className="text-2xl">🇲🇳</p>
            <Input
              placeholder="Search destination..."
              className="text-black border-none outline-none bg-transparent flex-grow"
              onChange={(e) => SetsearchDestination(e.target.value)}
            />
          </div>
          {searchDestination.length > 0 && (
            <div className=" max-h-full overflow-auto rounded-lg w-150 gap-2 flex flex-col">
              <p>Destinations</p>
              {filteredDestinations.map((item) => (
                <div className=" flex   gap-2 p-2" key={item._id}>
                  <Image
                    src={item.destinationImages[0] || "https://res.cloudinary.com/df60cobe2/image/upload/v1750344622/ly7zekpo5tegc4zmzxcy.jpg"}
                    width={200}
                    height={100}
                    alt={item.destinationName}
                    className="rounded-lg w-50 h-50  "
                  />
                  <div>
                    <p className="text-3xl">{item.destinationName}</p>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Regions regions={regions} />
      <PopularDestination destination={destination} regions={regions} />
    </div>
  );
}
