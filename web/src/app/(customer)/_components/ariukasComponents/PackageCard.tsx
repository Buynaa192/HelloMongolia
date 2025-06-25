import { PackageType } from "@/app/_providers/AuthProvider";
import { FaRegClock, FaGlobe, FaStar } from "react-icons/fa";

type Props = {
  pkg: PackageType;
};

export const PackageCardForCompany: React.FC<Props> = ({ pkg }) => {
  return (
    <div className="w-80 h-fit relative max-w-sm rounded-xl overflow-hidden shadow-lg bg-white/10 backdrop-blur hover:shadow-2xl transition-shadow duration-300 group">
      <div className="relative">
        <img
          src={pkg.coverPhoto}
          alt={pkg.title}
          className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-115"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50  group-hover:scale-115 transition-transform duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 ">
          <button className="px-4 py-2 bg-white text-black font-semibold rounded-md shadow hover:bg-gray-100">
            View Details
          </button>
        </div>
        <h2 className="absolute bottom-2 left-4 text-white text-xl font-bold drop-shadow-md z-10">
          {pkg.title}
        </h2>
      </div>

      <div className="p-5">
        <p className="text-sm line-clamp-3 mb-3 h-10">{pkg.description}</p>

        <div className="flex items-center text-sm space-x-4 mb-2">
          <span className="flex items-center gap-1">
            <FaRegClock className="text-primary" color="white" /> {pkg.duration}
          </span>
          <span className="flex items-center gap-1">
            <FaGlobe className="text-primary" color="white" /> {pkg.tripType}
          </span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="font-bold text-lg text-white">${pkg.cost}</div>
          <div className="flex items-center text-yellow-500 text-sm">
            <FaStar className="mr-1" /> {pkg.rating.toFixed(1)}
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-3">
          <span className="font-medium">Available:</span>{" "}
          {new Date(pkg.availableFrom).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}{" "}
          →{" "}
          {new Date(pkg.availableUntil).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};
