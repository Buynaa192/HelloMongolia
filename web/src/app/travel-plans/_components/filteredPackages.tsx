const packages = [
  {
    rating: 4.8,
    title: "Best Of Gobi in 12 days",
    duration: 12,
    image: "/images/pack1.png",
    cost: "$5001",
    company: "MongolianTravel",
  },

  {
    rating: 4.8,
    title: "Best Of Gobi in 12 days",
    duration: 12,
    image: "/images/pack2.png",
    company: "MongolianTravel",
    cost: "$5002",
  },
  {
    title: "Best Of Gobi in 12 days",
    rating: 4.8,
    duration: 12,
    image: "/images/pack3.png",
    company: "MongolianTravel",
    cost: "$5003",
  },
  {
    rating: 4.8,
    title: "Best Of Gobi in 12 days",
    duration: 12,
    image: "/images/pack4.png",
    company: "MongolianTravel",
    cost: "$5004",
  },
  {
    duration: 12,
    title: "Best Of Gobi in 12 days",
    rating: 4.8,
    image: "/images/pack4.png",
    company: "MongolianTravel",
    cost: "$5004",
  },
  {
    rating: 4.8,
    title: "Best Of Gobi in 12 days",
    duration: 12,
    image: "/images/pack4.png",
    company: "MongolianTravel",
    cost: "$5004",
  },
];
export const FilteredPackages = () => {
  return (
    <div className="w-full flex flex-col p-5 bg-white">
      <div className="flex bg-white items-center text-[16px] font-semibold">
        <img src={"/images/filter (1).png"} className="w-5 h-5" /> 28 RESULTS
      </div>
      <div className="w-full h-fit bg-white p-10">
        <div className="w-full   grid grid-cols-3   ">
          {packages.map((item, index) => {
            return (
              <div className="w-full h-100 flex items-center justify-center ">
                <div
                  key={index}
                  className="flex w-90 h-90 rounded-2xl hover:shadow-2xl flex-col hover:w-95 hover:h-95 duration-200"
                >
                  <img
                    src={item.image}
                    className={`w-full min-h-[250px] rounded-2xl object-cover `}
                  />
                  <div className="w-full h-full flex flex-col justify-between p-3">
                    <div className="text-[12px] w-fit font-medium text-stone-500">
                      {item.company}
                    </div>
                    <div className="text-[24px] font-bold">{item.title}</div>
                    <div className="flex w-[150px] justify-between items-center text-[12px] font-medium">
                      <div>{item.duration}days</div>
                      <div className="flex items-center">
                        <img src={"/images/star.png"} className="w-5 h-5" />
                        {item.rating}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full h-20 flex items-center justify-center">
        <button className="w-[150px] h-[40px]  bg-red-600 border-1  rounded-[20px] flex items-center justify-center text-[16px] text-white font-semibold hover:bg-white hover:border-1 hover:border-black hover:text-black duration-200">
          SEE MORE
        </button>
      </div>
    </div>
  );
};
