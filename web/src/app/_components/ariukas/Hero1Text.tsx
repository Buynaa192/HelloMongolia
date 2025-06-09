"use client";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const animatedWords = [
  "EXPLORE",
  "DISCOVER",
  "TRAVEL",
  "VENTURE",
  "WANDER",
  "ROAM",
  "JOURNEY",
  "ESCAPE",
  "UNVEIL",
  "EXPERIENCE",
];
export default function Hero1Text() {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % animatedWords.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full">
      <div className="h-[100px] relative flex items-center text-5xl md:text-7xl font-bold gap-3">
        <div className="relative w-[450px] h-full overflow-hidden flex items-center justify-end">
          <AnimatePresence mode="wait">
            <motion.div
              key={animatedWords[index]}
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute"
            >
              {animatedWords[index]}
            </motion.div>
          </AnimatePresence>
        </div>

        <span className=" text-white">MONGOLIA</span>
      </div>
      <Button className=" px-4 py-2 border rounded-md text-white bg-transparent border-white hover:bg-white hover:text-black transition">
        🔍🇲🇳 Search in Mongolia
      </Button>
    </div>
  );
}
