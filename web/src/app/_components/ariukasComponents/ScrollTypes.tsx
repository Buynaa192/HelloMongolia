"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { TravelTypeCard } from "./TravelTypeCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

const Types = [
  {
    title: "ADVENTURE",
    image:
      "https://res.cloudinary.com/df60cobe2/image/upload/v1750321221/adventure_znjzmi.jpg",
    buttonURL: "",
    description:
      "Adventure travel in Mongolia offers raw, untamed experiences like horseback riding across vast steppes, trekking in the Altai Mountains, or camping under the stars in the Gobi Desert. It’s ideal for thrill-seekers looking to disconnect from modern life. You'll encounter challenging terrain, unpredictable weather, and unforgettable landscapes. Whether it's crossing frozen rivers in winter or climbing remote peaks, Mongolia delivers true wilderness exploration.",
  },
  {
    title: "FAMILY",
    image:
      "https://res.cloudinary.com/df60cobe2/image/upload/v1750321440/family_ult5zm.jpg",
    buttonURL: "",
    description:
      "Family travel in Mongolia blends comfort with meaningful cultural experiences. Families can stay in traditional gers, meet nomadic herders, and enjoy gentle activities like camel rides, archery, or yak cart rides. Safe and scenic areas like Khuvsgul Lake or Terelj National Park are great for bonding in nature. The warm hospitality of Mongolian hosts ensures kids and adults alike feel welcome.",
  },
  {
    title: "SCENERY",
    image:
      "https://res.cloudinary.com/df60cobe2/image/upload/v1750322008/uusus2_bkbb6e.jpg",
    buttonURL: "",
    description:
      "Mongolia’s landscapes are as vast as they are varied — from the golden dunes of the Gobi to the alpine beauty of the north. Photographers and nature lovers are drawn to the epic horizons, dramatic skies, and untouched wilderness. Each region offers a distinct visual experience, often with no signs of civilization in sight. Sunrise and sunset here feel like sacred daily rituals in a land without fences.",
  },
  {
    title: "WILDLIFE",
    image:
      "https://res.cloudinary.com/df60cobe2/image/upload/v1750322099/wildlife_nohcau.jpg",
    buttonURL: "",
    description:
      "Mongolia is home to rare and elusive wildlife, including snow leopards, Argali sheep, and wild Bactrian camels. Travelers can track animals in protected areas like Hustai National Park, where Przewalski's horses roam freely. Birdwatchers will delight in seeing steppe eagles and cranes in their natural habitat. With low human interference, Mongolia’s ecosystems remain one of the last true wild places on Earth.",
  },
  {
    title: "CULTURAL",
    image:
      "https://res.cloudinary.com/df60cobe2/image/upload/v1750321225/culture_eswjly.jpg",
    buttonURL: "",
    description:
      "Mongolia’s rich nomadic culture is alive and thriving. Guests are often welcomed into family gers to share milk tea, learn traditional games, and witness daily life that has changed little over centuries. Events like Naadam and Tsagaan Sar reveal the deep pride Mongolians have in their heritage. Travelers leave not just with photos, but with deep connections to people and traditions.",
  },
  {
    title: "HISTORICAL",
    image:
      "https://res.cloudinary.com/df60cobe2/image/upload/v1750321223/history_xrhdet.jpg",
    buttonURL: "",
    description:
      "Mongolia’s history stretches from the ancient petroglyphs of the Gobi to the legacy of Genghis Khan and his vast empire. Museums and monuments in Ulaanbaatar offer context, but it’s the landscapes themselves — sacred mountains, ruined monasteries, and caravan trails — that whisper stories of the past. Walking through these sites, you feel part of something timeless. The history here is vast, and very much alive.",
  },
  {
    title: "SCIENTIFIC",
    image:
      "https://res.cloudinary.com/df60cobe2/image/upload/v1750322139/science_ud4jio.jpg",
    buttonURL: "",
    description:
      "Mongolia is a treasure trove for scientific exploration, especially in paleontology and geology. The Flaming Cliffs, where dinosaur fossils were first discovered, still yield ancient secrets. Researchers and enthusiasts alike can explore active dig sites and learn about Mongolia’s prehistoric biodiversity. The wide open skies also make Mongolia ideal for astronomy and climate research. It’s a living lab of Earth’s ancient and modern systems.",
  },
];

export const ScrollTypes = () => {
  const [current, setCurrent] = useState(4);
  const [api, setApi] = useState<CarouselApi | null>(null);

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
    <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
      <Carousel
        setApi={setApi}
        opts={{ align: "center" }}
        className="w-full max-w-2xl md:max-w-6xl overflow-hidden"
      >
        <CarouselContent>
          {Types.map((item, idx) => (
            <CarouselItem
              key={idx}
              className="basis-[250px] md:basis-[480px] flex flex-col justify-center p-0"
              onMouseEnter={() => api?.scrollTo(idx, false)}
              onFocus={() => api?.scrollTo(idx, false)}
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

      <AnimatePresence mode="wait">
        <motion.div
          key={Types[current]?.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full px-4 max-w-2xl md:max-w-6xl flex flex-col md:flex-row justify-between items-center text-white mt-6 gap-4"
        >
          <div className="italic text-lg md:text-base text-center ">
            {Types[current]?.description || "No description available."}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
