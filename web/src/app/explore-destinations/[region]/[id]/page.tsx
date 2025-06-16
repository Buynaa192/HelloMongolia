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
  console.log(destination);

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="w-full h-120 border-2 border-red-400">
        <Image
          className="w-full h-full"
          src={"/images/pack3.png"}
          width={500}
          height={100}
          alt="bg"
        ></Image>
      </div>
      <p>
        <Link href={"/"}>Home</Link> {`>`}
        <Link href={"/explore-destinations"}> Explore-destinations </Link> {`>`}
        <Link href={`/explore-destinations/${destination?.region}`}>
          {destination?.region}
        </Link>
        {`>`}
        <Link
          href={`/exolore-destinations/${destination?.region}/${destination?.destinationName}`}
        >
          {destination?.destinationName}
        </Link>
      </p>
    </div>
  );
}
