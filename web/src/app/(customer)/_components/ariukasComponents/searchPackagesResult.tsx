import { PackageType } from "@/app/_providers/AuthProvider";
import Link from "next/link";
import { StarIcon } from "../../travel-plans/assets/star";
type SearchSectionType = {
  packages: PackageType[];
};
export const SearchPackage = ({ packages }: SearchSectionType) => {
  return (
    <section
      className="w-full relative rounded-md h-full overflow-hidden bg-opacity-10 bg-cover bg-center "
      style={{
        backgroundImage: `url(https://res.cloudinary.com/df60cobe2/image/upload/v1750322562/nice_hr595q.jpg)`,
      }}
    >
      {packages && (
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      )}

      <div className="relative z-10 rounded-md overflow-hidden p-4 flex flex-col h-full">
        <Link href={"/explore-destinations"}>
          <div className="font-bold text-4xl mb-4 cursor-pointer ">
            <div className="flex items-baseline hover:underline ">
              {" "}
              <div className="text-5xl text-center">📦</div>{" "}
              <div>Travel Packages</div>
            </div>

            <div className="h-4"></div>
          </div>
        </Link>

        {packages ? (
          <ul className="flex-1 overflow-y-auto h-full rounded-md pl-5 pr-5 flex flex-col gap-5 ">
            {packages.map((item) => (
              <Link
                href={`explore-destinations/${item._id}`}
                key={item._id}
                className=" w-full flex  "
              >
                <div className="w-full h-30 flex bg-white/10 backdrop-blur-md rounded-2xl p-3 gap-3  ">
                  {" "}
                  <img
                    src={item.coverPhoto}
                    className="w-[25%] h-full rounded-[8px] top-0 left-0 object-cover"
                  />
                  <div className="w-[75%]  h-full flex  flex-col justify-between">
                    <div>
                      {" "}
                      <div className="w-full  text-[20px] truncate flex font-bold  gap-3 pr-3">
                        <div className="w-full  text-[18px] font-bold truncate  ">
                          {item.title}
                        </div>
                        <div className="">${item.cost}</div>
                      </div>
                      <div className="flex gap-3 text-[14px] font-semibold">
                        {`${item.duration} days`} <span>{"•"}</span>
                        {item.tripType}
                      </div>
                    </div>

                    <div className="w-full flex items-center justify-end pr-5 gap-5 ">
                      <div>{item.companyId.name}</div>
                      <div className="flex items-center ">
                        <StarIcon />
                        {item.rating}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-sm italic">No {"results"} found.</p>
        )}
      </div>
    </section>
  );
};
