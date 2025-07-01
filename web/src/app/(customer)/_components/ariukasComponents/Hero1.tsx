"use cleint";

import { Hero1and2Props } from "../../page";
import { Hero1Text } from "./Hero1Text";

export const Hero1 = ({ radient, setRadient }: Hero1and2Props) => {
  return (
    <div className="relative w-full h-screen">
      <div className="relative flex flex-col w-full h-screen">
        <video
          className="absolute inset-0 z-0 object-cover w-full h-full"
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
        className="absolute bottom-0 left-0 w-full pointer-events-none h-130 "
        style={{
          background: `linear-gradient(to bottom, transparent, ${radient})`,
        }}
      />
    </div>
  );
};
