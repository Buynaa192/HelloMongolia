import Image from "next/image";

export const Hero2 = () => {
  return (
    <div className="relative h-screen w-full">
      <div
        className="absolute top-0 left-0 w-full h-70 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, transparent, white)",
        }}
      />
      <div className="relative w-full h-screen flex flex-col">
        <Image
          src="/images/ariukasImages/Mongolgerdrone.jpg"
          alt="Mongolian ger"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};
