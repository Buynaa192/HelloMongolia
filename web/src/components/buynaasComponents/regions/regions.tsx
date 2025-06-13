"use client";
import Link from "next/link";
import { RegionCard } from "../regionsComponents/regionCard";

const regions = [
  { name: "Southern Mongolia" },
  { name: "Northern Mongolia" },
  { name: "Eastern Mongolia" },
  { name: "Western Mongolia" },
];
const slugify = (text: string) => text.replace(/\s+/g, "-");

export const Regions = () => {
  return (
    <div className="flex flex-col gap-3 p-5">
      <p className="font-bold text-3xl ml-5">Travel regions</p>
      <div className="w-full grid grid-cols-4 gap-4">
        {regions.map((item, i) => (
          <Link
            href={`/explore-destinations/region/${slugify(item.name)}`}
            key={i}
          >
            <RegionCard item={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};
