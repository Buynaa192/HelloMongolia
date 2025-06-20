"use client";

import { DestinationType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import { DesdinationPackage } from "@/components/buynaasComponents/destinationPackage/desPackage";
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
    <div className="w-full min-h-screen bg-white flex flex-col gap-6 pb-10">
      <div className="w-full h-[500px] relative">
        <Image
          src={destination.destinationImages[0]}
          alt="Hero image"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-md">
            {destination.destinationName}
          </h1>
        </div>
      </div>

      <div className="ml-6 text-sm text-gray-600 flex gap-1 flex-wrap">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        <span>{`>`}</span>
        <Link href="/explore-destinations" className="hover:underline">
          Explore-destinations
        </Link>{" "}
        <span>{`>`}</span>
        <Link
          href={`/explore-destinations/${destination.region}`}
          className="hover:underline"
        >
          {destination.region}
        </Link>
        <span>{`>`}</span>
        <span className="font-medium">{destination.destinationName}</span>
      </div>

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
