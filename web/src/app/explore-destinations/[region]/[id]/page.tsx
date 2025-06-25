"use client";

import { BackToHomePathButtons } from "@/app/_components/ariukasComponents/BackToHomePagePathButtons";
import { DestinationType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import { DesdinationPackage } from "@/components/buynaasComponents/destinationPackage/desPackage";
import { DestinationHero } from "@/components/buynaasComponents/destinationPackage/destinationImages";
import Image from "next/image";
import Link from "next/link";

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


  return (
    <div className="w-full min-h-screen  flex flex-col gap-6 pb-10">
      <DestinationHero destination={destination} />
      <BackToHomePathButtons />
     
  <section className="flex flex-col lg:flex-row p-6 gap-6 w-full">
  <div className="space-y-6 bg-white rounded-2xl p-8 shadow-lg w-full">
    <h1 className="text-4xl font-bold text-gray-900">
      {destination.destinationName}
    </h1>

    <p className="text-gray-600 leading-relaxed">
      {destination.description}
    </p>

    <div className="border rounded-xl p-4 bg-gray-50">
      <h2 className="font-semibold text-xl mb-3 text-gray-800">Activities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-gray-700">
        {destination.activities.map((item, indx) => (
          <div
            key={indx}
            className="flex items-center gap-2 bg-white p-2 rounded-md shadow-sm border"
          >
            <span className="text-lg">{item.emoji}</span>
            <span>{item.activityName}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
     
      <DesdinationPackage id={id} />
      
    </div>
  );
}
