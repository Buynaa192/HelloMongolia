"use client";
import { PackageType } from "@/app/_providers/AuthProvider";
import { FilterIcon } from "lucide-react";
import { FinalPackageCard } from "../../_components/ariukasComponents/PackageCardForCompany";

type FilteredPackagesProps = {
  packages: PackageType[];
};

export const FilteredPackages: React.FC<FilteredPackagesProps> = ({
  packages,
}) => {
  return (
    <div className="w-full flex flex-col p-5 bg-transparent overflow-scroll">
      <div className="h-15 flex items-center text-[16px] font-semibold gap-3 text-accent">
        <FilterIcon />
        <div className="flex items-baseline gap-1">
          {" "}
          <p className="text-[20px]">{packages.length}</p> RESULTS
        </div>
      </div>

      <div className="w-full h-250 bg-transparent pl-10 pr-10 pb-10 overflow-scroll">
        {packages.length == 0 ? (
          <div className="w-full flex justify-center text-[#e4e4e5]">
            There is no package here in your filter
          </div>
        ) : null}
        <div className="w-full grid grid-cols-3 gap-5 max-2xl:grid-cols-2">
          {packages.map((pack, index) => (
            <FinalPackageCard pkg={pack} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
