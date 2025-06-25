import { ActivityType } from "@/app/_providers/AuthProvider";
import Link from "next/link";
type SearchSectionType = {
  activities: ActivityType[];
};
export const SearchActivities = ({ activities }: SearchSectionType) => {
  return (
    <section
      className="w-full relative rounded-md h-full overflow-hidden bg-opacity-10 bg-cover bg-center "
      style={{
        backgroundImage: `url(https://res.cloudinary.com/df60cobe2/image/upload/v1750413882/ogguf1sxqs3wlcz451ml.png)`,
      }}
    >
      {activities && (
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      )}

      <div className="relative z-10 rounded-md overflow-hidden p-4 flex flex-col h-full">
        <Link href={"/explore-destinations"}>
          <div className="font-bold text-4xl mb-4 cursor-pointer ">
            <div className="flex items-baseline hover:underline ">
              {" "}
              <div className="text-5xl text-center\">🎯</div>{" "}
              <div>Actvities</div>
            </div>

            <div className="text-[16px]">Find your adventure</div>
          </div>
        </Link>

        {activities ? (
          <ul className="flex-1 overflow-y-auto h-full rounded-md pl-5 pr-5 flex flex-col gap-5 ">
            {activities.map((item) => (
              <Link
                href={`explore-destinations/${item._id}`}
                key={item._id}
                className=" w-full flex relative "
              >
                <div className="w-full h-15 flex overflow-hidden ">
                  <div className=" h-15 w-full flex items-center z-30 bg-white/10 backdrop-blur-sm rounded-2xl absolute  gap-4 justify-center text-2xl truncate font-bold">
                    <div> {item.emoji}</div>
                    <div> {item.activityName}</div>
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
