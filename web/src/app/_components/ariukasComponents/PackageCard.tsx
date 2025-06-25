import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

import { PackageType } from "@/app/_providers/AuthProvider";

export const PackageCard = ({ trip }: { trip: PackageType }) => {
  return (
    <Card className="relative text-white h-full max-h-3xl  min-w-[200px] min-h-[550px] w-full max-w-4xl shadow-xl ">
      <Image src={trip.coverPhoto} alt="nature photo" fill className="object-cover " priority />

      <CardContent className="relative z-10 flex flex-col justify-between h-full text-center md:text-start "></CardContent>
    </Card>
  );
};
