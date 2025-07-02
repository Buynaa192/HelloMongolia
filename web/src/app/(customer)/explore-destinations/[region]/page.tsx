"use client";

import { DestinationType, RegionType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";

import { PopularDestinationCard } from "@/components/buynaasComponents/popularDestinations.tsx/popularDestinationCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Map from "./_components/Map";

type paramsType = {
  region: string;
};

export default function RegionPage() {
  const region = useParams<paramsType>();
  const [regn, setRegn] = useState<RegionType>();
  const [destination, setDestination] = useState<DestinationType[]>([]);

  useEffect(() => {
    const getRegions = async () => {
      const res = await api.get(`/regions?regionName=${region.region}`);
      setRegn(res.data.region);
    };

    const getDestination = async () => {
      const res = await api.get(`/regions/destinations/${regn?._id || "68592416611c9aae4411aaa2"}`);
      setDestination(res.data.regionDestination);
    };

    getRegions();
    getDestination();
  }, [region.region, regn?._id]);

  if (!regn || destination.length === 0) {
    return (
      <div className="flex flex-col w-full h-full gap-4 animate-pulse">
        <div className="relative w-full h-[800px] overflow-hidden">
          <Skeleton className="w-full h-full rounded-none" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Skeleton className="w-48 h-12" />
          </div>
        </div>

        <div className="m-4">
          <Skeleton className="w-1/2 h-6 mb-2" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4 mt-1" />
        </div>

        <div className="flex flex-col gap-3 m-4">
          <Skeleton className="w-32 h-8 ml-10" />
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-full h-72 rounded-xl" />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 m-4">
          <Skeleton className="w-32 h-8 ml-10" />
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-full h-72 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-screen h-full gap-4 overflow-hidden text-white">
      <div className="relative w-full h-[800px] overflow-hidden">
        <video key={regn?.videoUrl} className="object-cover w-full h-full" autoPlay muted loop playsInline src={regn?.videoUrl} />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center text-white bg-black/30">
          <p className="font-bold text-[60px]">{region.region}</p>
        </div>
      </div>

      <div className="w-[1440px] m-auto flex flex-col gap-12 py-12">
        <div className="flex items-center gap-12">
          <div className="flex flex-col flex-1 gap-2">
            <p className="text-3xl font-bold">{region.region}</p>
            <p className="text-muted-foreground">{regn?.description}</p>
          </div>

          <div className="flex-1">
            <Map region={region.region} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-2xl font-medium">Destinations</p>
          <div className="grid w-full grid-cols-4 gap-4">
            {destination.map((item, indx) => (
              <PopularDestinationCard key={indx} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
