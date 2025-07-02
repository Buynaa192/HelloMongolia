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
      <div className=" w-full h-full  absolute inset-0 flex  packageDetails-end justify-between items-end  bg-linear-to-t from-black to-30%  ">
        <div className="w-[60%] h-fit flex flex-col  p-10 ">
          <div className="text-white text-[50px] font-bold  w-full">
            <div>{packageDetail.title}</div>
          </div>
          <div className="text-[24px] text-white w-full font-semibold ">
            {packageDetail.packageItem.length} days
          </div>
        </div>
        <div className="flex items-center p-3 right-10 relative">
          <Carousel className="w-full max-w-150">
            <CarouselPrevious className="bg-black" />
            <CarouselContent className="-ml-1 ">
              {packageDetail.packageItem.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                  onClick={() => setCarousel(index)}
                >
                  <div className={`p-1 w-full h-full `}>
                    <img
                      src={item.destinationId?.destinationImages[0]}
                      className={`rounded-[10px] h-full w-full hover:scale-[105%] duration-200  ${
                        carousel == index ? "border-3 p-1 rounded-4xl" : ""
                      }`}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="bg-black" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};
