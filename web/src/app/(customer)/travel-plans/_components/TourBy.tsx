import { PackageType } from "@/app/_providers/AuthProvider";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

type CompanyDetailsProps = {
  packageDetail: PackageType;
};

export const TourBy = ({ packageDetail }: CompanyDetailsProps) => {
  return (
    <div className="w-full border-[1px] rounded-xl border-[#ababab]">
      <div
        className="text-[30px] font-bold  pl-3"
        style={{ fontFamily: "Dancing Script" }}
      >
        Tour by:
      </div>

      <div className="w-full h-fit  flex flex-col p-5 text-2xl font-light gap-3 ">
        <div className="flex-1 h-fit flex flex-col  items-center gap-2">
          <Link
            href={`/companies/${packageDetail.companyId._id}`}
            className="w-30 flex overflow-hidden items-center  rounded-2xl"
          >
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
                className="w-full h-30 rounded-2xl  bg-gray-500  "
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
                className="w-full h-30 rounded-2xl bg-gray-500  "
                alt="Company background"
              />
            )}
          </Link>
          <div className="text-[18px] font-bold">
            {packageDetail.companyId.name}
          </div>
        </div>

        <div className=" w-full flex flex-col  text-[14px] gap-2 font-medium text-[#ababab] ">
          {packageDetail.companyId.since == 0 ||
          packageDetail.companyId.since == null ? null : (
            <div className="w-full flex items-center justify-between ">
              <div>Since:</div>
              <div className="text-accent">{packageDetail.companyId.since}</div>
            </div>
          )}
          <div className="w-full flex items-center justify-between ">
            <div>Rating:</div>
            <div className="flex gap-1 items-center text-accent">
              <FaStar className="mr-1" />{" "}
              {packageDetail.companyId.Rating.toFixed(1)}
            </div>
          </div>{" "}
          <div className="w-full flex items-center justify-between ">
            <div>Experience:</div>
            <div className="flex gap-2 text-accent">
              {packageDetail.companyId.reviews}

              <p>travellers</p>
            </div>
          </div>{" "}
          <div className="w-full flex items-center justify-between ">
            <div className="w-25">Social URL:</div>
            <div className="text-accent">
              {packageDetail.companyId.websiteURL && (
                <a
                  href={
                    packageDetail.companyId.websiteURL.startsWith("http")
                      ? packageDetail.companyId.websiteURL
                      : `https://${packageDetail.companyId.websiteURL}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {packageDetail.companyId.websiteURL}
                </a>
              )}
            </div>
          </div>
          <div className="w-full flex items-center justify-between gap-2">
            <div>Phonenumber:</div>
            <div className="text-accent">
              {packageDetail.companyId.phoneNumber}
            </div>
          </div>
          <div className="w-full flex items-center justify-between gap-2">
            <div>Email:</div>
            <div className="text-accent">{packageDetail.companyId.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
