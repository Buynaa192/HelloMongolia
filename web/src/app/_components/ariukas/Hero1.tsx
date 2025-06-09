import Image from "next/image";

import Hero1Text from "./Hero1Text";

export const Hero1 = () => {
  return (
    <div className="relative h-screen w-full">
      <div className="relative w-full h-screen flex flex-col">
        <Image
          src="/images/ariukasImages/sky.jpg"
          alt="Mongolian ger"
          fill
          className="object-cover"
          priority
        />
        <Hero1Text />
      </div>
      <div
        className="absolute bottom-0 left-0 w-full h-130 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, white)",
        }}
      />
    </div>
  );
};
