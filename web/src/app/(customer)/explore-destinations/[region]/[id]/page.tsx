"use client";

import { DestinationType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import { DesdinationPackage } from "@/components/buynaasComponents/destinationPackage/desPackage";
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
    <div className="w-full   flex flex-col gap-6 pb-10 ">
      <DestinationHero destination={destination} />

      <section className="flex flex-col lg:flex-row p-6 gap-6 w-full">
        <div className="space-y-6 bg-white rounded-2xl p-8 shadow-lg w-full">
          <h1 className="text-4xl font-bold text-gray-900">{destination.destinationName}</h1>
          <p className="text-gray-700 text-lg">{destination.region.regionName}</p>
          <p className="text-gray-600 leading-relaxed">{destination.description}</p>

          <div className="border rounded-xl p-4 bg-gray-50">
            <h2 className="font-semibold text-xl mb-3 text-gray-800">Activities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-gray-700">
              {destination.activities.map((item, indx) => (
                <div key={indx} className="flex items-center gap-2 bg-white p-2 rounded-md shadow-sm border">
                  <span className="text-lg">{item.emoji}</span>
                  <span>{item.activityName}</span>
                </div>
              ))}
            </div>
            {destination.weather.length > 0 && (
              <div className="border rounded-xl p-4 bg-gray-50 mt-6">
                <h2 className="font-semibold text-xl mb-4 text-gray-800">Weather</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {destination.weather.map((item, indx) => (
                    <div
                      key={indx}
                      className="flex flex-col items-start justify-between bg-gradient-to-r from-blue-100 to-blue-50 p-4 rounded-xl shadow hover:shadow-md transition-shadow"
                    >
                      <div className="text-gray-600 font-medium text-sm uppercase tracking-wide">{item.season}</div>
                      <div className="text-3xl font-bold text-blue-700">{item.averageTempF}°F</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <p className="text-white text-4xl">Packages:</p>
      <DesdinationPackage id={id} />
    </div>
  );
}
