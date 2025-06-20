import { PackageType } from "@/app/_providers/AuthProvider";
import { PackageCard } from "./PackageCard";
import { TripReview } from "./TripReview";
import { motion } from "framer-motion";

export const ShowPackage = ({
  topPackages,
}: {
  topPackages: PackageType[];
}) => {
  return (
    <div className="w-full h-fit flex flex-col md:space-y-[-80px]">
      {topPackages.map((pack, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
          viewport={{ once: true }}
          className={`w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 p-4 ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          }`}>
          <PackageCard trip={pack} />
          <TripReview
            title={pack.title}
            reviewMessage={pack.description}
            row={index % 2 === 0 ? "left" : "right"}
          />
        </motion.div>
      ))}
    </div>
  );
};
