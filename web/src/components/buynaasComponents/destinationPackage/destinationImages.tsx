"use client";

import { DestinationType } from "@/app/_providers/AuthProvider";
import Image from "next/image";
import { useState } from "react";

type Props = {
  destination: DestinationType;
};

export const DestinationHero = ({ destination }: Props) => {
  const images = destination.destinationImages;
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <section className="relative w-full h-[500px] overflow-hidden mt-15 bg-gray-100 ">
      {mainImage ? (
        <Image
          src={mainImage}
          alt="Main image"
          fill
          className="object-cover w-full h-full "
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-300 text-xl">
          No Image
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="absolute bottom-6 left-6 z-10 text-white space-y-2">
        <h1 className="text-3xl font-bold">{destination.destinationName}</h1>
        <div className="flex items-center gap-2 text-sm text-white/90">
          <span>{destination.region.regionName}, Mongolia</span>
        </div>
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 right-6 z-10 flex gap-2">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`w-12 h-12 relative rounded-md overflow-hidden border-2 ${
                img === mainImage ? "border-white" : "border-transparent"
              } cursor-pointer`}
              onClick={() => setMainImage(img)}
            >
              <Image
                src={img}
                alt={`thumb-${idx}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
