"use client";

import { DestinationType } from "@/app/_providers/AuthProvider";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";

type Props = {
  destination: DestinationType;
};

export const DestinationHero = ({ destination }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
  });

  const images = destination.destinationImages;

  return (
    <section className="px-4 md:px-10 py-6 text-white mt-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-extrabold">{destination.destinationName}</h1>
      </div>

      {images.length === 1 && (
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
          <Image src={images[0]} fill alt="Destination photo" className="object-cover rounded-xl" />
        </div>
      )}

      {images.length === 2 && (
        <div className="grid grid-cols-2 gap-2 h-[400px] rounded-xl overflow-hidden">
          {images.map((img, idx) => (
            <div key={idx} className="relative w-full h-full">
              <Image src={img} fill alt={`Image ${idx}`} className="object-cover rounded-xl" />
            </div>
          ))}
        </div>
      )}

      {images.length >= 3 && (
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] overflow-hidden rounded-xl">
          <div className="row-span-2 col-span-2 relative">
            <Image src={images[0]} fill alt={destination.destinationName} className="w-full h-full object-cover rounded-xl" />
          </div>

          {images.slice(1, 5).map((img, index) => {
            const isLast = index === Math.min(3, images.slice(1).length - 1) && images.length > 4;

            return (
              <div key={index} className="relative">
                <Image src={img} fill alt={`image-${index}`} className="w-full h-full object-cover rounded-xl" />
                {isLast && (
                  <div className="absolute bottom-2 right-2 z-10">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <button className="bg-white/80 backdrop-blur-md text-black px-3 py-1 text-sm rounded-md font-semibold hover:bg-white">
                          Show All Photos
                        </button>
                      </DialogTrigger>
                      <DialogContent className="h-150 p-0 overflow-hidden flex flex-col">
                        <DialogHeader>
                          <DialogTitle className="text-lg">All Photos</DialogTitle>
                        </DialogHeader>
                        <div ref={sliderRef} className="keen-slider h-full flex">
                          {images.map((item, idx) => (
                            <div className="keen-slider__slide flex justify-center items-center" key={idx}>
                              <Image src={item} alt={`image-${idx}`} fill className="rounded-xl object-cover max-h-[80vh] w-auto" />
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
