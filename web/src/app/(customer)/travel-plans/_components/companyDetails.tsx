"user client";
import { PackageType } from "@/app/_providers/AuthProvider";
import { DurationIcon } from "../assets/durationIcon";
import { StarIcon } from "../assets/star";
import { CashIcon } from "../assets/cash";
import { StarsIcon } from "lucide-react";
type CompanyDetailsProps = {
  packageDetail: PackageType;
};
export const CompanyDetails = ({ packageDetail }: CompanyDetailsProps) => {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col w-full ">
        <div
          className="text-[50px] font-bold  pl-5"
          style={{ fontFamily: "Dancing Script" }}
        >
          Trip Overview:
        </div>
        <div className="w-full border-1 border-[#e4e4e5]"></div>
        <div className="w-full flex gap-4 justify-center">
          <div className="p-2  text-[24px] flex-2">
            {packageDetail.description}
          </div>
          <div className="flex flex-col  flex-1 text-[14px] gap-2 font-bold pr-6 pt-2">
            <div className="flex gap-4 w-full h-5 items-center flex-1 text-2xl justify-between">
              <div className="flex items-center gap-2">
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
            <div className="flex gap-4 w-full  flex-1 text-2xl justify-between">
              <div className="flex items-center gap-2">
                {" "}
                Rating
                <StarsIcon />:
              </div>
              <div className="flex gap-1">
                <StarIcon />
                {packageDetail.rating}
              </div>
            </div>
            <div className="flex gap-2 h-5 w-full  items-center text-2xl font-bold justify-between flex-1">
              <div className="flex items-center gap-2">
                Cost
                <CashIcon />
                {":"}
              </div>
              <div className="flex items-baseline text-green-500 gap-2">
                <p className="text-[10px] h-full flex items-end text-accent">
                  (cost per person)
                </p>
                ${packageDetail.cost}
              </div>
            </div>
            <div className="flex gap-2 h-5 w-full  items-center text-2xl font-bold  flex-1 justify-between">
              TripType:<div>{packageDetail.tripType}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="text-[40px] font-bold  pl-5"
        style={{ fontFamily: "Dancing Script" }}
      >
        Tour by:
      </div>
      <div className="w-50 border-1 border-[#e4e4e5]"></div>
      <div className=" h-fit  flex p-5 text-2xl font-light gap-5 ">
        <div className="flex-1 h-fit flex flex-col  items-center gap-2">
          <div className="w-50 flex overflow-hidden items-center  rounded-2xl">
            {packageDetail.companyId.AvatarImage == "" ||
            packageDetail.companyId.AvatarImage == null ? (
              <img
                src={
                  "https://res.cloudinary.com/df60cobe2/image/upload/v1750318055/NoImage_q3vugq.jpg"
                }
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src =
                    "https://res.cloudinary.com/df60cobe2/image/upload/v1750318055/NoImage_q3vugq.jpg";
                }}
                className="w-full h-45 rounded-2xl  bg-gray-500  "
                alt="Company background"
              />
            ) : (
              <img
                src={packageDetail.companyId.AvatarImage}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src =
                    "https://res.cloudinary.com/df60cobe2/image/upload/v1750318055/NoImage_q3vugq.jpg";
                }}
                className="w-full h-45 rounded-2xl bg-gray-500  "
                alt="Company background"
              />
            )}
          </div>
          <div className="text-[18px] font-bold">
            {packageDetail.companyId.name}
          </div>
        </div>

        <div className=" w-300 flex flex-col  text-[18px] gap-3 font-medium ">
          {packageDetail.companyId.since == 0 ||
          packageDetail.companyId.since == null ? null : (
            <div className="w-full flex items-center justify-between ">
              <div>Since:</div>
              <div>{packageDetail.companyId.since}</div>
            </div>
          )}
          <div className="w-full flex items-center justify-between ">
            <div>Rating:</div>
            <div className="flex gap-1 items-center">
              <StarIcon />
              {packageDetail.companyId.Rating}
            </div>
          </div>{" "}
          <div className="w-full flex items-center justify-between ">
            <div>Experience:</div>
            <div className="flex gap-2">
              {packageDetail.companyId.reviews}

              <p>travellers</p>
            </div>
          </div>{" "}
          <div className="w-full flex items-center justify-between ">
            <div>Destinations:</div>

            <div className="flex gap-2">
              {packageDetail.companyId.availableDestinations.length}
              <p>
                {packageDetail.companyId.availableDestinations.length == 0 ||
                packageDetail.companyId.availableDestinations.length == 1
                  ? "destination"
                  : "destinations"}
              </p>
            </div>
          </div>
          <div className="w-full flex items-center justify-between ">
            <div className="w-25">Social URL:</div>
            <div>
              {packageDetail.companyId.websiteURL == ""
                ? packageDetail.companyId.email
                : packageDetail.companyId.websiteURL}
            </div>
          </div>
          <div className="w-full flex items-center justify-between gap-2">
            <div>Phonenumber:</div>
            <div>{packageDetail.companyId.phoneNumber}</div>
          </div>
          <div className="w-full flex items-center justify-between gap-2">
            <div>Email:</div>
            <div>{packageDetail.companyId.email}</div>
          </div>
        </div>
        <div>
          <div className="w-full h-[80%] overflow-hidden">
            {packageDetail.companyId.about}
          </div>
        </div>
      </div>
    </div>
  );
};
