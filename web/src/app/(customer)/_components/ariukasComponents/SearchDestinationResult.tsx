import { DestinationType } from "@/app/_providers/AuthProvider";
import Link from "next/link";
type SearchSectionType = {
  destinations: DestinationType[];
};
export const SearchDestination = ({ destinations }: SearchSectionType) => {
  return (
    <section
      className="w-full relative rounded-md h-full overflow-hidden bg-opacity-10 bg-cover bg-center "
      style={{
        backgroundImage: `url(https://res.cloudinary.com/df60cobe2/image/upload/v1750420141/photo-1589654615616-6756a5653100_slupkt.jpg)`,
      }}
    >
      {destinations && (
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      )}

      <div className="relative z-10 rounded-md overflow-hidden p-4 flex flex-col h-full">
        <Link href={"/explore-destinations"}>
          <div className="font-bold text-4xl mb-4 cursor-pointer ">
            <div className="flex items-baseline  ">
              {" "}
              <div className="text-5xl text-center\">🏔️</div>{" "}
              <div className="hover:underline">Must See Destinations</div>
            </div>

            <div className="text-[16px] text-[#f1f1f1]">
              Discover amazing places
            </div>
          </div>
        </Link>

        {destinations ? (
          <div className="flex-1 overflow-y-auto h-full rounded-md pl-5 pr-5 flex flex-col gap-5">
            {destinations.map((item) => (
              <Link
                href={`explore-destinations/${item.region}/${item._id}`}
                key={item._id}
                className=" w-full flex relative "
              >
                <div className="w-full h-40 flex items-end overflow-hidden ">
                  {" "}
                  <img
                    src={item.destinationImages[0]}
                    className="w-full h-full rounded-2xl absolute top-0 left-0 object-cover"
                  />
                  <div className=" h-15 w-full flex items-center z-30 bg-white/10 backdrop-blur-sm rounded-b-2xl absolute  justify-center text-2xl truncate font-bold">
                    {item.destinationName}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm italic">No {"results"} found.</p>
        )}
      </div>
    </section>
  );
};
