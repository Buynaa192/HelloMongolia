"use client";

import { api } from "@/axios";
import { memo, useEffect, useRef, useState } from "react";
import { MyLoader } from "./Loader";
import { SearchResultsType } from "./Hero1Text";
import { cn } from "@/lib/utils";
import { SearchDestination } from "./SearchDestinationResult";
import { SearchActivities } from "./SearchActivitiesResult";
import { SearchPackage } from "./searchPackagesResult";

interface SearchInMongoliaProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  results: SearchResultsType;
  setResults: React.Dispatch<React.SetStateAction<SearchResultsType>>;
  searchResults: boolean;
}

const SearchInMongoliaComponent = ({
  query,
  setQuery,
  loading,
  setLoading,
  results,
  setResults,
  searchResults,
}: SearchInMongoliaProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const emptyResults: SearchResultsType = {
    destinations: [],
    activities: [],
    packages: [],
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setQuery("");
        setResults(emptyResults);
        setLoading(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed.length < 1) return;

    setLoading(true);

    const timer = setTimeout(() => {
      api
        .get("/search", {
          params: { q: trimmed },
        })
        .then((res) => {
          setResults(res.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className={`w-full flex flex-col items-center justify-center z-1000 ${
        isFocused ? "fixed" : "relative"
      }`}
    >
      {isFocused ? (
        <div className="fixed inset-0 bg-black/80 z-20 h-1000 " />
      ) : (
        ""
      )}

      <form
        onSubmit={handleSubmit}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="z-50 relative w-[300px] flex items-center border-2 border-white rounded-md overflow-hidden transition-all duration-500 ease-in-out focus-within:w-[400px]"
      >
        <input
          type="text"
          placeholder="🇲🇳 Search in Mongolia"
          className="px-4 py-3 text-lg text-white bg-transparent placeholder-white focus:outline-none w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
        <button
          type="submit"
          className="px-4 py-3 text-lg text-black bg-gray-100 transition"
        >
          🔍
        </button>
      </form>
      {isFocused ? (
        <div className="relative z-50 mt-4 w-[1440px] mx-auto pl-2 pr-2 h-120"></div>
      ) : (
        ""
      )}
      {query.trim().length >= 1 && (
        <div
          ref={containerRef}
          className="absolute top-25 z-50 mt-4 w-[1440px] mx-auto pl-2 pr-2 h-120"
        >
          {loading ? (
            <div className="w-full flex justify-center">
              <MyLoader />
            </div>
          ) : searchResults ? (
            <div
              className={cn(
                "grid gap-4 text-white rounded-md h-full ",
                Object.values(results).filter((r) => r?.length > 0).length === 1
                  ? "grid-cols-1 w-100 justify-self-center"
                  : `w-full grid-cols-3 md:grid-cols-4}`
              )}
            >
              {results.destinations?.length > 0 && (
                <SearchDestination destinations={results.destinations} />
              )}

              {results.activities?.length > 0 && (
                <SearchActivities activities={results.activities} />
              )}

              {results.packages?.length > 0 && (
                <SearchPackage packages={results.packages} />
              )}
            </div>
          ) : (
            <p className="text-sm text-black col-span-2 text-center">
              No results found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export const SearchInMongolia = memo(SearchInMongoliaComponent);
