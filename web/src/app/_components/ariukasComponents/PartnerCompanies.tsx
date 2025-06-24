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
    <div className="w-full h-fit relative flex flex-col items-center mb-25">
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <HomePageTitle title="LOCALS EXPERTS WE TRUST" />
      </motion.div>

      {loading && companies.length === 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="w-[112px] h-28 rounded-lg mx-auto" />
          ))}
        </div>
      ) : (
        <motion.div
          className="w-full grid grid-cols-2 gap-6 md:flex md:flex-wrap md:justify-center md:gap-8 mt-6"
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
              className="w-full max-w-[112px] h-28 p-2 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mx-auto flex items-center justify-center"
              aria-label="Company logo link"
            >
              <Image
                src={AvatarImage}
                alt="Company logo"
                width={112}
                height={112}
                priority
              />
            </a>
          ))}
        </motion.div>
      )}
    </div>
  );
};
