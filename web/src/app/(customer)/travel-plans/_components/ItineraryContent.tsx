// "use client";
// import { PackageType } from "@/app/_providers/AuthProvider";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { useRef, useState, useEffect } from "react";

// type ItineraryContentProps = {
//   packageDetail: PackageType;
// };

// export const ItineraryContent = ({ packageDetail }: ItineraryContentProps) => {
//   const itineraryRef = useRef<HTMLDivElement>(null);
//   const [selectedDay, setSelectedDay] = useState(0);

//   useEffect(() => {
//     const container = itineraryRef.current;
//     if (!container) return;

//     const section = container.children[selectedDay] as HTMLElement;
//     if (section) {
//       section.scrollIntoView({
//         behavior: "smooth",
//         inline: "start",
//         block: "nearest",
//       });
//     }
//   }, [selectedDay]);
//   console.log("packageDetail", packageDetail);

//   return (
//     <div className="w-full flex flex-col  p-4  ">
//       <div className="w-full bg-black flex overflow-x-auto rounded-t-md">
//         {packageDetail.packageItem.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setSelectedDay(index)}
//             className={`flex-1 min-w-[120px] px-4 py-2 text-lg font-semibold transition rounded-t-md
//               ${selectedDay === index ? "bg-white text-black" : "text-white hover:bg-gray-600"}`}
//           >
//             Day {index + 1}
//           </button>
//         ))}
//       </div>

//       <div ref={itineraryRef} className="w-full h-[600px] overflow-x-hidden scroll-smooth whitespace-nowrap flex rounded-b-md">
//         {packageDetail.packageItem.map((packageItem, index) => (
//           <div key={index} className="min-w-full h-full grid grid-cols-2 pointer-events-auto scroll-snap-align-start">
//             <div>
//               {packageItem.destinationId?.destinationImages.map((item, index) => {
//                 return (
//                   <div key={index} className="">
//                     <Image src={item} width={500} height={500} alt="Destination Image" className="w-full h-full object-cover" />
//                   </div>
//                 );
//               })}
//             </div>
//             <div className=" inset-0 bg-gradient-to-r from-black/80 to-black/20 p-6 flex flex-col justify-center items-center gap-6 text-white">
//               <h2 className="text-4xl font-bold text-center">
//                 {packageItem.title} – Day {index + 1}
//               </h2>

//               <div className=" p-4 rounded-md max-w-2xl text-xl leading-relaxed text-center whitespace-pre-line overflow-auto max-h-[150px] ">
//                 {packageItem.description}
//               </div>
//               <div className="">
//                 <p>{packageItem.destinationId?.destinationName}</p>
//               </div>
//               <div className="w-full max-w-5xl flex flex-wrap gap-8 justify-center mt-4">
//                 <div className="flex flex-col  bg-black/30 rounded-md p-4">
//                   <h3 className="text-xl font-bold mb-2">Activities:</h3>
//                   <div className="flex gap-2">
//                     {packageItem.activity.map((item, idx) => (
//                       <Button key={idx} className="flex items-center gap-2 text-white/90">
//                         <span>{item.emoji}</span>
//                         <span>{item.activityName}</span>
//                       </Button>
//                     ))}
//                   </div>
//                 </div>

//                 {packageItem.accommodation?.address && (
//                   <div className="flex flex-col w-[250px] bg-black/30 rounded-md p-4">
//                     <h3 className="text-xl font-bold mb-2">Accommodation</h3>
//                     <p className="font-semibold">{packageItem.accommodation.hotelName}</p>
//                     <p className="text-sm text-white/70">{packageItem.accommodation.address}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackageType } from "@/app/_providers/AuthProvider";

type Props = {
  packageDetail: PackageType;
};

export const ItineraryContent = ({ packageDetail }: Props) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const packageItem = packageDetail.packageItem[selectedDay];
  const images = packageItem.destinationId?.destinationImages || [];

  const handleNextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const handlePrevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  console.log("asdasd", packageDetail);
  return (
    <div className="w-full flex flex-col items-center p-6 ">
      <h1 className="text-3xl font-bold mb-2">{packageDetail.title}</h1>
      <p className="text-gray-600 mb-6">
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
            className={`px-4 py-2 rounded-md text-sm font-medium border ${selectedDay === idx ? "bg-white text-black border-gray-300" : "bg-black text-white"}`}
          >
            Day {idx + 1}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl ">
        <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          {images.length > 0 ? (
            <>
              <Image src={images[currentImage]} width={600} height={400} alt="Itinerary image" className="object-cover w-full h-full" />
              <button onClick={handlePrevImage} className="absolute left-3 bg-black/50 text-white p-2 rounded-full">
                <ChevronLeft />
              </button>
              <button onClick={handleNextImage} className="absolute right-3 bg-black/50 text-white p-2 rounded-full">
                <ChevronRight />
              </button>
            </>
          ) : (
            <p className="text-gray-400">No images</p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">
            {packageItem.title} - Day {selectedDay + 1}
          </h2>
          <p className="text-gray-600 font-semibold text-2xl">{packageItem.destinationId?.destinationName} </p>
          <p className="text-sm">{packageItem.description}</p>

          <div>
            <h3 className="font-semibold mb-2">Activities:</h3>
            <div className="flex flex-col gap-1">
              {packageItem.activity.map((act, i) => (
                <div key={i} className="flex justify-between items-center bg-green-50 text-green-800 px-3 py-1 rounded-md">
                  <span className="flex items-center gap-2">
                    {act.emoji} {act.activityName}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {packageItem.destinationId?.destinationName && (
            <div>
              <h3 className="font-semibold mt-4 mb-2">Highlights:</h3>
              <div className="flex gap-2 flex-wrap">
                {(packageItem.destinationId.destinationName || "").split(" ").map((word, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-md">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}

          {packageItem.accommodation?.hotelName && (
            <div>
              <h3 className="font-semibold mt-4 mb-1">Accommodation:</h3>
              <p className="text-sm">{packageItem.accommodation.hotelName}</p>
              <p className="text-xs text-gray-500">{packageItem.accommodation.address}</p>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button onClick={() => setSelectedDay((prev) => Math.max(prev - 1, 0))} disabled={selectedDay === 0}>
              Previous Day
            </Button>
            <span className="text-sm text-gray-500">
              Day {selectedDay + 1} of {packageDetail.packageItem.length}
            </span>
            <Button
              onClick={() => setSelectedDay((prev) => Math.min(prev + 1, packageDetail.packageItem.length - 1))}
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
