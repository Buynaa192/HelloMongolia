"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Hero2Text = () => {
  return (
    <motion.div
      initial={{ y: 90, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="absolute inset-0 z-20 flex items-center justify-center text-white"
    >
      <div className="absolute top-0 w-full  text-black py-8 px-8 md:px-16 flex flex-col z-10 items-center gap-12 z">
        <div className="flex w-full justify-between md:flex-row md:flex flex-col gap-8 items-center">
          <div className="md:text-left text-center">
            <h1 className="lg:text-6xl text-5xl font-extrabold leading-tight ">
              WHY
              <br />
              <span className="block mt-2">
                GO <br /> MON<span className="text-blue-600">GO</span>LIA ?
              </span>
            </h1>
          </div>
          <div className="md:w-1/2 text-[16px] md:text-[18px] lg:text-xl flex flex-col gap-8">
            <p className="w-full md:text-left text-center ">
              Because it's one of the last places on Earth where you can truly
              disconnect—and reconnect. Vast untouched landscapes, ancient
              traditions, and warm-hearted nomadic hospitality offer not just a
              trip, but a transformation.
            </p>
            <p className="w-full md:text-left text-center text-white">
              If you're seeking something real, raw, and unforgettable, <br />
              <span className="font-bold text-2xl">Mongolia is calling.</span>
            </p>
          </div>
        </div>
        <Button className=" bg-black text-white w-fit">
          EXPLORE ALL EXPERIENCES
        </Button>
      </div>
    </motion.div>
  );
};
