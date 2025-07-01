"user client";
import { PackageType } from "@/app/_providers/AuthProvider";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
type ImageSlideHeadProps = {
  packageDetail: PackageType;
};
export const ImageSlideHead = ({ packageDetail }: ImageSlideHeadProps) => {
  const [carousel, setCarousel] = useState(0);
  if (!packageDetail) return null;
  return (
    <div className="w-full h-180 relative overflow-hidden ">
      <img
        src={
          packageDetail.packageItem[carousel].destinationId
            ?.destinationImages[0]
        }
        className="w-full h-full object-cover"
      />
      <div className=" w-full h-full  absolute inset-0 flex  packageDetails-end justify-between items-end border bg-linear-to-t from-black to-30%  ">
        <div className="w-[60%] h-fit flex flex-col  p-10 border ">
          <div className="text-white text-[50px] font-bold  w-full">
            <div>{packageDetail.title}</div>
          </div>
          <div
            className="text-[24px] text-white w-full font-semibold "
            style={{ fontFamily: "Orbitron" }}
          >
            {packageDetail.duration.includes("days")
              ? packageDetail.duration
              : `${packageDetail.duration} days `}
          </div>
          <div className="text-[20px] font-semibold">
            {packageDetail.description}
          </div>
        </div>
        <div className="flex items-center p-3">
          {" "}
          <Carousel className="w-full max-w-sm">
            <CarouselContent className="-ml-1">
              {packageDetail.packageItem.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                  onClick={() => setCarousel(index)}
                >
                  <div className="p-1">
                    <img src={item.destinationId?.destinationImages[0]} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};
