"use client";
import Link from "next/link";
import { RegionCard } from "./regionCard";
import { useEffect, useState } from "react";
import { RegionType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";

const slugify = (text: string) => text.replace(/\s+/g, "-");

export const Regions = () => {
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
  return (
    <div className="flex flex-col gap-3 p-5">
      <p className="font-bold text-3xl ml-5">Travel regions</p>
      <div className="w-full grid grid-cols-4 gap-4">
        {regions.map((item, i) => (
          <Link href={`/explore-destinations/${slugify(item._id)}`} key={i}>
            <RegionCard item={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};
