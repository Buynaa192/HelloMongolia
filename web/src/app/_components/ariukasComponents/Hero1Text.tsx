"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchInMongolia } from "./SearchMongolia";
const animatedWords = ["DISCOVER", "EXPLORE", "EXPERIENCE", "FEEL"];

export const Hero1Text = () => {
  const [index, setIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % animatedWords.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute flex flex-col gap-8 items-center justify-center w-full h-full">
      {!query || loading ? (
        <div className="flex flex-col items-center font-extrabold text-5xl lg:text-7xl">
          <div className="flex justify-center ">
            <AnimatePresence mode="wait">
              <motion.div
                key={animatedWords[index]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                {animatedWords[index]}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="text-white">
            <span>MONGOLIA</span>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <SearchInMongolia
        query={query}
        setQuery={setQuery}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};
