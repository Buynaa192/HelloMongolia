"use client";

import { DestinationType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import { DestinationIdBody } from "@/components/buynaasComponents/destinationPackage/destinationIdBody";
import { DestinationHero } from "@/components/buynaasComponents/destinationPackage/destinationImages";
import { Skeleton } from "@/components/ui/skeleton";

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
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-full max-w-5xl p-6 space-y-6">
          <Skeleton className="h-64 w-full rounded-2xl" />

          <div className="space-y-4 bg-white p-6 rounded-2xl shadow">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-20 w-full" />

            <Skeleton className="h-6 w-1/4" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-md" />
              ))}
            </div>

            <Skeleton className="h-6 w-1/4 mt-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full items-center  flex flex-col gap-6 pb-10 ">
      <DestinationHero destination={destination} />
      <DestinationIdBody destination={destination} />
    </div>
  );
}
