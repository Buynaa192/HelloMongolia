export const Search = () => {
  return (
    <div className="w-full h-40 bg-white flex items-center justify-center ">
      <div className="w-[1000px] h-[60px] border rounded-[30px] flex items-center pl-2 pr-2">
        <div className="flex-1 h-full rounded-s-[30px] flex gap-2 items-center pl-2">
          <img src={"/images/passkey.png"} className="w-5 h-5" />
          <input
            type="text"
            className=" h-full outline-none border-0"
            placeholder="Any keyword here"
          />
        </div>
        <div className="h-[calc(100%-10px)] border-l-1"> </div>
        <div className="flex-1 h-full rounded-s-[30px] flex gap-2 items-center pl-2">
          <img src={"/images/pin.png"} className="w-5 h-5" />
          <input
            type="text"
            className=" h-full outline-none border-0"
            placeholder="Any destination here"
          />
        </div>{" "}
        <div className="h-[calc(100%-10px)] border-l-1"> </div>
        <div className="flex-1 h-full rounded-s-[30px] flex gap-2 items-center pl-2">
          <img src={"/images/date.png"} className="w-5 h-5" />
          <input
            type="text"
            className=" h-full outline-none border-0"
            placeholder="Travel dates"
          />
        </div>
        <div className="flex-1 flex items-center justify-center text-[24px] font-semibold text-black shadow-2xl bg-white rounded-[25px] h-[50px] hover:bg-black hover:text-white duration-200 ">
          search
        </div>
      </div>
    </div>
  );
};
