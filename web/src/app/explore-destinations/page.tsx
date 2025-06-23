"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Regions } from "@/components/buynaasComponents/regionsComponents/regions";
import { PopularDestination } from "@/components/buynaasComponents/popularDestinations.tsx/popularDestination";
import { api } from "@/axios";
import { DestinationType } from "../_providers/AuthProvider";
import { BackToHomePathButtons } from "../_components/ariukasComponents/BackToHomePagePathButtons";

const images = [
  "https://res.cloudinary.com/df60cobe2/image/upload/v1750344900/zvtv2v8ujkwank2sed1x.jpg",
  "https://res.cloudinary.com/df60cobe2/image/upload/v1750344684/bmuknygaru47y1us260s.jpg",
  "https://res.cloudinary.com/df60cobe2/image/upload/v1750344552/gftoyhpqzhc1kitmwezb.jpg",
  "https://res.cloudinary.com/df60cobe2/image/upload/v1750344336/image_1920_rsbpbh.jpg",
];

export default function DestinatioExplore() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [destination, setDestination] = useState<DestinationType[]>([]);
  const [searchDestination, SetsearchDestination] = useState("");

  const getDestination = async () => {
    try {
      const res = await api.get(`/destination`);
      setDestination(res.data.destinations);
    } catch (error) {
      console.error("Failed to fetch destinations:", error);
    }
  };
  useEffect(() => {
    getDestination();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  const filteredDestinations = destination.filter((dest) =>
    dest.destinationName.toLowerCase().includes(searchDestination.toLowerCase())
  );

  if (destination.length === 0) return null;

  return (
    <div className="w-full h-full  text-white flex flex-col gap-4">
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
          <p className="font-bold text-[60px]">Wander far. Discover more.</p>
          <p className="max-w-4xl">
            Discover over 30 handpicked destinations—each capturing the untamed
            spirit and soul of Mongolia.
          </p>
          <div className="flex gap-2 items-center bg-white rounded-md px-4 py-2 max-w-md w-full mx-auto">
            <SearchIcon className="text-black" />
            <p className="text-2xl">🇲🇳</p>
            <Input
              placeholder="Search destination..."
              className="text-black border-none outline-none bg-transparent flex-grow"
              onChange={(e) => SetsearchDestination(e.target.value)}
            />
          </div>
          {searchDestination.length > 0 && (
            <div className="border-2 border-red-400 max-h-96 overflow-auto">
              <p>Destinations</p>
              {filteredDestinations.map((item) => (
                <div
                  className="border-2 flex items-end  gap-2 p-2"
                  key={item._id}
                >
                  <Image
                    src={
                      item.destinationImages[0] ||
                      "https://res.cloudinary.com/df60cobe2/image/upload/v1750344622/ly7zekpo5tegc4zmzxcy.jpg"
                    }
                    width={200}
                    height={100}
                    alt={item.destinationName}
                    className="rounded"
                  />
                  <p className="absolute">{item.destinationName}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <BackToHomePathButtons />
      <Regions />
      <PopularDestination destination={destination} />
    </div>
  );
}
