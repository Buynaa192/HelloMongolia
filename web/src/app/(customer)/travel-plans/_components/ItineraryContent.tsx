"use client";
import { PackageType } from "@/app/_providers/AuthProvider";
import { useRef, useState } from "react";

type ItineraryContentProps = {
  packageDetail: PackageType;
};

export const ItineraryContent = ({ packageDetail }: ItineraryContentProps) => {
  const itineraryRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState(0);

  const scrollToSection = (index: number) => {
    const container = itineraryRef.current;
    if (container) {
      const section = container.children[index] as HTMLElement;
      const scrollToPosition = section.offsetLeft;

      container.scrollTo({
        left: scrollToPosition,
        behavior: "smooth",
      });
      setSelectedDay(index);
    }
  };

  return (
    <div className="w-full flex min-h-100 p-3 items-center">
      <div className="flex-1"></div>
      <div className="flex-2 px-2 flex flex-col relative">
        <div className="w-full">
          <div className="w-full h-15 bg-[#000000] flex rounded-t-[8px] overflow-x-auto">
            {packageDetail.packageItem.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(index)}
                className={`flex-1 h-full px-4 flex items-center justify-center text-[18px] font-bold rounded-t-[7px] duration-300
                  ${
                    selectedDay === index
                      ? "bg-white text-black"
                      : "text-white hover:bg-gray-400 hover:text-black"
                  }`}
              >
                Day {index + 1}
              </button>
            ))}
          </div>
        </div>
        <div
          ref={itineraryRef}
          className="w-full h-[500px] overflow-hidden scroll-smooth whitespace-nowrap rounded-[8px] flex pointer-events-none"
        >
          {packageDetail.packageItem.map((packageItem, index) => (
            <div
              key={index}
              className="w-full min-w-full h-[500px] ml-2 relative inline-block pointer-events-auto"
            >
              <img
                src={packageItem.image}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src =
                    "https://res.cloudinary.com/df60cobe2/image/upload/v1750318124/NoImagePack_tyhsjd.png";
                }}
                alt="Image"
                className="w-full h-full object-cover object-left"
              />
              <div className="absolute w-full h-full bg-gradient-to-r from-[#000000b8] to-[#00000028] inset-0 p-4 flex flex-col items-center gap-4">
                <div
                  className="text-[50px] text-white font-bold"
                  style={{ fontFamily: "Dancing Script" }}
                >
                  {packageItem.title} Day {index + 1}
                </div>
                <div
                  className="text-center text-white text-2xl"
                  style={{ fontFamily: "Dancing Script" }}
                >
                  {packageItem.description}
                </div>
                <div className="w-full text-white flex gap-10 justify-center">
                  <div className="flex flex-col w-50 h-full">
                    Activity:
                    <div className="w-full p-3">
                      {packageItem.activity.map((item, index) => (
                        <div key={index} className="flex">
                          {item.emoji}
                          {item.activityName}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col w-50 h-full">
                    Accommodation
                    <div className="w-full p-3">
                      {packageItem.accommodation.hotelName},{" "}
                      {packageItem.accommodation.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
