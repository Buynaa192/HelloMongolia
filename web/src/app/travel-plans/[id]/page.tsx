"use client";

import {
  LocationType,
  PackageItemType,
  PackageType,
} from "@/app/_providers/AuthProvider";
import { CashIcon } from "@/app/travel-plans/assets/cash";
import { DurationIcon } from "@/app/travel-plans/assets/durationIcon";
import { StarIcon } from "@/app/travel-plans/assets/star";
import { api } from "@/axios";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
type Params = {
  id: string;
};

export default function PackagePage() {
  const { id } = useParams<Params>();
  const [packages, setPackage] = useState<PackageType[]>([]);
  const [location, setLocation] = useState<LocationType[]>([]);
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await api.get(`/package?packageId=${id}`);
        setPackage(res.data.packages);
        console.log(res.data.packages);
        const allLocations = res.data.packages.flatMap((pkg: PackageType) =>
          pkg.packageItem.flatMap(
            (item: PackageItemType) => item.destinationId?.location
          )
        );

        setLocation(allLocations);
        console.log("Location", allLocations);
      } catch (err) {
        console.error("Failed to fetch packages", err);
      }
    };

    fetchPackage();
  }, []);

  return (
    <>
      {packages.map((item, index) => {
        return (
          <div
            key={index}
            className="w-full text-black flex flex-col gap-4 bg-white"
          >
            <div className="w-full h-180 relative overflow-scroll ">
              {item.packageItem.length < 5 ? (
                <img
                  src={item.coverPhoto}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className={`w-fit h-full flex absolute ${
                    item.packageItem.length >= 5 ? "animate-wiggle" : ""
                  } `}
                >
                  {item.packageItem.slice(0, 5).map((it, index) => {
                    console.log(item);

                    return (
                      <div key={index} className="w-[1440px]">
                        <img
                          src={it.image}
                          key={index}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src =
                              "https://res.cloudinary.com/df60cobe2/image/upload/v1750318124/NoImagePack_tyhsjd.png";
                          }}
                          className="w-full h-full object-cover  "
                        />
                      </div>
                    );
                  })}
                </div>
              )}
              <div className=" w-full h-full  absolute inset-0 flex  items-end justify-between bg-linear-to-tr from-black to-100% ">
                <div className="w-[60%] h-[60%] flex flex-col items-center p-10 gap-10">
                  <div className="text-white text-[50px] font-bold ">
                    <div>{item.title}</div>
                  </div>
                  <div
                    className="text-[16px] text-white w-full font-semibold "
                    style={{ fontFamily: "Orbitron" }}
                  >
                    {item.duration.includes("days")
                      ? item.duration
                      : `${item.duration} days `}
                    {` • ${item.packageItem[0].title}`}
                  </div>
                </div>
                <div className="w-50 h-full flex flex-col items-center justify-around ">
                  {item.packageItem.map((it, ind) => {
                    return (
                      <div key={ind} className="w-full  h-[calc(100%/5)] p-3">
                        <img
                          src={it.image}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src =
                              "https://res.cloudinary.com/df60cobe2/image/upload/v1750318124/NoImagePack_tyhsjd.png";
                          }}
                          className="w-full h-full object-cover rounded-[10px]"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="bg-white w-full p-2">
              <Link href={"/"}> Home</Link> |{" "}
              <Link href={"/travel-plans"}> Explore tour</Link> |{" "}
              {item.description}{" "}
            </div>{" "}
            <div className="w-full flex min-h-100 p-3 items-center  ">
              <div className="flex flex-col w-100">
                <div className="w-full flex flex-col gap-4">
                  <div className="text-[24px] font-bold">Trip Overview:</div>
                  <div className="flex flex-col gap-2">
                    <div>Tour by:</div>
                    <div className="flex w-full h-10 gap-4">
                      {item.companyId.AvatarImage == "" ||
                      item.companyId.AvatarImage == null ? (
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
                          className="w-10 h-full rounded-[40px] object-cover border-1 border-black"
                          alt="Company background"
                        />
                      ) : (
                        <img
                          src={item.companyId.AvatarImage}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src =
                              "https://res.cloudinary.com/df60cobe2/image/upload/v1750318055/NoImage_q3vugq.jpg";
                          }}
                          className="w-10 h-full rounded-[40px] object-cover border-1 border-black"
                          alt="Company background"
                        />
                      )}

                      <div className="flex flex-col h-full justify-center">
                        <div className="text-[20px] font-bold">
                          {item.companyId.email}
                        </div>
                        <div className="text-[12px]">
                          {item.companyId.websiteURL}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-black text-">{item.description}</div>
                  <div className="flex flex-col w-full text-[14px] gap-2">
                    <div className="flex gap-4 w-full h-5 items-center">
                      <DurationIcon />
                      <div>
                        {item.duration.includes("days")
                          ? `${item.duration}`
                          : `${item.duration}days`}{" "}
                      </div>
                    </div>
                    <div className="flex gap-4 w-full h-5">
                      <div className="flex items-center gap-4">
                        <StarIcon /> {item.rating}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 h-5 w-full pl-1 items-center text-2xl font-bold">
                    <CashIcon />${item.cost}{" "}
                    <p className="text-[12px] h-full flex items-end">
                      (cost per person)
                    </p>
                  </div>{" "}
                </div>
              </div>
              <div className="h-150 border-1 border-[#e4e4e5]"></div>

              <div className="flex-1 pl-2 pr-2 flex flex-col relative ">
                <div className="w-full  ">
                  <div className="w-full h-15 bg-[#000000] flex rounded-t-[8px]">
                    {item.packageItem.map((_, index) => {
                      return (
                        <a
                          key={index}
                          href={`#section${index + 1}`}
                          className="flex-1 h-full  flex items-center justify-center text-[24px] text-white font-bold hover:bg-[#ffffff] hover:text-black rounded-t-[7px] duration-300"
                        >
                          Day {index + 1}
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="w-full h-[500px] overflow-scroll scroll-smooth rounded-[8px] ">
                  {item.packageItem.map((item, index) => (
                    <div key={index} className={`w-full h-[500px] relative`}>
                      <img
                        src={item.image}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src =
                            "https://res.cloudinary.com/df60cobe2/image/upload/v1750318124/NoImagePack_tyhsjd.png";
                        }}
                        alt="Image"
                        id={`section${index + 1}`}
                        className="w-full h-full object-cover object-left"
                      />
                      <div className="absolute w-[50%] h-full bg-linear-to-r from-[#000000b8] to-100%  to-[#00000028] inset-0 p-4 flex flex-col items-center justify-center gap-4">
                        <div
                          className="text-[40px] text-white font-bold"
                          style={{ fontFamily: "Dancing Script" }}
                        >
                          {item.title} Day{index + 1}
                        </div>
                        <div className="text-center text-white">
                          {item.description}
                        </div>
                        <div className=" w-full text-white flex gap-10">
                          <div className="flex flex-col w-[50%]  h-full">
                            Activity:
                            <div className="w-full p-3">
                              {item.activity.map((item, index) => {
                                return (
                                  <div key={index} className="flex ">
                                    {item.emoji}
                                    {item.activityName}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div className="flex flex-col w-[50%]  h-full">
                            Accomodation
                            <div className="w-full p-3 ">
                              {item.accomodation}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-100 w-full  flex">
              <div className="flex-1 h-100 flex flex-col  items-center">
                <div
                  className="text-[50px] font-bold "
                  style={{ fontFamily: "Serif" }}
                >
                  About the Company
                </div>
                <div className="w-50 flex overflow-hidden items-center">
                  {item.companyId.AvatarImage == "" ||
                  item.companyId.AvatarImage == null ? (
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
                      className="w-full h-full object-cover rounded-2xl "
                      alt="Company background"
                    />
                  ) : (
                    <img
                      src={item.companyId.AvatarImage}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src =
                          "https://res.cloudinary.com/df60cobe2/image/upload/v1750318055/NoImage_q3vugq.jpg";
                      }}
                      className="w-full h-full object-cover rounded-2xl "
                      alt="Company background"
                    />
                  )}
                </div>
                <div className="text-[24px]">{item.companyId.email}</div>
              </div>
              <div className="flex-1 flex p-5 text-2xl font-light ">
                {item.companyId.about}
              </div>
              <div className="flex-1 flex flex-col items-center  p-5 text-[24px] gap-5">
                {item.companyId.since == 0 ||
                item.companyId.since == null ? null : (
                  <div className="w-full flex items-center justify-between ">
                    <div>Since:</div>
                    <div>{item.companyId.since}</div>
                  </div>
                )}
                <div className="w-full flex items-center justify-between ">
                  <div>Rating:</div>
                  <div className="flex gap-1 items-center">
                    <StarIcon />
                    {item.companyId.Rating}
                  </div>
                </div>{" "}
                <div className="w-full flex items-center justify-between ">
                  <div>Experience:</div>
                  <div className="flex gap-2">
                    {item.companyId.reviews}

                    <p>travellers</p>
                  </div>
                </div>{" "}
                <div className="w-full flex items-center justify-between ">
                  <div>Destinations:</div>

                  <div className="flex gap-2">
                    {item.companyId.availableDestinations.length}
                    <p>
                      {item.companyId.availableDestinations.length == 0 ||
                      item.companyId.availableDestinations.length == 1
                        ? "destination"
                        : "destinations"}
                    </p>
                  </div>
                </div>
                <div className="w-full flex items-center justify-between ">
                  <div>Social URL:</div>
                  <div>
                    {item.companyId.websiteURL == ""
                      ? item.companyId.email
                      : item.companyId.websiteURL}
                  </div>
                </div>
                <div className="w-full flex items-center justify-between ">
                  <div>Phonenumber:</div>
                  <div>+976 {item.companyId.phoneNumber}</div>
                </div>
              </div>
            </div>
            <div className="h-10"></div>
          </div>
        );
      })}
      <div>
        {location.map((_, index) => {
          return <div key={index}></div>;
        })}
      </div>
    </>
  );
}
