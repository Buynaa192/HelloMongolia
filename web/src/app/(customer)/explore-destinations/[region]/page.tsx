"use client";
import { DestinationType, RegionType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import { DestinationCard } from "@/components/buynaasComponents/popularDestinations.tsx/destinationCard";
import { PopularDestinationCard } from "@/components/buynaasComponents/popularDestinations.tsx/popularDestinationCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type paramsType = {
  region: string;
};

export default function RegionPage() {
  const region = useParams<paramsType>();
  const [regn, setRegn] = useState<RegionType>();
  const [destination, setDestination] = useState<DestinationType[]>([]);
  const getRegions = async () => {
    const res = await api.get(`/regions?regionName=${region.region}`);
    setRegn(res.data.region);
  };

  const getDestination = async () => {
    const res = await api.get(`/regions/destinations/${regn?._id || "68592416611c9aae4411aaa2"}`);
    setDestination(res.data.regionDestination);
  };
  useEffect(() => {
    getRegions();
    getDestination();
  }, []);
  if (!regn || destination.length === 0) {
    return (
      <div className="w-full h-full flex flex-col gap-4 animate-pulse">
        <div className="relative w-full h-[800px] overflow-hidden">
          <Skeleton className="w-full h-full rounded-none" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <Skeleton className="h-12 w-48" />
          </div>
        </div>

        <div className="m-4">
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mt-1" />
        </div>

        <div className="flex flex-col gap-3 m-4">
          <Skeleton className="h-8 w-32 ml-10" />
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-72 w-full rounded-xl" />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 m-4">
          <Skeleton className="h-8 w-32 ml-10" />
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-72 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full text-white flex flex-col gap-4">
      <div className="relative w-full h-[800px] overflow-hidden">
        <video key={regn?.videoUrl} className="w-full h-full object-cover" autoPlay muted loop playsInline src={regn?.videoUrl} />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white bg-black/30 px-4 text-center">
          <p className="font-bold text-[60px]">{region.region}</p>
        </div>
      </div>

      <p className="m-4">{regn?.description}</p>

      <div className="flex flex-col gap-3 m-4">
        <p className="font-bold text-2xl ml-10">Destinations</p>
        <div className="w-full grid grid-cols-4 gap-4">
          {destination.map((item, indx) => {
            return <PopularDestinationCard key={indx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
