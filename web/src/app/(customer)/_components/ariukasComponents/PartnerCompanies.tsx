"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { CompanyType } from "@/app/_providers/AuthProvider";
import { HomePageTitle } from "./HomePageTitle";
import { api } from "@/axios";

export const PartnerCompanies = () => {
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCompanies = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/company`);
        setCompanies(res.data.companies);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      } finally {
        setLoading(false);
      }
    };

    getCompanies();
  }, []);

  return (
    <div className="relative flex flex-col items-center w-full h-fit mb-25">
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <HomePageTitle title="LOCALS EXPERTS WE TRUST" />
      </motion.div>

      {loading && companies.length === 0 ? (
        <div className="flex gap-4 mt-6 overflow-x-auto">
          {[...Array(6)].map((_, i) => (
            <Skeleton
              key={i}
              className="min-w-[112px] h-28 rounded-lg flex-shrink-0"
            />
          ))}
        </div>
      ) : (
        <motion.div
          className="flex w-full gap-6 px-4 mt-6 overflow-x-auto scrollbar-hide"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          {companies.map(({ AvatarImage, _id }, index) => (
            <a
              key={index}
              href={`/companies/${_id}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Company logo link"
            >
              {/* <Image
                src={AvatarImage}
                alt="Company logo"
                width={112}
                height={112}
                className="object-contain"
                priority
              /> */}
              <div className="relative w-40 h-40 overflow-hidden rounded-xl">
                <Image
                  src={AvatarImage || "/images/placeholder.png"}
                  alt="Company logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </a>
          ))}
        </motion.div>
      )}
    </div>
  );
};
