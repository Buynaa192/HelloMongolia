import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="w-full bg-white flex flex-col gap-5">
      <div className="relative flex justify-center w-full h-fit">
        <img src="/images/abotus.png" className="" alt="" />
        <div className="absolute top-40 text-white">
          <h1 className="text-5xl text-center mb-5">Together,</h1>
          <h1 className="text-5xl">we bring Mongolia closer to the world.</h1>
        </div>
      </div>
      <div className="w-full px-6 flex flex-col gap-5">
        <div className="flex">
          <Link href={"/"}>Home</Link>
          <ChevronRight />
          <Link href={"/about-us"}>About</Link>
        </div>
        <div className="flex gap-5 w-full">
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">The Challenge:</h1>
            <p>
              Mongolia is a land of breathtaking landscapes, ancient history,
              and a rare nomadic culture found nowhere else. But despite its
              beauty and uniqueness, it's still a hidden gem in the world of
              travel. Why? Because it's far away, not well-promoted
              internationally, and travel information is scattered—making it
              hard for travelers to plan a trip with confidence.
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">Our Solution:</h1>
            <p>
              We’re building a smart, easy-to-use digital platform to help the
              world discover Mongolia. Whether you’re looking for epic nature,
              cultural adventures, or trusted tour companies, our site brings
              everything together in one place. Even if you have no idea where
              to start, we’ll guide you to the perfect route, experiences, and
              local experts—so your journey to Mongolia feels closer, safer, and
              more unforgettable than ever.
            </p>
          </div>
        </div>
        <div className="p-10 flex flex-col gap-5">
          <div className="flex justify-center text-2xl font-bold">
            Meet our team:
          </div>
          <div className="flex gap-4 px-10">
            <div className="flex flex-col gap-3">
              <img src="/images/catpic.png" className="flex-1" alt="" />
              <h1 className=" text-center font-semibold text-2xl">
                Unursaikhan
              </h1>
            </div>
            <div className="flex flex-col gap-3">
              <img src="/images/catpic.png" className="flex-1" alt="" />
              <h1 className=" text-center font-semibold text-2xl">
                Unursaikhan
              </h1>
            </div>
            <div className="flex flex-col gap-3">
              <img src="/images/catpic.png" className="flex-1" alt="" />
              <h1 className=" text-center font-semibold text-2xl">
                Unursaikhan
              </h1>
            </div>
            <div className="flex flex-col gap-3">
              <img src="/images/catpic.png" className="flex-1" alt="" />
              <h1 className=" text-center font-semibold text-2xl">
                Unursaikhan
              </h1>
            </div>
            <div className="flex flex-col gap-3">
              <img src="/images/catpic.png" className="flex-1" alt="" />
              <h1 className=" text-center font-semibold text-2xl">
                Unursaikhan
              </h1>
            </div>
            <div className="flex flex-col gap-3">
              <img src="/images/catpic.png" className="flex-1" alt="" />
              <h1 className=" text-center font-semibold text-2xl">
                Unursaikhan
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold text-center">Our vision:</h1>
          <div className="w-full flex px-60">
            <p className="text-center">
              To make Mongolia one of the world’s most sought-after travel
              destinations—celebrated for its untouched landscapes, ancient
              culture, and the enduring spirit of its nomadic people. We
              envision a world where Mongolia is not just discovered, but deeply
              experienced. Where travelers from every corner of the globe come
              to connect with something real, raw, and unforgettable. Through
              innovation, collaboration, and passion, we aim to open Mongolia’s
              doors to the world—responsibly, sustainably, and with the respect
              its heritage deserves.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
