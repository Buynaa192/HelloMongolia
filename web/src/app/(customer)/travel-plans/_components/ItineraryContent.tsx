"user client";
import { PackageType } from "@/app/_providers/AuthProvider";
import { useRef } from "react";
type ItineraryContentProps = {
  packageDetail: PackageType;
};
export const ItineraryContent = ({ packageDetail }: ItineraryContentProps) => {
  const itineraryRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (index: number) => {
    const container = itineraryRef.current;
    if (container) {
      const section = container.children[index] as HTMLElement;
      const headerHeight = 60; // Adjust this if your header is taller
      const scrollToPosition = section.offsetTop - headerHeight;

      container.scrollTo({
        top: scrollToPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="w-full flex min-h-100 p-3 items-center  ">
      <div className="flex-1 pl-2 pr-2 flex flex-col relative ">
        <div className="w-full  ">
          <div className="w-full h-15 bg-[#000000] flex rounded-t-[8px]">
            {packageDetail.packageItem.map((_, index) => {
              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(index)}
                  className="flex-1 h-full flex items-center justify-center text-[24px] text-white font-bold hover:bg-[#ffffff] hover:text-black rounded-t-[7px] duration-300"
                >
                  Day {index + 1}
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={itineraryRef}
          className="w-full h-[500px] overflow-scroll scroll-smooth rounded-[8px]  "
        >
          {packageDetail.packageItem.map((packageItem, index) => (
            <div key={index} className={`w-[100%] h-[500px] relative `}>
              <img
                src={packageItem.image}
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
                  {packageItem.title} Day{index + 1}
                </div>
                <div
                  className="text-center text-white text-2xl"
                  style={{ fontFamily: "Dancing script" }}
                >
                  {packageItem.description}
                </div>
                <div className=" w-full text-white flex gap-10 justify-center">
                  <div className="flex flex-col w-50  h-full ">
                    Activity:
                    <div className="w-full p-3">
                      {packageItem.activity.map((item, index) => {
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
                      {packageItem.accommodation.hotelName},
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
