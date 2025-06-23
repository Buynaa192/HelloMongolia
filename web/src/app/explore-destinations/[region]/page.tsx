"use client";
import { BackToHomePathButtons } from "@/app/_components/ariukasComponents/BackToHomePagePathButtons";
import { DestinationType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import { DestinationCard } from "@/components/buynaasComponents/popularDestinations.tsx/destinationCard";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type paramsType = {
  region: string;
};

export default function RegionPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoSource, setVideoSource] = useState();
  const [regionDestinations, setRegionDestination] = useState<
    DestinationType[]
  >([]);
  const region = useParams<paramsType>();

  const GetRegionDestination = async () => {
    const res = await api.get(`/destination/regions?region=${region.region} `);
    setRegionDestination(res.data.regionDestination);
  };

  useEffect(() => {
    GetRegionDestination();
    setCurrentIndex(0);
  }, [region.region]);

  return (
    <div className="w-full h-full text-white flex flex-col gap-4">
      <div className="relative w-full h-[800px] overflow-hidden">
        <video
          key={videoSource}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src={videoSource}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white bg-black/30 px-4 text-center">
          <p className="font-bold text-[60px]">{region.region}</p>
        </div>
      </div>

      <BackToHomePathButtons />
      {/* <p className="m-4">{currentImages.description}</p> */}
      <div className="w-full flex justify-center mb-20">
        <div className="w-full max-w-4xl aspect-video">
          <iframe
            className="w-full h-full rounded-lg"
            // src={currentImages.video}
            title="Sample Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="flex flex-col gap-3 m-4">
        <p className="font-bold text-2xl ml-10">Destinations</p>
        <div className="w-full grid grid-cols-4 gap-4">
          {regionDestinations.map((item, i) => (
            <DestinationCard key={i} item={item} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 m-4">
        <p className="font-bold text-2xl ml-10">Packages:</p>
        <div className="w-full grid grid-cols-4 gap-4">
          {regionDestinations.map((item, i) => (
            <DestinationCard key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
