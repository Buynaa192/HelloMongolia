"use client";
import { DestinationType, RegionType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import { DestinationCard } from "@/components/buynaasComponents/popularDestinations.tsx/destinationCard";
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
  console.log(regn);

  const getDestination = async () => {
    const res = await api.get(
      `/regions/destinations/${regn?._id || "68592416611c9aae4411aaa2"}`
    );
    setDestination(res.data.regionDestination);
  };
  useEffect(() => {
    getRegions();
    getDestination();
  }, []);

  return (
    <div className="w-full h-full text-white flex flex-col gap-4">
      <div className="relative w-full h-[800px] overflow-hidden">
        <video
          key={regn?.videoUrl}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src={regn?.videoUrl}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white bg-black/30 px-4 text-center">
          <p className="font-bold text-[60px]">{region.region}</p>
        </div>
      </div>

      <p className="m-4">{regn?.description}</p>

      <div className="flex flex-col gap-3 m-4">
        <p className="font-bold text-2xl ml-10">Destinations</p>
        <div className="w-full grid grid-cols-4 gap-4">
          {destination.map((item, indx) => {
            return (
              <DestinationCard key={indx} item={item} region={region.region} />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-3 m-4">
        <p className="font-bold text-2xl ml-10">Packages:</p>
        <div className="w-full grid grid-cols-4 gap-4"></div>
      </div>
    </div>
  );
}
