"use client";
import { PackageType } from "@/app/_providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";

type ItineraryContentProps = {
  packageDetail: PackageType;
};

export const ItineraryContent = ({ packageDetail }: ItineraryContentProps) => {
  const itineraryRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState(0);

  // Scroll to selected day whenever selectedDay changes
  useEffect(() => {
    const container = itineraryRef.current;
    if (!container) return;

    const section = container.children[selectedDay] as HTMLElement;
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest", // <-- prevents vertical scrolling
      });
    }
  }, [selectedDay]);

  return (
    <div className="w-full flex flex-col  p-4  ">
      {/* Tabs */}
      <div className="w-full bg-black flex overflow-x-auto rounded-t-md">
        {packageDetail.packageItem.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedDay(index)}
            className={`flex-1 min-w-[120px] px-4 py-2 text-lg font-semibold transition rounded-t-md
              ${
                selectedDay === index
                  ? "bg-white text-black"
                  : "text-white hover:bg-gray-600"
              }`}
          >
            Day {index + 1}
          </button>
        ))}
      </div>

      {/* Itinerary Sections */}
      <div
        ref={itineraryRef}
        className="w-full h-[600px] overflow-x-hidden scroll-smooth whitespace-nowrap flex rounded-b-md"
      >
        {packageDetail.packageItem.map((packageItem, index) => (
          <div
            key={index}
            className="min-w-full h-full relative inline-block pointer-events-auto scroll-snap-align-start"
          >
            {/* Background Image */}
            <img
              src={packageItem.image}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src =
                  "https://res.cloudinary.com/df60cobe2/image/upload/v1750665598/BwZffaCuXymfwk81JeptqEwnRzkQPEXF1Wrv3rbY_520_350_bovkis.jpg";
              }}
              alt="Itinerary Image"
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20 p-6 flex flex-col justify-center items-center gap-6 text-white">
              {/* Title */}
              <h2 className="text-4xl font-bold text-center">
                {packageItem.title} – Day {index + 1}
              </h2>

              {/* Description */}
              <div className=" p-4 rounded-md max-w-2xl text-xl leading-relaxed text-center whitespace-pre-line overflow-auto max-h-[150px] ">
                {packageItem.description}
              </div>

              <div className="w-full max-w-5xl flex flex-wrap gap-8 justify-center mt-4">
                {/* Activities */}
                <div className="flex flex-col  bg-black/30 rounded-md p-4">
                  <h3 className="text-xl font-bold mb-2">Activities:</h3>
                  <div className="flex gap-2">
                    {packageItem.activity.map((item, idx) => (
                      <Button
                        key={idx}
                        className="flex items-center gap-2 text-white/90"
                      >
                        <span>{item.emoji}</span>
                        <span>{item.activityName}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {packageItem.accommodation?.address && (
                  <div className="flex flex-col w-[250px] bg-black/30 rounded-md p-4">
                    <h3 className="text-xl font-bold mb-2">Accommodation</h3>
                    <p className="font-semibold">
                      {packageItem.accommodation.hotelName}
                    </p>
                    <p className="text-sm text-white/70">
                      {packageItem.accommodation.address}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
