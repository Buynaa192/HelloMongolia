"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchInMongolia } from "./SearchMongolia";
import {
  ActivityType,
  CompanyType,
  DestinationType,
  PackageType,
} from "@/app/_providers/AuthProvider";
const animatedWords = ["DISCOVER", "EXPLORE", "EXPERIENCE", "FEEL"];

export type SearchResultsType = {
  destinations: DestinationType[];
  activities: ActivityType[];
  companies: CompanyType[];
  packages: PackageType[];
};

const emptyResults: SearchResultsType = {
  destinations: [],
  activities: [],
  companies: [],
  packages: [],
};

export const Hero1Text = ({
  setRadient,
}: {
  setRadient: (radient: "white" | "black") => void;
}) => {
  const [index, setIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<SearchResultsType>(emptyResults);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % animatedWords.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  const searchResults =
    results &&
    (results.destinations?.length > 0 ||
      results.activities?.length > 0 ||
      results.companies?.length > 0 ||
      results.packages?.length > 0);

  useEffect(() => {
    if (query && searchResults) {
      setRadient("black");
    } else {
      setRadient("white");
    }
  }, [query, loading, searchResults]);

  return (
    <div className="absolute flex flex-col gap-8 items-center justify-center w-full h-full">
      {!query || loading || !searchResults ? (
        <div className="flex flex-col items-center font-extrabold text-5xl lg:text-7xl z-45">
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
        results={results}
        setResults={setResults}
        searchResults={searchResults}
      />
    </div>
  );
};
