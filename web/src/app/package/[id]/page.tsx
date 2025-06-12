const packages = {
  rating: 4.8,
  title: "Mongolia Exploration with Mongolian travel agency to Mongolia",
  duration: 5,
  coverPhoto: "/images/pack1.png",
  cost: 5001,
  company: {
    image: "/images/company.png",
    name: "AMICUS",
    socialURL: "www.AMICUS.com",
  },
  packageItems: [
    { image: "/images/pack1.png" },
    { image: "/images/pack2.png" },
    { image: "/images/pack3.png" },
    { image: "/images/pack4.png" },
    { image: "/images/pack1.png" },
  ],
  description:
    "This is the best tour of Mongolia, using private vehicle experiencing Mongolian Gobi desert, unique Eagle valley , Tsenkher hot spring, Erdenezuu monastery inscribed on the World Heritage List and other attractions of Mongolia only in 5 days.",
};

export default function PackagePage() {
  return (
    <div className="w-full text-black flex flex-col gap-4">
      <div className="w-full h-180 relative ">
        <img src={"/images/pack4.png"} className="w-full h-full object-cover" />
        <div className=" w-full h-full  absolute inset-0 flex  items-end justify-between bg-linear-to-tr from-black to-100% ">
          <div className="w-[60%] h-[60%] flex flex-col items-center p-10 gap-10">
            <div className="text-white text-[50px] font-bold ">
              {packages.title}
            </div>
            <div
              className="text-[16px] text-white w-full font-semibold "
              style={{ fontFamily: "Orbitron" }}
            >
              {packages.duration} days • Gobi dessert • Orkhon Valley •
              Erdenezuu Monastery
            </div>
          </div>
          <div className="w-50 h-full flex flex-col items-center justify-around ">
            {packages.packageItems.slice(0, 5).map((item, index) => {
              return (
                <div key={index} className="w-full  h-[calc(100%/5)] p-3">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="p-3">Home | Explore tour | {packages.title} </div>
      <div className="w-full border-1 border-violet-600 flex min-h-100 p-3 ">
        <div className="flex flex-col w-100">
          <div className="w-full flex flex-col gap-4">
            <div className="text-[24px] font-bold">Trip Overview:</div>
            <div className="flex flex-col gap-2">
              <div>Tour by:</div>
              <div className="flex w-full h-10 gap-4">
                <img
                  src={packages.company.image}
                  className="w-10 h-full rounded-[40px] object-cover border-1 border-black"
                />
                <div className="flex flex-col h-full justify-center">
                  <div className="text-[20px] font-bold">
                    {packages.company.name}
                  </div>
                  <div className="text-[12px]">
                    {packages.company.socialURL}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-black text-">{packages.description}</div>
            <div className="flex flex-col w-full text-[14px] gap-2">
              <div className="flex gap-4 w-full h-5">
                <img src={"/images/time (1).png"} className="h-full" />
                <div>{packages.duration} days</div>
              </div>
              <div className="flex gap-4 w-full h-5">
                <img src={"/images/badge (1).png"} className="h-full" />
                <div className="flex">
                  <img src={"/images/star.png"} /> {packages.rating}
                </div>
              </div>
              <div className="flex gap-4 w-full h-5  ">
                <div className="flex gap-2 h-5">
                  <img src={"/images/hiking.png"} className="h-full " />
                  <div className="flex">Hiking</div>
                </div>{" "}
                •{" "}
                <div className="flex gap-2 h-5">
                  <img src={"/images/horseriding (1).png"} className="h-full" />
                  <div className="flex">Horseriding</div>
                </div>{" "}
                •{" "}
                <div className="flex gap-2 h-5">
                  <img src={"/images/pillar (1).png"} className="h-full" />
                  <div className="flex">Culture , history</div>
                </div>{" "}
              </div>
            </div>
            <div className="flex gap-2 h-5 w-full pl-1 items-center text-2xl font-bold">
              <img src={"/images/money (1).png"} className="h-full " />$
              {packages.cost}
            </div>{" "}
          </div>
        </div>
        <div className="h-100 border-1 border-[#e4e4e5]"></div>

        <div className="flex-1 pl-2 pr-2 flex flex-col relative ">
          <div className="w-full absolute inset-0 pl-2 pr-2 ">
            {" "}
            <div className="w-full h-15 border flex">
              {packages.packageItems.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex-1 h-full border flex items-center justify-center text-[24px]"
                  >
                    Day {index + 1}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full flex-1 border overflow-scroll">
            {packages.packageItems.map((item, index) => (
              <div key={index} className="w-full h-full">
                <img
                  src={item.image}
                  alt={`Package item ${index}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-100"></div>
    </div>
  );
}
