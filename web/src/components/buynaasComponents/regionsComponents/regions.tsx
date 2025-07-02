"use client";
import Link from "next/link";
import { RegionCard } from "./regionCard";

import { RegionType } from "@/app/_providers/AuthProvider";

const slugify = (text: string) => text.replace(/\s+/g, "-");
type PropsRegionType = {
  regions: RegionType[];
};
export const Regions = ({ regions }: PropsRegionType) => {
  return (
    <div className="w-[1440px] m-auto">
      <div className="flex flex-col gap-6 p-5">
        <p className="font-medium text-3xl">Travel regions</p>
        <div className="w-full grid grid-cols-4 gap-4">
          {regions.map((item, i) => (
            <Link
              href={`/explore-destinations/${slugify(item.regionName)}`}
              key={i}
            >
              <RegionCard item={item} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
