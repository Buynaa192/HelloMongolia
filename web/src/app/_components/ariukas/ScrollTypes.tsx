"use client";

import React, { useEffect, useRef, useState } from "react";
import { TravelTypeCard } from "./TravelTypeCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

export const ScrollTypes = () => {
  const [current, setCurrent] = useState(4);
  const [api, setApi] = useState<CarouselApi | null>(null);

  const Types = [
    {
      title: "ADVENTURE",
      image: "/images/ariukasImages/adventure.jpg",
      buttonURL: "",
    },
    {
      title: "FAMILY",
      image: "/images/ariukasImages/family.jpg",
      buttonURL: "",
    },
    {
      title: "SCENERY",
      image: "/images/ariukasImages/scenery.jpg",
      buttonURL: "",
    },
    {
      title: "WILDLIFE",
      image: "/images/ariukasImages/wildlife.jpg",
      buttonURL: "",
    },
    {
      title: "CULTURAL",
      image: "/images/ariukasImages/culture.jpg",
      buttonURL: "",
    },
    {
      title: "HISTORICAL",
      image: "/images/ariukasImages/history.jpg",
      buttonURL: "",
    },
    {
      title: "SCIENTIFIC",
      image: "/images/ariukasImages/science.jpg",
      buttonURL: "",
    },
  ];

  useEffect(() => {
    if (api) {
      const handleSelect = () => {
        setCurrent(api.selectedScrollSnap());
      };

      api.on("select", handleSelect);

      setCurrent(api.selectedScrollSnap());

      return () => {
        api.off("select", handleSelect);
      };
    }
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ align: "center" }}
      className="w-full md:max-w-5xl max-w-2xl overflow-hidden"
    >
      <CarouselContent className="-ml-4">
        {Types.map((item, idx) => (
          <CarouselItem
            key={idx}
            className="md:basis-[400px] basis-[250px] flex flex-col justify-center p-0"
            onMouseEnter={() => api?.scrollTo(idx)}
            onFocus={() => api?.scrollTo(idx)}
          >
            <TravelTypeCard
              title={item.title}
              imageSrc={item.image}
              buttonURL={item.buttonURL}
              isFocused={idx === current}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
