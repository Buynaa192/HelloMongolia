/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { PackageType } from "@/app/_providers/AuthProvider";
import Link from "next/link";
import { FaClock, FaGlobe, FaStar } from "react-icons/fa";

type Props = {
  pkg: PackageType;
};

export const FinalPackageCard: React.FC<Props> = ({ pkg }) => {
  return (
    <Link href={`/travel-plans/${pkg._id}`} className="w-full">
      <div className="overflow-hidden border rounded-lg border-white/30">
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
          className="object-cover w-full aspect-video"
        />

        <div className="flex flex-col w-full gap-4 p-4">
          <div>
            <p className="font-semibold text-white truncate text-md">
              {pkg.title}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {pkg.description}
            </p>
          </div>

          <div className="flex items-center w-full gap-3 text-xs font-medium text-white">
            <div className="flex items-center gap-1">
              <FaGlobe className="text-xs text-muted-foreground" />
              {pkg.tripType}
            </div>

            <div className="flex items-center gap-1">
              <FaClock className="text-xs text-muted-foreground" />
              {pkg.duration.includes("days")
                ? pkg.duration
                : `${pkg.duration} days`}
            </div>

            <div className="flex items-center gap-1">
              <FaStar className="text-xs text-muted-foreground" />{" "}
              {pkg.rating.toFixed(1)}
            </div>
          </div>

          <p className="font-semibold text-white text-md">
            ${pkg.cost}{" "}
            <span className="text-xs font-normal text-muted-foreground">
              per person
            </span>
          </p>

          <p className="text-xs text-white">
            <span className="font-medium text-muted-foreground">
              Available:
            </span>{" "}
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
              className="h-6 rounded-[10px] w-6"
            />

            {pkg.companyId.name}
          </div>
        </div>
      </div>
    </Link>
  );
};
