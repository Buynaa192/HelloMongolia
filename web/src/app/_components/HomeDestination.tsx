type ShowRegion = {
  videoSource: string;
  regionName: string;
};

export const ShowRegion = ({ videoSource, regionName }: ShowRegion) => {
  return (
    <div className="w-full h-[250px] flex justify-center items-center relative hover:justify-start hover:font-bold">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videoSource} type="video/mp4" />
      </video>

      <div className="w-full h-full absolute bg-black/50 hover:bg-black/20"></div>
      <div className="absolute inset-0 flex justify-center items-center">
        <p className="md:text-4xl text-3xl text-white ">{regionName}</p>
      </div>
    </div>
  );
};
