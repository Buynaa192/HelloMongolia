import { PackageType } from "@/app/_providers/AuthProvider";
import { DurationIcon } from "../assets/durationIcon";
import { StarsIcon } from "lucide-react";

import { FaStar } from "react-icons/fa";

type CompanyDetailsProps = {
  packageDetail: PackageType;
};

export const CostOverview = ({ packageDetail }: CompanyDetailsProps) => {
  return (
    <div className="flex flex-col  text-[14px] gap-5 font-bold p-3 border-[1px] border-[#ababab] rounded-xl">
      <div className="flex gap-2 h-5 w-full  items-center text-3xl font-bold justify-between flex-1">
        <div className="flex flex-col items-baseline text-green-500 gap-1">
          ${packageDetail.cost}
          <p className="text-[10px] text-[#ababab] h-full flex items-end ">
            (cost per person)
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {" "}
        <div className="flex gap-4 w-full h-5 items-center flex-1 text-[18px]  justify-between">
          <div className="flex items-center gap-2 text-[#ababab]">
            {" "}
            Duration
            <DurationIcon />:
          </div>

          <div>
            {packageDetail.duration.includes("days")
              ? `${packageDetail.duration}`
              : `${packageDetail.duration}days`}{" "}
          </div>
        </div>
        <div className="flex gap-4 w-full  flex-1 text-[18px] justify-between">
          <div className="flex items-center gap-2 text-[#ababab]">
            {" "}
            Rating
            <StarsIcon />:
          </div>
          <div className="flex gap-1 items-center">
            <FaStar className="mr-1" /> {packageDetail.rating.toFixed(1)}
          </div>
        </div>
        <div className="flex gap-2 h-5 w-full  items-center text-[18px]  font-bold  flex-1 justify-between text-[#ababab]">
          TripType:<div className="text-accent">{packageDetail.tripType}</div>
        </div>
      </div>
    </div>
  );
};
