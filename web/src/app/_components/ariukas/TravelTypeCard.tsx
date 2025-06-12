import { Button } from "@/components/ui/button";
import Image from "next/image";

interface TravelTypeCardProps {
  title: string;
  imageSrc: string;
}

export const TravelTypeCard = ({ title, imageSrc }: TravelTypeCardProps) => {
  return (
    <div className="w-[150px] h-[300px] rounded-md overflow-hidden relative">
      <Image src={imageSrc} alt={title} fill className="object-cover" />

      <div className="absolute inset-0 flex flex-col justify-between items-center p-4">
        <p className="text-white text-2xl font-semibold text-center">{title}</p>
        <Button variant="secondary">EXPLORE</Button>
      </div>
    </div>
  );
};
