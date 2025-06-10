export const TravelPlanHome = () => {
  return (
    <div className="w-full h-full relative ">
      <img src={"/images/BG.png"} className="w-full h-full" />
      <div className="absolute  inset-0 text-white flex flex-col items-center justify-center w-full h-full  ">
        <div className="text-[80px] ">BEYOND ROADS</div>
        <div className="text-[80px]">INTO</div>
        <div className="text-[200px] font-bold flex ">
          <div className="hover:text-red-500 duration-200">W</div>
          <div className="hover:text-red-500 duration-200">O</div>
          <div className="hover:text-red-500 duration-200">N</div>
          <div className="hover:text-red-500 duration-200">D</div>
          <div className="hover:text-red-500 duration-200">E</div>
          <div className="hover:text-red-500 duration-200">R</div>
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
