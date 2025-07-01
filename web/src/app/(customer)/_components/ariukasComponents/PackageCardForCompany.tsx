import { PackageType } from "@/app/_providers/AuthProvider";
import Link from "next/link";
import { FaGlobe, FaStar } from "react-icons/fa";

type Props = {
  pkg: PackageType;
};

export const FinalPackageCard: React.FC<Props> = ({ pkg }) => {
  return (
    <Link
      href={`/travel-plans/${pkg._id}`}
      className="w-full aspect-square flex items-center justify-center  relative text-accent"
    >
      <div className="flex w-[90%] h-[90%] rounded-2xl hover:shadow-2xl flex-col hover:w-[95%] hover:h-[95%] duration-200 relative">
        <img
          src={
            pkg.coverPhoto == null || pkg.coverPhoto == ""
              ? "https://res.cloudinary.com/df60cobe2/image/upload/v1750318124/NoImagePack_tyhsjd.png"
              : pkg.coverPhoto
          }
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src =
              "https://res.cloudinary.com/df60cobe2/image/upload/v1750318124/NoImagePack_tyhsjd.png";
          }}
          className="w-full h-full rounded-2xl object-cover"
        />
        <div className="w-full h-fit max-2xl:h-fit flex flex-col p-3 max-2xl:p-2 absolute bottom-0 bg-black/10 backdrop-blur-lg rounded-b-2xl">
          <div className="text-[12px] w-fit font-medium text-accent flex items-center gap-2">
            <img
              src={
                pkg.companyId?.AvatarImage ||
                "https://res.cloudinary.com/df60cobe2/image/upload/v1750318124/NoImagePack_tyhsjd.png"
              }
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src =
                  "https://res.cloudinary.com/df60cobe2/image/upload/v1750318124/NoImagePack_tyhsjd.png";
              }}
              className="h-7 max-2xl:h-6 rounded-[10px] w-7"
            />

            {pkg.companyId == undefined ? pkg._id : pkg.companyId.email}
          </div>
          <div className="text-[24px] max-2xl:text-[16px]  font-bold truncate ">
            {pkg.title ? pkg.title : pkg.description}
          </div>
          <div className="flex w-full justify-between items-center text-[12px] font-medium max-2xl:text-[8px] ">
            <div className="flex gap-2 justify-between items-center">
              <div className="flex items-center gap-1">
                <FaGlobe className="text-primary" color="white" />
                {pkg.tripType}
              </div>
              |
              <div>
                {pkg.duration.includes("days")
                  ? pkg.duration
                  : `${pkg.duration} days`}
              </div>
              |
              <div className="flex items-center">
                <FaStar className="mr-1" /> {pkg.rating.toFixed(1)}
              </div>
            </div>
            <div className="text-[24px] max-2xl:text-[16px] font-bold text-green-500">
              ${pkg.cost}
            </div>
          </div>
          <p className="text-xs text-gray-400 max-2xl:text-[10px] ">
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
    </Link>
  );
};
