"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackageType } from "@/app/_providers/AuthProvider";

type Props = {
  packageDetail: PackageType;
};

export const ItineraryContent = ({ packageDetail }: Props) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const packageItem = packageDetail.packageItem[selectedDay];
  const images = packageItem.destinationId?.destinationImages || [
    "https://res.cloudinary.com/df60cobe2/image/upload/v1750665598/BwZffaCuXymfwk81JeptqEwnRzkQPEXF1Wrv3rbY_520_350_bovkis.jpg",
    "https://res.cloudinary.com/df60cobe2/image/upload/v1750665589/VIQtCstVCthMbWBgT9rqVdd8De4wpbaJyWfGqCCB_520_350_kuxh88.jpg",
  ];

  const handleNextImage = () =>
    setCurrentImage((prev) => (prev + 1) % images.length);

  const handlePrevImage = () =>
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="w-full flex flex-col items-center p-6 bg-white/5 border border-white/40 rounded-xl ">
      <h1 className="text-3xl font-medium mb-2">{packageDetail.title}</h1>
      <p className="text-white/80 text-lg font-normal mb-6">
        {packageDetail.duration} day - {packageDetail.tripType}
      </p>

      <div className="flex gap-2 mb-6">
        {packageDetail.packageItem.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedDay(idx);
              setCurrentImage(0);
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium border ${
              selectedDay === idx
                ? "bg-white text-black border-gray-300"
                : "bg-black text-white"
            }`}
          >
            Day {idx + 1}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl ">
        <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          {images.length > 0 ? (
            <>
              <Image
                src={images[currentImage]}
                width={600}
                height={400}
                alt="Itinerary image"
                className="object-cover w-full h-full"
              />
              <button
                onClick={handlePrevImage}
                className="absolute left-3 bg-black/50 text-white p-2 rounded-full"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-3 bg-black/50 text-white p-2 rounded-full"
              >
                <ChevronRight />
              </button>
            </>
          ) : (
            <p className="text-gray-300">No images</p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-medium border-b pb-3 border-white/40">
            {packageItem.title} - Day {selectedDay + 1}
          </h2>
          <p className="text-white font-semibold text-3xl">
            {packageItem.destinationId?.destinationName}{" "}
          </p>
          <p className="text-sm text-white/80 italic">
            {packageItem.description}
          </p>

          <div className="">
            <h2 className="font-semibold text-xl mb-3 ">Activities</h2>
            <div className="flex flex-wrap sm:grid-cols-3 gap-3 text-gray-700 ">
              {packageItem.activity.map((item, indx) => (
                <Button
                  key={indx}
                  className="flex  items-center gap-2 bg-white hover:bg-white/80 text-black p-2 rounded-md shadow-sm "
                >
                  <span className="text-lg">{item.emoji}</span>
                  <span>{item.activityName}</span>
                </Button>
              ))}
            </div>
          </div>

          {packageItem.accommodation?.hotelName && (
            <div>
              <h3 className="font-semibold text-xl mb-2">Accommodation:</h3>
              <div className="flex gap-4 items-center">
                <p className="text-lg">{packageItem.accommodation.hotelName}</p>
                <div className="flex gap-1 items-center text-sm text-white/80">
                  <MapPin size={16} /> {packageItem.accommodation.address}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-6">
            <Button
              variant={"secondary"}
              onClick={() => setSelectedDay((prev) => Math.max(prev - 1, 0))}
              disabled={selectedDay === 0}
            >
              Previous Day
            </Button>
            <span className="text-sm text-gray-100">
              Day {selectedDay + 1} of {packageDetail.packageItem.length}
            </span>
            <Button
              variant={"secondary"}
              onClick={() =>
                setSelectedDay((prev) =>
                  Math.min(prev + 1, packageDetail.packageItem.length - 1)
                )
              }
              disabled={selectedDay === packageDetail.packageItem.length - 1}
            >
              Next Day
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
