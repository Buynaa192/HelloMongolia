"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Regions } from "@/components/buynaasComponents/regionsComponents/regions";
import { PopularDestination } from "@/components/buynaasComponents/popularDestinations.tsx/popularDestination";
import { api } from "@/axios";
import { DestinationType, RegionType } from "@/app/_providers/AuthProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function DestinatioExplore() {
  const [destination, setDestination] = useState<DestinationType[]>([]);
  const [searchDestination, SetsearchDestination] = useState("");
  const [regions, setRegions] = useState<RegionType[]>([]);
  const [isFocused, setIsFocused] = useState(false);
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

  const filteredDestinations = destination.filter((dest) =>
    dest.destinationName.toLowerCase().includes(searchDestination.toLowerCase())
  );

  if (destination.length === 0 || regions.length === 0) {
    return (
      <div className="w-full h-full flex flex-col gap-4 animate-pulse">
        <div className="relative w-full h-[800px] overflow-hidden">
          <Skeleton className="w-full h-full rounded-none" />
          <div className="absolute inset-0 bg-black/30 flex flex-col gap-4 items-center justify-center">
            <Skeleton className="h-10 w-96" />
            <Skeleton className="h-4 w-80" />
            <div className="flex items-center gap-2 bg-white p-2 rounded-md w-[300px]">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        </div>

        <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>

        <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-72 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

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
          <p className="max-w-4xl">
            Discover over 30 handpicked destinations—each capturing the untamed
            spirit and soul of Mongolia.
          </p>
          <div className="flex gap-2 items-center bg-white rounded-md px-4 py-2 max-w-md w-full mx-auto">
            <SearchIcon className="text-black" />
            <p className="text-2xl">🇲🇳</p>
            <Input
              value={searchDestination}
              placeholder="Search destination..."
              className="text-black border-none outline-none bg-transparent flex-grow"
              onChange={(e) => SetsearchDestination(e.target.value)}
              onFocus={() => {
                setIsFocused(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setIsFocused(false);
                  SetsearchDestination("");
                }, 200);
              }}
            />
          </div>
          {searchDestination.length > 0 && (
            <div className="max-h-[calc(100vh-540px)] overflow-y-auto overflow-x-hidden rounded-lg w-[1440px] gap-2 flex flex-col bg-black/60 relative">
              <p>Destinations</p>
              <Separator />
              {filteredDestinations.map((item) => (
                <Link
                  key={item._id}
                  href={`/explore-destinations/${item.region.regionName}/${item._id}`}
                >
                  <div className=" flex gap-2 p-2 items-center">
                    <div className="flex justify-center">
                      <Image
                        src={
                          item.destinationImages[0] || item.destinationImages[1]
                        }
                        width={200}
                        height={100}
                        alt={item.destinationName}
                        className="rounded-lg w-50 h-50  "
                      />
                    </div>
                    <div className="h-50 flex flex-col gap-4">
                      <p className="text-3xl font-semibold">
                        {item.destinationName}
                      </p>
                      <p className="w-185">{item.description}</p>
                    </div>
                    <div className="flex flex-col h-50 justify-between flex-1 ">
                      <div className="flex gap-2 w-115 flex-wrap">
                        {item.activities.map((item, idx) => (
                          <Button
                            key={idx}
                            className="flex items-center gap-2 text-white/90"
                          >
                            <span>{item.emoji}</span>
                            <span>{item.activityName}</span>
                          </Button>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-4 w-full justify-between">
                        {item.weather.map((item, indx) => (
                          <div
                            key={indx}
                            className="flex flex-col items-start justify-between bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-xl shadow hover:shadow-md transition-shadow"
                          >
                            <div className="text-gray-600 font-medium text-sm uppercase tracking-wide">
                              {item.season}
                            </div>
                            <div className="text-3xl font-bold text-blue-700">
                              {item.averageTempF}°F
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Separator className="my-2" />
                </Link>
              ))}
              <Separator className="my-2" />
            </div>
          )}
        </div>
      </div>
      <Regions regions={regions} />
      <PopularDestination destination={destination} />
    </div>
  );
}
