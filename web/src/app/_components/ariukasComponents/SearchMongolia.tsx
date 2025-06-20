"use client";

import {
  ActivityType,
  CompanyType,
  DestinationType,
  PackageType,
} from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import React, { useState, useEffect, useRef } from "react";
import { SectionTitle } from "../SectionTitle";
import { MyLoader } from "./Loader";

interface SearchInMongoliaProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchInMongolia = ({
  query,
  setQuery,
  loading,
  setLoading,
}: SearchInMongoliaProps) => {
  const [results, setResults] = useState<{
    destinations: DestinationType[];
    activities: ActivityType[];
    companies: CompanyType[];
    packages: PackageType[];
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setQuery("");
        setResults(null);
        setLoading(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed.length < 1) {
      setResults(null);
      return;
    }

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

  console.log(results);

  return (
    <div className="w-full flex flex-col items-center justify-center relative">
      <form
        onSubmit={handleSubmit}
        className="w-[300px] flex items-center border-2 border-white rounded-md overflow-hidden transition-width duration-500 ease-in-out focus-within:w-[400px]"
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

      {query.trim().length >= 1 && (
        <div
          ref={containerRef}
          className="relative z-50 mt-4 w-full max-w-[1040px]"
        >
          {loading ? (
            <div className="w-full flex justify-center">
              <MyLoader />
            </div>
          ) : results ? (
            <div className="grid grid-cols-2 gap-4 text-white rounded-md shadow-lg backdrop-blur-sm">
              {results.destinations?.length > 0 && (
                <SearchSection
                  title={
                    <SectionTitle
                      title="🏔️ Must See Destinations"
                      count={results.destinations.length}
                    />
                  }
                  items={results.destinations}
                  field="destinationName"
                  emptyLabel="destinations"
                  backgroundImage="https://res.cloudinary.com/df60cobe2/image/upload/v1750420141/photo-1589654615616-6756a5653100_slupkt.jpg"
                />
              )}

              {results.activities?.length > 0 && (
                <SearchSection
                  title={
                    <SectionTitle
                      title="🎯 To do's in Mongolia"
                      count={results.activities.length}
                    />
                  }
                  items={results.activities}
                  field="activityName"
                  emptyLabel="activities"
                  backgroundImage="https://res.cloudinary.com/df60cobe2/image/upload/v1750413882/ogguf1sxqs3wlcz451ml.png"
                />
              )}

              {results.companies?.length > 0 && (
                <SearchSection
                  title={
                    <SectionTitle
                      title="🏢 Local Tour Operators"
                      count={results.companies.length}
                    />
                  }
                  items={results.companies}
                  field="companyName"
                  emptyLabel="companies"
                  backgroundImage="https://res.cloudinary.com/df60cobe2/image/upload/v1750321227/MotoInDesert_qclalo.jpg"
                />
              )}

              {results.packages?.length > 0 && (
                <SearchSection
                  title={
                    <SectionTitle
                      title="📦 Travel Plans"
                      count={results.packages.length}
                    />
                  }
                  items={results.packages}
                  field="title"
                  emptyLabel="packages"
                  backgroundImage="https://res.cloudinary.com/df60cobe2/image/upload/v1750322562/nice_hr595q.jpg"
                />
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500 col-span-2 text-center">
              No results found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

interface SearchSectionProps {
  title: React.ReactNode;
  items?: any[];
  field: string;
  emptyLabel?: string;
  backgroundImage?: string;
}

export const SearchSection = ({
  title,
  items,
  field,
  emptyLabel,
  backgroundImage,
}: SearchSectionProps) => {
  return (
    <section
      className="w-full relative rounded-md h-[300px] overflow-hidden bg-opacity-10 bg-cover bg-center"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
      }}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      )}

      <div className="relative z-10 p-4 flex flex-col h-full">
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        {items && items.length ? (
          <ul className="divide-y divide-gray-600 overflow-y-auto rounded-md flex-grow">
            {items.map((item) => (
              <li
                key={item._id}
                className="py-2 cursor-pointer transition-colors hover:bg-white/20"
              >
                <p className="hover:font-semibold">{item[field]}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-sm italic flex h-full justify-center items-center">
            No {emptyLabel ?? "results"} found.
          </p>
        )}
      </div>
    </section>
  );
};
