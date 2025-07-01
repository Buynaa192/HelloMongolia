export const TravelPlanHome = () => {
  return (
    <div className="w-full h-screen relative bg-linear-to-br from-red-500 to-40% to-black">
      <video
        className="absolute z-0 object-cover w-full h-full"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="https://res.cloudinary.com/df60cobe2/video/upload/v1750768843/ScreenRecording_06-24-2025_21_ran277.mov"
          type="video/mp4"
        />
      </video>
      <div className="absolute top-0 left-0 inset-0 w-full h-full bg-linear-to-t from-black to-100% flex items-end justify-center py-[120px]">
        <div className="flex flex-col w-[1440px] text-white">
          <div className="text-[48px] font-semibold leading-none">
            Beyond roads into
          </div>
          <div className="text-[100px] font-bold flex leading-none">
            {"MONGOLIA".split("").map((letter, i) => (
              <div key={i} className="duration-200 hover:text-red-500">
                {letter}
              </div>
            ))}
          </div>

          <p className="text-lg w-200 text-muted-foreground">
            Travel advisors have access to HelloMongolia’s network of the
            world’s best tour partners, and their expertise means your most
            memorable trips in Mongolia are yet to come – whenever you’re ready
            to take them.
          </p>
        </div>
      </div>
    </div>
  );
};
