export const SearchFilter = () => {
  const activities = [
    "Adventure",
    "Adventure",
    "Adventure",
    "Adventure",
    "Adventure",
    "Adventure",
    "Adventure",
    "Adventure",
    "Adventure",
    "Adventure",
    "Adventure",
    "Adventure",
  ];
  return (
    <div className="w-full h-100 bg-white flex-col flex gap-4  items-center">
      <div className="w-full h-[80px] flex items-center justify-between pl-[40px] pr-[40px] ">
        <div className="text-[24px] font-semibold ">All Search Filters</div>
        <div className="flex gap-2 h-full items-center">
          <button className="w-[150px] bg-white text-black h-[40px] border-1  rounded-[20px] flex items-center justify-center font-semibold hover:shadow-lg hover:border-0 duration-100">
            CLEAR
          </button>
          <button className="w-[150px] bg-white text-black h-[40px]  border-1   rounded-[20px] flex items-center justify-center font-semibold hover:shadow-lg hover:border-0 duration-100">
            CANCEL
          </button>
          <button className="w-[150px] bg-red-600 text-white h-[40px] rounded-[20px] flex items-center justify-center font-semibold  hover:bg-white   hover:text-black duration-200 hover:shadow-[0px_10px_20px_-10px_rgba(0,0,0,0.5)] ">
            APPLY
          </button>
        </div>
      </div>
      <div className="w-[calc(100%-80px)] border-b-1 border-[#f1f1f1]"> </div>
      <div className="flex w-full flex-1 ">
        <div className="flex-1 h-full  p-5">
          <div className="w-full h-full  flex flex-col gap-2 item">
            <div className="text-[24px] font-semibold">DURATION</div>
            <div className="columns-2 gap-4 p-3">
              {activities.map((item, index) => {
                return (
                  <div
                    className="text-[16px] flex gap-2 font-medium "
                    key={index}
                  >
                    <input type="checkbox" />
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex-1 h-full  p-5">
          <div className="w-full h-full  flex flex-col gap-2">
            <div className="text-[24px] font-semibold">EXPERIENCES</div>
            <div className="columns-2 gap-4 p-3">
              {activities.map((item, index) => {
                return (
                  <div
                    className="text-[16px] flex gap-2 font-medium "
                    key={index}
                  >
                    <input type="checkbox" />
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
