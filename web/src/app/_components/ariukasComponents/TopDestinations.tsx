"use client";

import { useEffect, useState } from "react";
import { ShowRegion } from "./HomeDestination";
import { motion } from "framer-motion";
import { DestinationType, RegionType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import { HomePageTitle } from "./HomePageTitle";

export type DestinationsByRegionsType = RegionType & {
  destinations: DestinationType[];
};

export const TopDestinationsHero = () => {
  const [regions, setRegions] = useState<RegionType[]>([]);

  useEffect(() => {
    const getRegions = async () => {
      try {
        const response = await api.get("/regions");
        setRegions(response.data.regions);
      } catch (err) {
        console.error("failed to fetch packages", err);
      }
    };

    getRegions();
  }, []);

  console.log("regionsss", regions);

  return (
    <div className="w-full h-fit relative flex flex-col">
      <HomePageTitle title="TOP DESTINATIONS" />

      <div className="w-full h-full flex flex-col relative z-20">
        {regions?.map((region, index) => (
          <motion.div
            key={index}
            initial={{ y: 90, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <ShowRegion
              key={region._id}
              _id={region._id}
              videoUrl={region.videoUrl}
              regionName={region.regionName}
              description={region.description}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
