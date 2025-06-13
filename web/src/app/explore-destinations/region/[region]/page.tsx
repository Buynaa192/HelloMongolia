"use client";
import { DestinationCard } from "@/components/buynaasComponents/popularDestinations.tsx/destinationCard";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const images = [
  "/images/pack1.png",
  "/images/pack2.png",
  "/images/pack3.png",
  "/images/pack4.png",
];
type paramsType = {
  region: string;
};
export type regionDestinationType = {
  _id: string;
  destinationName: string;
  destinationImages: string;
  region: string;
  description: string;
  activities: any[];
};

export default function RegionPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [regionDestinations, setRegionDestination] = useState<
    regionDestinationType[]
  >([]);
  const region = useParams<paramsType>();

  const GetRegionDestination = async () => {
    const res = await axios.get(
      `http://localhost:3001/destination/regions?region=${region.region} `
    );
    setRegionDestination(res.data.regionDestination);
  };
  useEffect(() => {
    GetRegionDestination();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full border-2 border-white text-white flex flex-col gap-4">
      <div className="relative w-full h-[800px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <Image
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white bg-black/30  px-4 text-center">
          <p className="font-bold text-[60px]">{region.region}</p>
        </div>
      </div>
      <p className="ml-5">
        <Link href={"/"}>Home </Link>
        {`>`} <Link href={"/explore-destinations"}>Explore-destinations</Link>
        {`>`} {region.region}
      </p>
      <p className="m-4">tuhain busiin tailbar</p>
      <div className="w-full flex justify-center mb-20">
        <div className="w-full max-w-4xl aspect-video">
          <iframe
            className="w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/R4WO9IUgIyY"
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
    </div>
  );
}
