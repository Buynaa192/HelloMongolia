"use client";

import {
  LocationType,
  PackageItemType,
  PackageType,
} from "@/app/_providers/AuthProvider";
import BasicGoogleMapWithDirections from "@/app/maptest/_component/PackageGoogleMap";
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
  const [location, setLocation] = useState<
    { name: string; location: LocationType; photoUrl?: string }[]
  >([]);

  console.log("package hevlej bna", packages);
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await api.get(`/package?packageId=${id}`);
        setPackage(res.data.packages);

        const allLocations = res.data.packages.flatMap(
          (pkg: PackageType) =>
            pkg.packageItem
              .map((item: PackageItemType) => {
                const dest = item.destinationId;
                if (dest?.location && dest.destinationName) {
                  return {
                    name: dest.destinationName,
                    location: dest.location,
                    photoUrl:
                      dest.destinationImages &&
                      dest.destinationImages.length > 0
                        ? dest.destinationImages[0]
                        : undefined,
                  };
                }
                return null;
              })
              .filter((el) => el !== null) as {
              name: string;
              location: LocationType;
              photoUrl?: string;
            }[]
        );

        setLocation(allLocations);
      } catch (err) {
        console.error("Failed to fetch packages", err);
      }
    };

    fetchPackage();
  }, []);
  console.log("loc", location);
  return (
    <>
      {packages.map((item, index) => {
        return (
          <div
            key={index}
            className="w-full flex flex-col gap-4 bg-transparent text-accent "
          >
            <div className="w-full h-180 relative overflow-hidden ">
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
                <div className="w-[60%] h-fit flex flex-col  p-10 ">
                  <div className="text-white text-[50px] font-bold  w-full">
                    <div>{item.title}</div>
                  </div>
                  <div
                    className="text-[24px] text-white w-full font-semibold "
                    style={{ fontFamily: "Orbitron" }}
                  >
                    {item.duration.includes("days")
                      ? item.duration
                      : `${item.duration} days `}
                  </div>
                  <div className="text-[20px] font-semibold">
                    {item.description}
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
            <div className="bg-transparent w-full p-2 gap-2 flex">
              <Link href={"/"}> Home</Link> <span>{">"}</span>
              <Link href={"/travel-plans"}> Explore tour</Link>
              <span>{">"}</span>
              {item.title}
            </div>{" "}
            <div
              className="text-[50px] font-bold"
              style={{ fontFamily: "Dancing Script" }}
            >
              Itinerary
            </div>
            <div className="w-full border-1 border-[#e4e4e5]"></div>
            <div className="w-full flex min-h-100 p-3 items-center  ">
              <div className="flex-1 pl-2 pr-2 flex flex-col relative ">
                <div className="w-full  ">
                  <div className="w-full h-15 bg-[#000000] flex rounded-t-[8px]">
                    {item.packageItem.map((_, index) => {
                      return (
                        <a
                          key={index}
                          href={`#section${index + 1}`}
                          className="flex-1 h-full  flex items-center justify-center text-[24px] text-white font-bold hover:bg-[#ffffff] hover:text-black rounded-t-[7px] duration-300 "
                        >
                          Day {index + 1}
                        </a>
                      );
                    })}
                  </div>
                </div>

                <div className="w-full h-[500px] overflow-scroll scroll-smooth rounded-[8px]  ">
                  {item.packageItem.map((it, index) => (
                    <div key={index} className={`w-[100%] h-[500px] relative `}>
                      <img
                        src={it.image}
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
                      <div className="absolute w-[50%] h-full bg-linear-to-r from-[#000000b8] to-100%  to-[#00000028] inset-0 p-4 flex flex-col items-center  gap-4 ">
                        <div
                          className="text-[50px] text-white font-bold"
                          style={{ fontFamily: "Dancing Script" }}
                        >
                          {it.title} Day{index + 1}
                        </div>
                        <div
                          className="text-center text-white text-2xl"
                          style={{ fontFamily: "Dancing script" }}
                        >
                          {it.description}
                        </div>
                        <div className=" w-full text-white flex gap-10 justify-center">
                          <div className="flex flex-col w-50  h-full ">
                            Activity:
                            <div className="w-full p-3">
                              {it.activity.map((item, index) => {
                                return (
                                  <div key={index} className="flex ">
                                    {item.emoji}
                                    {item.activityName}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div className="flex flex-col w-50  h-full ">
                            Accomodation
                            <div className="w-full p-3 ">
                              {it.accommodation.hotelName},
                              {it.accommodation.address}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
                    {item.description}
                  </div>
                  <div className="flex flex-col  flex-1 text-[14px] gap-2 font-bold pr-6 pt-2">
                    <div className="flex gap-4 w-full h-5 items-center flex-1 text-2xl justify-between">
                      <div className="flex items-center gap-2">
                        {" "}
                        Duration
                        <DurationIcon />:
                      </div>

                      <div>
                        {item.duration.includes("days")
                          ? `${item.duration}`
                          : `${item.duration}days`}{" "}
                      </div>
                    </div>
                    <div className="flex gap-4 w-full  flex-1 text-2xl justify-between">
                      <div className="flex items-center gap-2">
                        {" "}
                        Rating
                        <StarIcon />:
                      </div>
                      <div>{item.rating}</div>
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
                        ${item.cost}
                      </div>
                    </div>
                    <div className="flex gap-2 h-5 w-full  items-center text-2xl font-bold  flex-1 justify-between">
                      TripType:<div>{item.tripType}</div>
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
                        className="w-full h-45 rounded-2xl  bg-gray-500  "
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
                        className="w-full h-45 rounded-2xl bg-gray-500  "
                        alt="Company background"
                      />
                    )}
                  </div>
                  <div className="text-[18px] font-bold">
                    {item.companyId.name}
                  </div>
                </div>

                <div className=" w-300 flex flex-col  text-[18px] gap-3 font-medium ">
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
                      {item.companyId.availableDestinations?.length}
                      <p>
                        {item.companyId.availableDestinations.length == 0 ||
                        item.companyId.availableDestinations.length == 1
                          ? "destination"
                          : "destinations"}
                      </p>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between ">
                    <div className="w-25">Social URL:</div>
                    <div>
                      {item.companyId.websiteURL == ""
                        ? item.companyId.email
                        : item.companyId.websiteURL}
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-2">
                    <div>Phonenumber:</div>
                    <div>{item.companyId.phoneNumber}</div>
                  </div>
                  <div className="w-full flex items-center justify-between gap-2">
                    <div>Email:</div>
                    <div>{item.companyId.email}</div>
                  </div>
                </div>
                <div>
                  <div className="w-full h-[80%] overflow-hidden">
                    {item.companyId.about}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div>
        <div
          className="text-accent text-4xl font-extrabold"
          style={{ fontFamily: "Dancing script" }}
        >
          Destinations in MAP
        </div>
        <BasicGoogleMapWithDirections markers={location} />
      </div>
    </>
  );
}
