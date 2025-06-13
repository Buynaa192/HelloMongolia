import Image from "next/image";
import { HomePageTitle } from "./HomePageTitle";
import { ScrollTypes } from "./ScrollTypes";

export const ChooseTravelType = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <HomePageTitle title="TAILORED TRAVELS" />

      <div className="w-full h-full relative flex items-center justify-center overflow-hidden">
        <Image
          src="/images/ariukasImages/blackmts.jpg"
          alt="backgroundSky"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute top-0 left-0 w-full md:h-80 h-120 pointer-events-none z-10"
          style={{
            background: "linear-gradient(to top, transparent, black)",
          }}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="w-full h-full z-20 flex items-center justify-center">
          <ScrollTypes />
        </div>
      </div>
    </div>
  );
};
