"use cleint";

import { HeaderRadientDeco } from "./HeaderRadientDeco";
import { Hero1Text } from "./Hero1Text";
import { Hero1and2Props } from "@/app/page";

export const Hero1 = ({ radient, setRadient }: Hero1and2Props) => {
  return (
    <div className="relative h-screen w-full">
      <HeaderRadientDeco />
      <div className="relative w-full h-screen flex flex-col">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://res.cloudinary.com/df60cobe2/video/upload/v1750320997/855785-hd_1920_1080_24fps_pnp6xn.mp4"
            type="video/mp4"
          />
        </video>
        <Hero1Text setRadient={setRadient} />
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-130 pointer-events-none "
        style={{
          background: `linear-gradient(to bottom, transparent, ${radient})`,
        }}
      />
    </div>
  );
};
