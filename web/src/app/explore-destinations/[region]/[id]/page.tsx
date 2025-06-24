"use client";

import { BackToHomePathButtons } from "@/app/_components/ariukasComponents/BackToHomePagePathButtons";
import { DestinationType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import { DesdinationPackage } from "@/components/buynaasComponents/destinationPackage/desPackage";
import { DestinationHero } from "@/components/buynaasComponents/destinationPackage/destinationImages";
import Image from "next/image";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type idType = { id: string };

export default function Destination() {
  const params = useParams<idType>();
  const id = params.id;
  const [destination, setDestination] = useState<DestinationType>();

  useEffect(() => {
    const fetchDestination = async () => {
      if (!id) return;

      try {
        const res = await api.get(`/destination?destinationId=${id}`);
        setDestination(res.data.destinations[0]);
      } catch (error) {
        console.error("Failed to fetch destination:", error);
      }
    };

    fetchDestination();
  }, [id]);

  if (!destination) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-xl">
        Loading destination...
      </div>
    );
  }
  console.log(destination);

  return (
    <div className="w-full min-h-screen  flex flex-col gap-6 pb-10">
      <DestinationHero destination={destination} />
      <BackToHomePathButtons />

      <div className="grid md:grid-cols-2 gap-6 px-6">
        <div className="text-gray-700 text-base leading-relaxed border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm">
          {destination.description}
        </div>
        <div className="relative h-80 border border-gray-200 rounded-lg overflow-hidden">
          {destination.destinationImages?.[1] && (
            <Image
              src={destination.destinationImages[1]}
              alt={`${destination.destinationName} image`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 px-6">
        <div className="relative h-80 border border-gray-200 rounded-lg overflow-hidden">
          {destination.destinationImages?.[0] && (
            <Image
              src={destination.destinationImages[0]}
              alt={`${destination.destinationName} image`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>
        <div className="text-gray-700 text-base leading-relaxed border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm">
          {destination.description}
        </div>
      </div>
      <DesdinationPackage id={id} />
    </div>
  );
}
