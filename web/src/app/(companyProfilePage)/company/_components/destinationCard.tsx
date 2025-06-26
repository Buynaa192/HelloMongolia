"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
        }
      } catch (error) {
        console.error("Failed to load destination", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDestination();
  }, [destinationId]);

  if (loading) {
    return (
      <Card className="group animate-pulse w-full max-w-sm mx-auto">
        <CardHeader className="h-48 bg-gray-200" />
        <CardContent>
          <div className="h-6 bg-gray-200 mb-2 rounded" />
          <div className="h-4 bg-gray-200 w-3/4 rounded" />
        </CardContent>
      </Card>
    );
  }

  if (!destination) {
    return <div className="text-center py-8">Destination not found.</div>;
  }

  return (
    <Link
      href={`/company/destination/${destinationId}`}
      className="group w-full max-w-sm mx-auto cursor-pointer">
      <Card className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={
              destination.destinationImages?.[0] ||
              "https://res.cloudinary.com/df60cobe2/image/upload/v1750344590/h4chrkja9f1lyoxohfia.jpg"
            }
            alt={destination.destinationName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            See details
          </span>
        </div>
        <CardContent className="p-4">
          <CardTitle className="text-xl font-semibold mb-1">
            {destination.destinationName}
          </CardTitle>
          <CardDescription className="text-gray-600 line-clamp-3 mb-3">
            {destination.description}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-end px-4 py-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1">
            <Pencil className="w-4 h-4" /> View
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
