import { PackageCard } from "./PackageCard";
import { TripReview } from "./TripReview";
import { motion } from "framer-motion";

export type PackageDetailsType = {
  title: string;
  rating: number;
  destinations: string[];
  activities: string[];
  group: string[];
  cost: number;
  image: string;
  operator: string;
};

export type TourPackageType = {
  trip: PackageDetailsType;
  reviewMessage: string;
};

type BestRatedPackagesProps = {
  topTours: TourPackageType[];
};

export const ShowPackage = ({ topTours }: BestRatedPackagesProps) => {
  return (
    <div className="w-full h-fit flex flex-col md:space-y-[-80px]">
      {topTours.map((tours, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
          viewport={{ once: true }}
          className={`w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 p-4 ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          <PackageCard trip={tours.trip} />
          <TripReview
            title={tours.trip.title}
            reviewMessage={tours.reviewMessage}
            row={index % 2 === 0 ? "left" : "right"}
          />
        </motion.div>
      ))}
    </div>
  );
};
