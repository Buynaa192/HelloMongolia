"use client";

import { DestinationType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Destination() {
  const params = useParams();
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
      <div className="w-full h-120 border-2 border-red-400">
        <Image
          className="w-full h-full"
          src={"/images/pack3.png"}
          width={500}
          height={100}
          alt="bg"
        ></Image>
      </div>
      <p className="ml-4">
        <Link href={"/"}>Home</Link> {`>`}
        <Link href={"/explore-destinations"}> Explore-destinations </Link> {`>`}
        <Link href={`/explore-destinations/${destination?.region}`}>
          {destination?.region}
        </Link>
        {`>`}
        {destination?.destinationName}
      </p>
      <div className="w-full  grid grid-cols-2 gap-4 p-4">
        <div className="w-full h-80 border-2">{destination?.description}</div>
        <div className="w-full border-2">
          {destination?.destinationImages[1]}
        </div>
      </div>
      <div className="w-full  grid grid-cols-2 gap-4 p-4">
        <div className="w-full h-80 border-2">
          {destination?.destinationImages[0]}
        </div>
        <div className="w-full border-2">{destination?.description}</div>
      </div>
      <div className="w-full grid grid-cols-5 border-2 h-100 gap-4 p-4">
        <div className="border-2  w-full">packageCard</div>
        <div className="border-2 w-full">packageCard</div>
        <div className="border-2 w-full">packageCard</div>
        <div className="border-2 w-full">packageCard</div>
        <div className="border-2 w-full">packageCard</div>
      </div>
    </div>
  );
}
