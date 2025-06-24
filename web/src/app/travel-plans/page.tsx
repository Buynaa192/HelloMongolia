"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/axios";

import { PackageType } from "../_providers/AuthProvider";
import { FilteredPackages } from "./_components/filteredPackages";
import { Search } from "./_components/search";
import { SearchFilter } from "./_components/searchFIlter";
import { TravelPlanHome } from "./_components/travelPLanHome";
import Link from "next/link";

export type TripType =
  | "Scenery"
  | "Adventure"
  | "Cultural"
  | "Historical"
  | "Family"
  | "Scientific"
  | "Festival & Events"
  | "Off-road";

const VALID_TRIP_TYPES: TripType[] = [
  "Scenery",
  "Adventure",
  "Cultural",
  "Historical",
  "Family",
  "Scientific",
  "Festival & Events",
  "Off-road",
];

export default function PackagesExplore() {
  const searchParams = useSearchParams();
  const tripTypeFromURL = searchParams.get("tripType") as TripType | null;

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
        const res = await api.get("/package");
        setAllPackages(res.data.packages);
<<<<<<< HEAD

        setFilteredPackages(res.data.packages);
=======
>>>>>>> 0612182 (p)
      } catch (err) {
        console.error("Failed to fetch packages", err);
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    if (tripTypeFromURL && VALID_TRIP_TYPES.includes(tripTypeFromURL)) {
      setSelectedTripTypes([tripTypeFromURL]);
    }
  }, [tripTypeFromURL]);

  useEffect(() => {
    const filter = () => {
      const filtered = allPackages.filter((pkg) => {
        const matchesKeyword =
          !keyword ||
          pkg.description.toLowerCase().includes(keyword.toLowerCase());

        const matchesTripType =
          selectedTripTypes.length === 0 ||
          selectedTripTypes.includes(pkg.tripType as TripType);

        const matchesCost =
          selectedCosts.length === 0 ||
          selectedCosts.some((range) => {
            const cost = pkg.cost;
            switch (range) {
              case "0-500$":
                return cost >= 0 && cost <= 500;
              case "500-1000$":
                return cost > 500 && cost <= 1000;
              case "1000-5000$":
                return cost > 1000 && cost <= 5000;
              case "5000$+":
                return cost > 5000;
              default:
                return true;
            }
          });

        const pkgDuration = parseInt(pkg.duration);
        const matchesDuration =
          selectedDurations.length === 0 ||
          selectedDurations.some((range) => {
            switch (range) {
              case "1 day":
                return pkgDuration === 1;
              case "1-7 days":
                return pkgDuration >= 1 && pkgDuration <= 7;
              case "7-14 days":
                return pkgDuration > 7 && pkgDuration <= 14;
              case "14-21 days":
                return pkgDuration > 14 && pkgDuration <= 21;
              case "21+ days":
                return pkgDuration > 21;
              default:
                return true;
            }
          });

        const availableFrom = new Date(pkg.availableFrom);
        const availableUntil = new Date(pkg.availableUntil);
        const filterStart = startDate ? new Date(startDate) : null;
        const filterEnd = endDate ? new Date(endDate) : null;

        const matchesDate =
          (!filterStart || availableUntil >= filterStart) &&
          (!filterEnd || availableFrom <= filterEnd);

        return (
          matchesKeyword &&
          matchesTripType &&
          matchesCost &&
          matchesDuration &&
          matchesDate
        );
      });

      setFilteredPackages(filtered);
    };

    filter();
  }, [
    allPackages,
    keyword,
    selectedTripTypes,
    selectedCosts,
    selectedDurations,
    startDate,
    endDate,
  ]);

  const clearAllFilters = () => {
    setKeyword("");
    setStartDate("");
    setEndDate("");
    setSelectedCosts([]);
    setSelectedTripTypes([]);
    setSelectedDurations([]);
  };

  return (
    <div className="w-full h-full">
      <TravelPlanHome />
      <div className="bg-transparent w-full p-2 gap-2 flex text-transparent">
        <Link href={"/"}> Home</Link> <span>{">"}</span>
        <Link href={"/travel-plans"}> Travel Plans</Link>
      </div>{" "}
      <Search
        keyword={keyword}
        setKeyword={setKeyword}
        startDate={startDate}
        setStartDate={setStartDate}
        applyFilters={() => {}} // no-op, filtering is automatic now
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <SearchFilter
        selectedTripTypes={selectedTripTypes}
        setSelectedTripTypes={setSelectedTripTypes}
        applyFilters={() => {}} // no-op
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
