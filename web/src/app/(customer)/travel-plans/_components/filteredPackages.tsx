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
    <div className="flex flex-col flex-1 gap-6 pl-6 bg-transparent">
      <div className="flex items-center text-[16px] font-semibold gap-2 text-accent">
        <FilterIcon size={16} />
        <p>{packages.length} Results</p>
      </div>

      <div className="w-full">
        {packages.length == 0 ? (
          <div className="w-full flex justify-center text-[#e4e4e5]">
            There is no package here in your filter
          </div>
        ) : null}
        <div className="grid w-full grid-cols-3 gap-4">
          {packages
            .slice()
            .reverse()
            .map((pack, index) => (
              <FinalPackageCard pkg={pack} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};
