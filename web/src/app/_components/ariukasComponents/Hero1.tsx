import { Hero1Text } from "./Hero1Text";

export const Hero1 = () => {
  return (
    <div className="relative h-screen w-full">
      <div className="relative w-full h-screen flex flex-col">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="/images/ariukasImages/855785-hd_1920_1080_24fps.mp4"
            type="video/mp4"
          />
        </video>
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
