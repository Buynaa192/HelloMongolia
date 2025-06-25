"use client";
import Link from "next/link";
import { useState } from "react";
import { StarIcon } from "../assets/star";
import { PackageType } from "@/app/_providers/AuthProvider";
import { FilterIcon } from "lucide-react";

type FilteredPackagesProps = {
  packages: PackageType[];
};

export const FilteredPackages: React.FC<FilteredPackagesProps> = ({
  packages,
}) => {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleSeeMore = () => setVisibleCount((prev) => prev + 6);
  const handleSeeLess = () => setVisibleCount((prev) => Math.max(prev - 6, 6));

  return (
    <div className="w-full flex flex-col p-5 bg-transparent">
      <div className="flex items-center text-[16px] font-semibold gap-3 text-accent">
        <FilterIcon />
        <div className="flex items-baseline gap-1">
          {" "}
          <p className="text-[20px]">{packages.length}</p> RESULTS
        </div>
      </div>

      <div className="w-full h-fit bg-transparent p-10">
        {packages.length == 0 ? (
          <div className="w-full flex justify-center text-[#e4e4e5]">
            There is no package here in your filter
          </div>
        ) : null}
        <div className="w-full grid grid-cols-3 gap-5">
          {packages.slice(0, visibleCount).map((item, index) => (
            <Link
              href={`travel-plans/${item._id}`}
              key={index}
              className="w-full h-100 flex items-center justify-center  relative text-accent"
            >
              <div className="flex w-95 h-90 rounded-2xl hover:shadow-2xl flex-col hover:w-100 hover:h-95 duration-200 relative">
                <img
                  src={
                    item.coverPhoto == null || item.coverPhoto == ""
                      ? "https://res.cloudinary.com/df60cobe2/image/upload/v1750318124/NoImagePack_tyhsjd.png"
                      : item.coverPhoto
                  }
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src =
                      "https://res.cloudinary.com/df60cobe2/image/upload/v1750318124/NoImagePack_tyhsjd.png";
                  }}
                  className="w-full min-h-[250px] h-full rounded-2xl object-cover"
                />
                <div className="w-full h-30 flex flex-col p-3 absolute bottom-0 bg-black/10 backdrop-blur-lg rounded-b-2xl">
                  <div className="text-[12px] w-fit font-medium text-accent flex items-center gap-2">
                    <img
                      src={
                        item.companyId?.AvatarImage ||
                        "https://res.cloudinary.com/df60cobe2/image/upload/v1750318124/NoImagePack_tyhsjd.png"
                      }
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src =
                          "https://res.cloudinary.com/df60cobe2/image/upload/v1750318124/NoImagePack_tyhsjd.png";
                      }}
                      className="h-7 rounded-[10px] w-7"
                    />
                    {item.tripType}
                    {item.companyId == undefined
                      ? item._id
                      : item.companyId.email}
                  </div>
                  <div className="text-[24px] font-bold truncate">
                    {item.title ? item.title : item.description}
                  </div>
                  <div className="flex w-full justify-between items-center text-[12px] font-medium">
                    <div className="flex gap-2 justify-between items-center">
                      <div>{item.tripType}</div>|
                      <div>
                        {item.duration.includes("days")
                          ? item.duration
                          : `${item.duration} days`}
                      </div>
                      |
                      <div className="flex items-center">
                        <StarIcon />
                        {item.rating}/5
                      </div>
                    </div>
                    <div className="text-[24px] font-bold text-green-500">
                      ${item.cost}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full h-20 flex items-center justify-center gap-3">
        {visibleCount < packages.length && (
          <button
            onClick={handleSeeMore}
            className="w-[150px] h-[40px] bg-white rounded-[20px] flex items-center justify-center text-[16px] text-black font-semibold hover:bg-black hover:text-white duration-200 shadow-[0px_0px_20px_-10px_rgba(0,0,0,0.5)] hover:border-0 "
          >
            SEE MORE
          </button>
        )}
        {visibleCount > 6 && (
          <button
            onClick={handleSeeLess}
            className="w-[150px] h-[40px] bg-white rounded-[20px] flex items-center justify-center text-[16px] text-black font-semibold hover:bg-black hover:text-white duration-200 shadow-[0px_0px_20px_-10px_rgba(0,0,0,0.5)] hover:border-0 "
          >
            SEE LESS
          </button>
        )}
      </div>
    </div>
  );
};
