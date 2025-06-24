"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/axios";
import { DestinationType } from "@/app/_providers/AuthProvider";

type DestinationCardProps = {
  destinationId: string;
};

export const DestinationCard = ({ destinationId }: DestinationCardProps) => {
  const [destination, setDestination] = useState<DestinationType>();
  useEffect(() => {
    const getDestination = async () => {
      try {
        const response = await api.get(
          `/destination?destinationId=${destinationId}`
        );
        const data = response.data.destinations;
        if (Array.isArray(data) && data.length > 0) {
          setDestination(data[0]);
        } else {
          setDestination(undefined);
        }
      } catch (err) {
        console.error(err);
      } finally {
      }
    };

    if (destinationId) getDestination();
  }, [destinationId]);
  return (
    <div className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-white/10 w-full aspect-[4/5]">
      <Image
        src={
          destination?.destinationImages?.[0] ??
          "https://res.cloudinary.com/df60cobe2/image/upload/v1750344590/h4chrkja9f1lyoxohfia.jpg"
        }
        alt={destination ? destination?.destinationName : "image"}
        fill
        className="object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

      <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        See more
      </span>
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent px-4 py-3 z-30 space-y-1">
        <p className="text-white text-lg font-bold">
          {destination?.destinationName}
        </p>
        <p className="text-white text-sm opacity-80">{destination?.region}</p>
      </div>
      <div className="absolute bottom-3 left-3 right-3 z-30 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          variant="outline"
          className="bg-white/80 hover:bg-white">
          <Pencil className="w-4 h-4 text-black mr-1" />
          Edit
        </Button>
        <Button size="sm" variant="destructive">
          <Trash className="w-4 h-4 mr-1" />
          Delete
        </Button>
      </div>
    </div>
  );
};
