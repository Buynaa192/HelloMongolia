"use client";

import { api } from "@/axios";
import React, { useEffect, useRef } from "react";
import { SectionTitle } from "./SectionTitle";
import { MyLoader } from "./Loader";
import { SearchResultsType } from "./Hero1Text";
import {
  ActivityType,
  CompanyType,
  DestinationType,
  PackageType,
} from "@/app/_providers/AuthProvider";

interface SearchInMongoliaProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  results: SearchResultsType;
  setResults: React.Dispatch<React.SetStateAction<SearchResultsType>>;
  searchResults: boolean;
}

import clsx from "clsx";
import { SearchSection } from "./SearchResultsSections";
const cn = clsx;

export const SearchInMongolia = ({
  query,
  setQuery,
  loading,
  setLoading,
  results,
  setResults,
  searchResults,
}: SearchInMongoliaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const emptyResults: SearchResultsType = {
    destinations: [],
    activities: [],
    companies: [],
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed.length < 1) {
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

  return (
    <div className="w-full flex flex-col items-center justify-center relative">
      {searchResults && <div className="fixed inset-0 bg-black/80 z-20" />}

      <form
        onSubmit={handleSubmit}
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

      {query.trim().length >= 1 && (
        <div
          ref={containerRef}
          className="relative z-50 mt-4 w-fit max-w-[1040px] mx-auto"
        >
          {loading ? (
            <div className="w-full flex justify-center">
              <MyLoader />
            </div>
          ) : searchResults ? (
            <div
              className={cn(
                "grid gap-4 text-white rounded-md",
                Object.values(results).filter((r) => r?.length > 0).length === 1
                  ? "grid-cols-1 w-100 justify-self-center"
                  : "w-full grid-cols-1 md:grid-cols-2"
              )}
            >
              {results.destinations?.length > 0 && (
                <SearchSection<DestinationType>
                  title={
                    <SectionTitle
                      title="🏔️ Must See Destinations"
                      count={results.destinations.length}
                    />
                  }
                  items={results.destinations}
                  field="destinationName"
                  emptyLabel="destinations"
                  urlPrefix="/explore-destinations"
                  backgroundImage="https://res.cloudinary.com/df60cobe2/image/upload/v1750420141/photo-1589654615616-6756a5653100_slupkt.jpg"
                />
              )}
              {results.activities?.length > 0 && (
                <SearchSection<ActivityType>
                  title={
                    <SectionTitle
                      title="🎯 To do's in Mongolia"
                      count={results.activities.length}
                    />
                  }
                  items={results.activities}
                  field="activityName"
                  emptyLabel="activities"
                  urlPrefix="/experiences"
                  backgroundImage="https://res.cloudinary.com/df60cobe2/image/upload/v1750413882/ogguf1sxqs3wlcz451ml.png"
                />
              )}
              {results.companies?.length > 0 && (
                <SearchSection<CompanyType>
                  title={
                    <SectionTitle
                      title="🏢 Local Tour Operators"
                      count={results.companies.length}
                    />
                  }
                  items={results.companies}
                  field="name"
                  emptyLabel="companies"
                  urlPrefix="/comapanies"
                  backgroundImage="https://res.cloudinary.com/df60cobe2/image/upload/v1750321227/MotoInDesert_qclalo.jpg"
                />
              )}
              {results.packages?.length > 0 && (
                <SearchSection<PackageType>
                  title={
                    <SectionTitle
                      title="📦 Travel Plans"
                      count={results.packages.length}
                    />
                  }
                  items={results.packages}
                  field="title"
                  emptyLabel="packages"
                  urlPrefix="/travel-plans"
                  backgroundImage="https://res.cloudinary.com/df60cobe2/image/upload/v1750322562/nice_hr595q.jpg"
                />
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
