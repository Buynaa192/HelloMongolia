"use client";
import { useState } from "react";
import { PackageType } from "@/app/_providers/AuthProvider";
import { TripReview } from "./TripReview";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export const ShowPackage = ({
  topPackages,
}: {
  topPackages: PackageType[];
}) => {
  const [showAll, setShowAll] = useState(false);

  const visiblePackages = showAll ? topPackages : topPackages.slice(0, 3);

  return (
    <div className="w-full flex flex-col gap-20 px-4 py-10">
      {visiblePackages.map((pack, index) => {
        const isReversed = index % 2 !== 0;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row ${
              isReversed ? "md:flex-row-reverse" : ""
            } justify-between gap-16`}
          >
            <div className="relative flex-4 h-80 md:h-[500px] rounded-xl shadow-lg overflow-hidden w-full">
              <Image
                src={pack.coverPhoto}
                alt="cover photo"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="flex-3 w-full">
              <TripReview
                pack={pack}
                title={pack.title}
                reviewMessage={pack.description}
                row={isReversed ? "right" : "left"}
              />
            </div>
          </motion.div>
        );
      })}

      <div className="text-white w-full flex justify-center items-center mt-10">
        <Button
          className="w-60 h-15 text-xl"
          size={"lg"}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "See less" : "See more"}{" "}
          {showAll ? (
            <ChevronUp className="ml-2" />
          ) : (
            <ChevronDown className="ml-2" />
          )}
        </Button>
      </div>
    </div>
  );
};
