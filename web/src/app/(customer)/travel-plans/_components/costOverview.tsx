import { PackageType } from "@/app/_providers/AuthProvider";
import { DurationIcon } from "../assets/durationIcon";
import { StarsIcon } from "lucide-react";

import { FaStar } from "react-icons/fa";

type CompanyDetailsProps = {
  packageDetail: PackageType;
};

export const CostOverview = ({ packageDetail }: CompanyDetailsProps) => {
  return (
    <div className="flex flex-col  text-[14px] gap-6 font-bold px-4 py-4 border border-white/40 bg-white/5 rounded-xl">
      <h1 className="text-xl font-normal">Trip details:</h1>

      <div className="flex flex-col gap-1">
        <p className="text-[#ababab] text-md">Cost:</p>

        <div className="w-full text-3xl font-bold">
          <div className="text-white">
            ${packageDetail.cost}
            <span className="text-sm text-muted-foreground"> per person</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex gap-4 w-full items-center flex-1 text-sm justify-between">
          <div className="flex items-center gap-1 text-[#ababab] font-normal">
            Duration <DurationIcon /> :
          </div>

          <div>{packageDetail.packageItem.length} days</div>
        </div>

        <div className="flex gap-4 w-full items-center flex-1 text-sm justify-between">
          <div className="flex items-center gap-1 text-[#ababab] font-normal">
            Rating <StarsIcon size={16} /> :
          </div>

          <div className="flex gap-1 items-center">
            <FaStar className="mr-1" /> {packageDetail.rating.toFixed(1)}
          </div>
        </div>

        <div className="flex gap-4 w-full items-center flex-1 text-sm justify-between">
          <div className="flex items-center gap-1 text-[#ababab] font-normal">
            Trip type:
          </div>
          <div className="text-accent">{packageDetail.tripType}</div>
        </div>
      </div>
    </div>
  );
};
