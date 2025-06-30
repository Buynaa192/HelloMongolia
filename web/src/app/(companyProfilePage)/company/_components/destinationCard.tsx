"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { api } from "@/axios";
import { DestinationType } from "@/app/_providers/AuthProvider";

interface DestinationCardProps {
  destinationId: string;
}

export const DestinationCard = ({ destinationId }: DestinationCardProps) => {
  const [destination, setDestination] = useState<DestinationType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDestination() {
      try {
        const response = await api.get(
          `/destination?destinationId=${destinationId}`
        );
        const data = response.data.destinations;
        if (Array.isArray(data) && data.length > 0) {
          setDestination(data[0]);
        } else {
          setDestination(null);
        }
      } catch (error) {
        console.error("Failed to load destination", error);
        setDestination(null);
      } finally {
        setLoading(false);
      }
    }
    if (destinationId) fetchDestination();
  }, [destinationId]);

  if (loading) {
    return (
      <div className="animate-pulse max-w-sm mx-auto h-96 rounded-2xl bg-gray-200" />
    );
  }

  if (!destination) {
    return (
      <div className="text-center py-8 text-gray-500">
        Destination not found.
      </div>
    );
  }

  return (
    <Link
      href={`/company/destination/${destinationId}`}
      className="group max-w-sm mx-auto cursor-pointer rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
      passHref>
      <div className="relative h-52 w-full">
        {destination.destinationImages?.[0] ? (
          <Image
            src={destination.destinationImages[0]}
            alt={destination.destinationName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 rounded-t-2xl">
            No Image Available
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          See details
        </span>
      </div>

      <div className="flex flex-col flex-1 p-4 bg-white">
        <h3 className="text-xl font-bold mb-2 line-clamp-2 text-gray-900">
          {destination.destinationName}
        </h3>
        <p className="text-gray-600 line-clamp-3 mb-4">
          {destination.description}
        </p>

        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1">
            <Pencil className="w-4 h-4" /> View
          </Button>
        </div>
      </div>
    </Link>
  );
};
