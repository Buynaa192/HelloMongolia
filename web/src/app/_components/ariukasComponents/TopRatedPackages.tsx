"use clinent";

import { ShowPackage } from "./ShowPackage";
import { HomePageTitle } from "./HomePageTitle";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "@/axios";
import { PackageType } from "@/app/_providers/AuthProvider";

export const TopRatedPackages = () => {
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get("/package/topRatedPackages");

        setPackages(response.data.packages);
      } catch (err) {
        console.error("failed to fetch packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  console.log(packages);

  if (loading) return <p className="text-white">Loading packages...</p>;

  return (
    <div className="w-full h-fit relative flex flex-col md:mb-20 mb-10">
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <HomePageTitle title="BEST-SELLING PACKAGES" />
      </motion.div>
      <div className="w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full max-w-7xl px-4"
        >
          <ShowPackage topPackages={packages} />
        </motion.div>
      </div>
    </div>
  );
};
