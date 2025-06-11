export const TravelPlanHome = () => {
  return (
    <div className="w-full h-230 relative bg-linear-to-br from-red-500 to-40% to-black">
      <img src={"/images/BG.png"} className="w-full h-full" />
      <div className="absolute  inset-0 text-white flex flex-col items-center justify-center w-full h-full ">
        <div className="text-[80px] " style={{ fontFamily: "Dancing Script" }}>
          BEYOND ROADS
        </div>
        <div className="text-[80px]" style={{ fontFamily: "Dancing Script" }}>
          INTO
        </div>
        <div className="text-[200px] font-bold flex  ">
          {"WONDER".split("").map((letter, i) => (
            <div key={i} className="hover:text-red-500 duration-200">
              {letter}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-10">
          <div className="text-[24px] font-semibold">Search in Mongolia</div>
          <p className="text-center w-200 text-[16px]">
            Travel advisors have access to Virtuoso’s network of the world’s
            best tour partners, and their expertise means your most memorable
            trips are yet to come – whenever you’re ready to take them.
          </p>
        </div>
      </div>
    </div>
  );
};
