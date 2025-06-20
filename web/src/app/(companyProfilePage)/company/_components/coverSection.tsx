"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export const CoverSection = () => {
  return (
    <div className="relative w-full h-[65vh] overflow-hidden rounded-b-3xl shadow-lg">
      <Image
        src="https://res.cloudinary.com/idemo/image/upload/balloons"
        alt="Cover"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent z-10" />
      <div className="absolute top-4 right-6 z-30">
        <Button
          variant="ghost"
          className="flex items-center gap-2 bg-yellow-400 text-white hover:bg-yellow-500 shadow-md px-4 py-2">
          <Camera size={16} />
          Edit Cover
        </Button>
      </div>

      <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-white px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 drop-shadow-2xl">
          Welcome to our company's website.
        </h1>
        <p className="text-base sm:text-lg max-w-2xl drop-shadow-md">
          We will bring you an amazing journey.
        </p>
      </div>
    </div>
  );
};
