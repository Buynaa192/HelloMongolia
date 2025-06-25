"use client";

import { DestinationType } from "@/app/_providers/AuthProvider";
import { Bookmark, Share2 } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

  return (
    <section className="px-4 md:px-10 py-6 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-extrabold">
            {destination.destinationName}
          </h1>
        </div>

        
      </div>

      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] overflow-hidden rounded-xl">
        <div className="row-span-2 col-span-2 relative">
          <Image
            src={destination.destinationImages[1]}
            fill
            alt={destination.destinationName}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {destination.destinationImages.slice(0, 3).map((item, index) => (
          <Image
            key={index}
            width={500}
            height={500}
            alt={destination.destinationName}
            src={item}
            className="w-full h-full object-cover rounded-xl"
          />
        ))}

        <div className="relative">
          <Image
            fill
            src={
              destination.destinationImages[3] ||
              destination.destinationImages[2] ||
              destination.destinationImages[0]
            }
            alt={destination.destinationName}
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute bottom-2 right-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button className="bg-white/80 backdrop-blur-md text-black px-3 py-1 text-sm rounded-md font-semibold hover:bg-white">
                  Show All Photos
                </button>
              </DialogTrigger>
              <DialogContent className="w-full h-150 p-0 bg-black overflow-hidden">
                <DialogHeader className="text-white px-4 pt-4">
                  <DialogTitle className="text-lg">All Photos</DialogTitle>
                </DialogHeader>
                <div ref={sliderRef} className="keen-slider h-full flex">
                  {destination.destinationImages.map((item, idx) => (
                    <div
                      className="keen-slider__slide flex justify-center items-center "
                      key={idx}
                    >
                      <Image
                        src={item}
                        alt={`image-${idx}`}
                        width={1200}
                        height={800}
                        className="rounded-xl object-cover max-h-[80vh] w-auto"
                      />
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
   
  );
};
