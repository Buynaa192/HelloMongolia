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
  const [visibleCount, setVisibleCount] = useState(3);

  const handleSeeMore = () => setVisibleCount((prev) => prev + 6);
  const handleSeeLess = () => setVisibleCount((prev) => Math.max(prev - 6, 3));

  return (
    <div className="w-full flex flex-col p-5 bg-white">
      <div className="flex bg-white items-center text-[16px] font-semibold gap-3">
        <FilterIcon />
        <div className="flex items-baseline gap-1">
          {" "}
          <p className="text-[20px]">{packages.length}</p> RESULTS
        </div>
      </div>

      <div className="w-full h-fit bg-white p-10">
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
              className="w-full h-100 flex items-center justify-center"
            >
              <div className="flex w-90 h-90 rounded-2xl hover:shadow-2xl flex-col hover:w-95 hover:h-95 duration-200">
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
                  className="w-full min-h-[250px] rounded-2xl object-cover"
                />
                <div className="w-full h-full flex flex-col justify-between p-3">
                  <div className="text-[12px] w-fit font-medium text-stone-500">
                    {item.companyId == undefined
                      ? item._id
                      : item.companyId.email}
                  </div>
                  <div className="text-[24px] font-bold truncate">
                    {item.title ? item.title : item.description}
                  </div>
                  <div className="flex w-full justify-between items-center text-[12px] font-medium">
                    <div className="flex w-[100px] justify-between items-center">
                      <div>
                        {item.duration.includes("days")
                          ? item.duration
                          : `${item.duration} days`}{" "}
                      </div>
                      <div className="flex items-center">
                        <StarIcon />
                        {item.rating}
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
            className="w-[150px] h-[40px] bg-red-600  rounded-[20px] flex items-center justify-center text-[16px] text-white font-semibold hover:bg-white hover:text-black duration-200 hover:shadow-[0px_0px_20px_-10px_rgba(0,0,0,0.5)] "
          >
            SEE MORE
          </button>
        )}
        {visibleCount > 3 && (
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
