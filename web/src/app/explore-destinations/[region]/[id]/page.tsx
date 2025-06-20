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

  return (
    <div className="w-full min-h-screen bg-white flex flex-col gap-4">
     
      <div className="w-full h-[500px] relative">
        <Image
          src={
            destination?.destinationImages?.[0] ||
            "https://res.cloudinary.com/df60cobe2/image/upload/v1750344336/image_1920_rsbpbh.jpg"
          }
          alt="bg"
          fill
          className="object-cover"
        />
      </div>
 
     
      <p className="ml-4">
        <Link href="/">Home</Link> {`>`}
        <Link href="/explore-destinations"> Explore-destinations </Link> {`>`}
        <Link href={`/explore-destinations/${destination?.region}`}>
          {destination?.region}
        </Link>
        {`>`}
        {destination?.destinationName}
      </p>

    
      <div className="w-full grid grid-cols-2 gap-4 p-4">
        <div className="w-full h-80 border-2 p-4 text-gray-700 text-base">
          {destination?.description}
        </div>
        <div className="w-full border-2 relative h-80">
          {destination?.destinationImages?.[1] && (
            <Image
              src={destination.destinationImages[1]}
              alt={destination.destinationName || "destination image"}
              fill
              className="object-cover"
            />
          )}
        </div>
      </div>
    
      <div className="w-full grid grid-cols-2 gap-4 p-4">
        <div className="w-full border-2 relative h-80">
          {destination?.destinationImages?.[0] && (
            <Image
              src={destination.destinationImages[0]}
              alt={destination.destinationName || "destination image"}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="w-full border-2 p-4 text-gray-700 text-base">
          {destination?.description}
        </div>
      </div>
      <DesdinationPackage id={id} />
    </div>
  );
}