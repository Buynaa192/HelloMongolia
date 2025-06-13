"use client";

const packages = {
  rating: 4.8,
  title: "Mongolia Exploration with Mongolian travel agency to Mongolia",
  duration: 4,
  coverPhoto: "/images/pack1.png",
  cost: 5001,
  company: {
    image: "/images/company.png",
    name: "AMICUS",
    socialURL: "www.AMICUS.com",
  },
  packageItems: [
    {
      image: "/images/pack1.png",
      destination: "Gobi dessert",
      activity: [
        "Camel riding",
        "Camel riding",
        "Camel riding",
        "Camel riding",
        "Camel riding",
      ],
    },
    {
      image: "/images/pack2.png",
      destination: "Knongor Sand Dunes",
      activity: [
        "Camel riding",
        "Camel riding",
        "Camel riding",
        "Camel riding",
        "Camel riding",
      ],
    },
    {
      image: "/images/pack3.png",
      destination: "Orkhon Valley",
      activity: [
        "Camel riding",
        "Camel riding",
        "Camel riding",
        "Camel riding",
        "Camel riding",
      ],
    },
    {
      image: "/images/pack4.png",
      destination: "Terelj",
      activity: [
        "Camel riding",
        "Camel riding",
        "Camel riding",
        "Camel riding",
        "Camel riding",
      ],
    },
    {
      image: "/images/pack3.png",
      destination: "Orkhon Valley",
      activity: [
        "Camel riding",
        "Camel riding",
        "Camel riding",
        "Camel riding",
        "Camel riding",
      ],
    },
  ],
  description:
    "This is the best tour of Mongolia, using private vehicle experiencing Mongolian Gobi desert, unique Eagle valley , Tsenkher hot spring, Erdenezuu monastery inscribed on the World Heritage List and other attractions of Mongolia only in 5 days.",
};

export default function PackagePage() {
  return (
    <div className="w-full text-black flex flex-col gap-4">
      <div
        className="w-full h-180 relative overflow-hidden 
      "
      >
        <div className="w-fit h-full flex animate-wiggle relative ">
          {packages.packageItems.map((item, index) => {
            return (
              <div key={index} className="w-[1440px]">
                <img
                  src={item.image}
                  key={index}
                  className="w-full h-full object-cover  "
                />
              </div>
            );
          })}
        </div>

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
      <div className="w-full flex min-h-100 p-3 items-center ">
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
              {packages.cost}{" "}
              <p className="text-[12px] h-full flex items-end">
                (cost per person)
              </p>
            </div>{" "}
          </div>
        </div>
        <div className="h-150 border-1 border-[#e4e4e5]"></div>

        <div className="flex-1 pl-2 pr-2 flex flex-col relative ">
          <div className="w-full  ">
            {" "}
            <div className="w-full h-15 bg-[#000000] flex rounded-t-[8px]">
              {packages.packageItems.map((item, index) => {
                return (
                  <a
                    key={index}
                    href={`#section${index + 1}`}
                    className="flex-1 h-full  flex items-center justify-center text-[24px] text-white font-bold hover:bg-[#ffffff] hover:text-black rounded-t-[7px] duration-300"
                  >
                    Day {index + 1}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="w-full h-[500px] overflow-scroll scroll-smooth rounded- ">
            <div
              className={`w-full h-[calc(100%_*_${packages.packageItems.length})]`}
            >
              {packages.packageItems.map((item, index) => (
                <div key={index} className={`w-full h-[500px] relative`}>
                  <img
                    src={item.image}
                    id={`section${index + 1}`}
                    className="w-full h-full object-cover object-left"
                  />
                  <div className="absolute w-[50%] h-full bg-linear-to-r from-[#000000b8] to-100%  to-[#00000028] inset-0 p-4 flex flex-col items-center justify-center gap-4">
                    <div
                      className="text-[40px] text-white font-bold"
                      style={{ fontFamily: "Dancing Script" }}
                    >
                      {item.destination} Day{index + 1}
                    </div>
                    <div className="text-center text-white">
                      This is the best tour of Mongolia, using private vehicle
                      experiencing Mongolian Gobi desert, unique Eagle valley ,
                      Tsenkher hot spring, Erdenezuu monastery inscribed on the
                      World Heritage List and other attractions of Mongolia only
                      in 10 days.
                    </div>
                    <div className=" w-full text-white flex gap-10">
                      <div className="flex flex-col w-[50%]  h-full">
                        Activity{" "}
                        <div className="w-full p-3">
                          {item.activity.map((item, index) => {
                            return <div key={index}>• {item}</div>;
                          })}
                        </div>
                      </div>
                      <div className="flex flex-col w-[50%]  h-full">
                        Accomodation
                        <div className="w-full p-3 ">
                          Ymar negen hotel or ger.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-100 w-full  flex">
        <div className="flex-1 h-100 flex flex-col justify-center items-center">
          <div
            className="text-[50px] font-bold "
            style={{ fontFamily: "Serif" }}
          >
            About the Company
          </div>
          <div className="w-full flex overflow-hidden ">
            <img
              src={packages.company.image}
              className="w-full h-full object-cover  "
            />
          </div>
        </div>
        <div className="flex-1 flex p-5 text-2xl font-light ">
          Amicus Travel Mongolia, founded in 2011, is a certified and
          eco‑focused tour operator offering customizable, expert-led journeys
          across Mongolia. Known for stellar guides, attentive service, and
          sustainable travel experiences, they consistently deliver
          unforgettable adventures.
        </div>
        <div className="flex-1 flex flex-col items-center  p-5 text-[24px] gap-5">
          <div className="w-full flex items-center justify-between ">
            <div>Since:</div>
            <div>2010</div>
          </div>
          <div className="w-full flex items-center justify-between ">
            <div>Rating:</div>
            <div className="flex gap-1 items-center">
              <img src={"/images/star.png"} className="w-10 h-10" />
              {packages.rating}
            </div>
          </div>{" "}
          <div className="w-full flex items-center justify-between ">
            <div>Experience:</div>
            <div>60k travellers</div>
          </div>{" "}
          <div className="w-full flex items-center justify-between ">
            <div>Destinations:</div>
            <div>+20 destinations</div>
          </div>
        </div>
      </div>
      <div className="h-10"></div>
    </div>
  );
}
