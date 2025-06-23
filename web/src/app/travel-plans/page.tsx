"use client";

import { useEffect, useState } from "react";
import { FilteredPackages } from "./_components/filteredPackages";
import { Search } from "./_components/search";
import { SearchFilter } from "./_components/searchFIlter";
import { TravelPlanHome } from "./_components/travelPLanHome";
import SmoothScroll from "./assets/smoothScroll";
import { PackageType } from "../_providers/AuthProvider";
import { api } from "@/axios";
import { BackToHomePathButtons } from "../_components/ariukasComponents/BackToHomePagePathButtons";

export type TripType =
  | "Scenery"
  | "Adventure"
  | "Cultural"
  | "Historical"
  | "Family"
  | "Scientific"
  | "Festival & Events"
  | "Off-road";

export default function PackagesExplore() {
  const [allPackages, setAllPackages] = useState<PackageType[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<PackageType[]>([]);

  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCosts, setSelectedCosts] = useState<string[]>([]);

  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);

  const [selectedTripTypes, setSelectedTripTypes] = useState<TripType[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await api.get(`/package`);
        setAllPackages(res.data.packages);
        console.log("aaa", res.data.packages);

        setFilteredPackages(res.data.packages);
      } catch (err) {
        console.error("Failed to fetch packages", err);
      }
    };

    fetchPackages();
  }, []);

  const parseDurationToDays = (durationStr: string): number => {
    const match = durationStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const applyAllFilters = () => {
    const filtered = allPackages.filter((e) => {
      const matchesKeyword =
        keyword === "" ||
        e.description.toLowerCase().includes(keyword.toLowerCase());

      const matchesTripType =
        selectedTripTypes.length === 0 ||
        selectedTripTypes.includes(e.tripType as TripType);

      const matchesCost =
        selectedCosts.length === 0 ||
        selectedCosts.some((range) => {
          const cost = e.cost;
          switch (range) {
            case "0-500$":
              return cost >= 0 && cost <= 500;
            case "500-1000$":
              return cost >= 500 && cost <= 1000;
            case "1000-5000$":
              return cost >= 1000 && cost <= 5000;
            case "5000$+":
              return cost >= 5000;
            default:
              return true;
          }
        });

      const pkgDurationDays = parseDurationToDays(e.duration);

      const matchesDuration =
        selectedDurations.length === 0 ||
        selectedDurations.some((range) => {
          switch (range) {
            case "1 day":
              return pkgDurationDays === 1;
            case "1-7 days":
              return pkgDurationDays >= 1 && pkgDurationDays <= 7;
            case "7-14 days":
              return pkgDurationDays > 7 && pkgDurationDays <= 14;
            case "14-21 days":
              return pkgDurationDays > 14 && pkgDurationDays <= 21;
            case "21+ days":
              return pkgDurationDays > 21;
            default:
              return true;
          }
        });

      const packageStart = new Date(e.availableFrom);
      const packageEnd = new Date(e.availableUntil);
      const filterStart = startDate ? new Date(startDate) : null;
      const filterEnd = endDate ? new Date(endDate) : null;

      const matchesDates =
        (!filterStart || packageEnd >= filterStart) &&
        (!filterEnd || packageStart <= filterEnd);

      return (
        matchesKeyword &&
        matchesTripType &&
        matchesDates &&
        matchesCost &&
        matchesDuration
      );
    });

    setFilteredPackages(filtered);
  };

  const clearAllFilters = () => {
    setKeyword("");
    setSelectedTripTypes([]);
    setStartDate("");
    setEndDate("");
    setSelectedCosts([]);
    setFilteredPackages(allPackages);
  };

  return (
    <div className="w-full h-full ">
      <SmoothScroll />
      <TravelPlanHome />
      <BackToHomePathButtons />

      <Search
        keyword={keyword}
        setKeyword={setKeyword}
        startDate={startDate}
        setStartDate={setStartDate}
        applyFilters={applyAllFilters}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      <SearchFilter
        selectedTripTypes={selectedTripTypes}
        setSelectedTripTypes={setSelectedTripTypes}
        applyFilters={applyAllFilters}
        clearAllFilters={clearAllFilters}
        selectedCosts={selectedCosts}
        setSelectedCosts={setSelectedCosts}
        selectedDurations={selectedDurations}
        setSelectedDurations={setSelectedDurations}
      />

      <FilteredPackages packages={filteredPackages} />
    </div>
  );
}
