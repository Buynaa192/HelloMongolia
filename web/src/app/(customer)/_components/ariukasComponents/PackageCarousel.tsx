import { PackageCardForCompany } from "./PackageCardForCompany";
import { PackageType } from "@/app/_providers/AuthProvider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const PackageCarousel = ({ packages }: { packages: PackageType[] }) => {
  return (
    <Carousel className="relative w-full">
      <CarouselContent className="flex overflow-hidden">
        {packages.map((pack, i) => (
          <CarouselItem
            key={i}
            className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2"
          >
            <PackageCardForCompany pkg={pack} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white cursor-pointer">
        ‹
      </CarouselPrevious>
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white cursor-pointer">
        ›
      </CarouselNext>
    </Carousel>
  );
};
