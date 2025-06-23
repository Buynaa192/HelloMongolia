"use client";
import { BackToHomePathButtons } from "@/app/_components/ariukasComponents/BackToHomePagePathButtons";
import { DestinationType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import { DestinationCard } from "@/components/buynaasComponents/popularDestinations.tsx/destinationCard";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const NorthernMongolia = {
  images: [
    "https://res.cloudinary.com/df60cobe2/image/upload/v1750344746/images_p3qco7.jpg",
    "https://res.cloudinary.com/df60cobe2/image/upload/v1750344684/bmuknygaru47y1us260s.jpg",
    "https://res.cloudinary.com/df60cobe2/image/upload/v1750344655/lhlxnmm5j8zmfrfmolkz.jpg",
    "https://res.cloudinary.com/df60cobe2/image/upload/v1750344652/ro87sojntukua6vns2il.jpg",
  ],
  video: "https://www.youtube.com/embed/H94ntp93SGY",
  description:
    "Southern Mongolia generally refers to Inner Mongolia, an autonomous region of China, rather than the southern part of the country of Mongolia. It borders the independent nation of Mongolia to the north. Inner Mongolia is known for its vast grasslands, deserts like the Gobi, and historical sites. ",
};
const SouthernMongolia = {
  images: [
    "https://res.cloudinary.com/df60cobe2/image/upload/v1750344900/zvtv2v8ujkwank2sed1x.jpg",
    "https://res.cloudinary.com/df60cobe2/image/upload/v1750344881/Yolyn_20Am1_mpxcn2.jpg",
    "https://res.cloudinary.com/df60cobe2/image/upload/v1750344877/d26e9btyskc1skftxadp.jpg",
    "https://res.cloudinary.com/df60cobe2/image/upload/v1750344828/ukcxe5yilvidvpwsuckf.jpg",
  ],
  video: "https://www.youtube.com/embed/R4WO9IUgIyY",
  description:
    "Southern Mongolia generally refers to Inner Mongolia, an autonomous region of China, rather than the southern part of the country of Mongolia. It borders the independent nation of Mongolia to the north. Inner Mongolia is known for its vast grasslands, deserts like the Gobi, and historical sites. ",
};
const WesternMongolia = {
  images: [
    "https://res.cloudinary.com/df60cobe2/image/upload/v1750344622/ly7zekpo5tegc4zmzxcy.jpg",
    "https://res.cloudinary.com/df60cobe2/image/upload/v1750344610/hbrdikfshqysoum1ifno.jpg",
    "https://res.cloudinary.com/df60cobe2/image/upload/v1750344590/h4chrkja9f1lyoxohfia.jpg",
    "https://res.cloudinary.com/df60cobe2/image/upload/v1750344552/gftoyhpqzhc1kitmwezb.jpg",
  ],
  video: "https://www.youtube.com/embed/R4WO9IUgIyY",
  description:
    "Western Mongolia is a region in Mongolia covering the provinces (or Aimags) of Bayan-Ölgii, Hovd, Uvs, and Zavkhan. It is the most remote region of the country with paved roads from the capital, Ulaanbaatar, ending 320 km (200 miles) before reaching the eastern most point of Zavkhan. It is also the most ethnically diverse, mountainous, and scenic region of Mongolia, with thousands of years of history. The region is home to the Kazakhs, a Muslim tribe from near the Caspian Sea, and Oirats, or western Mongols, which can be divided into 10 different tribes, as well as Khalkhs, or eastern Mongols. In addition to the ethnic diversity, the region is home to the Altai Mountain Range, with the highest peaks in Mongolia, Lake Uvs, a large saltwater lake, and many smaller lakes, mountains, rivers, forests, and steppe. Spread throughout the region are countless archeological sites with petroglyphs, cave paintings, standing stone monuments, monasteries, and ancient forts that date back as far as 10,000 years.",
};
const EasternMongolia = {
  images: [
    "https://res.cloudinary.com/df60cobe2/image/upload/v1750344900/zvtv2v8ujkwank2sed1x.jpg",
    "https://res.cloudinary.com/df60cobe2/image/upload/v1750344881/Yolyn_20Am1_mpxcn2.jpg",
    "https://res.cloudinary.com/df60cobe2/image/upload/v1750344877/d26e9btyskc1skftxadp.jpg",
    "https://res.cloudinary.com/df60cobe2/image/upload/v1750344828/ukcxe5yilvidvpwsuckf.jpg",
  ],
  video: "https://www.youtube.com/embed/R4WO9IUgIyY",
  description:
    "Southern Mongolia generally refers to Inner Mongolia, an autonomous region of China, rather than the southern part of the country of Mongolia. It borders the independent nation of Mongolia to the north. Inner Mongolia is known for its vast grasslands, deserts like the Gobi, and historical sites. ",
};

type paramsType = {
  region: string;
};

export default function RegionPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [regionDestinations, setRegionDestination] = useState<
    DestinationType[]
  >([]);
  const region = useParams<paramsType>();

  const getImagesByRegion = () => {
    if (region.region === "Northern-Mongolia") return NorthernMongolia;
    if (region.region === "Southern-Mongolia") return SouthernMongolia;
    if (region.region === "Western-Mongolia") return WesternMongolia;
    if (region.region === "Eastern-Mongolia") return EasternMongolia;
    return NorthernMongolia;
  };

  const currentImages = getImagesByRegion();

  const GetRegionDestination = async () => {
    const res = await api.get(`/destination/regions?region=${region.region} `);
    setRegionDestination(res.data.regionDestination);
  };

  useEffect(() => {
    GetRegionDestination();
    setCurrentIndex(0);
  }, [region.region]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentImages.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentImages]);

  return (
    <div className="w-full h-full text-white flex flex-col gap-4">
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
              src={currentImages.images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              width={1920}
              height={800}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white bg-black/30 px-4 text-center">
          <p className="font-bold text-[60px]">{region.region}</p>
        </div>
      </div>

      <BackToHomePathButtons />
      <p className="m-4">{currentImages.description}</p>
      <div className="w-full flex justify-center mb-20">
        <div className="w-full max-w-4xl aspect-video">
          <iframe
            className="w-full h-full rounded-lg"
            src={currentImages.video}
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
