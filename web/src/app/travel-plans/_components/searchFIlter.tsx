"use client";

import React from "react";
import { TripType } from "../page";
type SearchFilterProps = {
  selectedTripTypes: TripType[];
  setSelectedTripTypes: React.Dispatch<React.SetStateAction<TripType[]>>;
  applyFilters: () => void;
  clearAllFilters: () => void;
  selectedCosts: string[];
  setSelectedCosts: React.Dispatch<React.SetStateAction<string[]>>;
  selectedDurations: string[];
  setSelectedDurations: React.Dispatch<React.SetStateAction<string[]>>;
};

export const SearchFilter: React.FC<SearchFilterProps> = ({
  selectedTripTypes,
  setSelectedTripTypes,
  applyFilters,
  selectedCosts,
  setSelectedCosts,
  clearAllFilters,
  selectedDurations,
  setSelectedDurations,
}) => {
  const tripTypes: TripType[] = [
    "Scenery",
    "Adventure",
    "Cultural",
    "Historical",
    "Family",
    "Scientific",
    "Festival & Events",
    "Off-road",
  ];
  const cost = ["0-500$", "500-1000$", "1000-5000$", "5000$+"];
  const duration = ["1 day", "1-7 days", "7-14 days", "14-21 days", "21+ days"];

  const handleTripTypeChange = (type: TripType) => {
    setSelectedTripTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };
  const handleCostChange = (range: string) => {
    setSelectedCosts((prev) =>
      prev.includes(range) ? prev.filter((c) => c !== range) : [...prev, range]
    );
  };
  const handleDurationChange = (range: string) => {
    setSelectedDurations((prev) =>
      prev.includes(range) ? prev.filter((d) => d !== range) : [...prev, range]
    );
  };
  return (
    <div className="w-full h-fit bg-transparent flex-col flex  items-center relative  z-10">
      <div className="w-full h-[40px] flex items-center justify-between pl-[40px] pr-[40px]">
        <div className="text-[24px] font-semibold text-accent">
          All Search Filters
        </div>
        <div className="flex gap-2 h-full items-center">
          <button
            onClick={clearAllFilters}
            className="w-[150px] bg-white text-black h-[40px]  rounded-[20px] flex items-center justify-center font-semibold shadow-[0px_0px_20px_-10px_rgba(0,0,0,0.5)] hover:bg-black hover:text-white hover:shadow-lg duration-200"
          >
            CLEAR
          </button>
        </div>
      </div>

      <div className="flex w-full  text-accent pl-30 pr-30">
        <div className="flex-1 h-fit p-5">
          <div className="w-full h-full flex flex-col gap-2">
            <div className="text-[24px]  font-semibold">Trip type</div>
            <div className="columns-2 gap-4 ">
              {tripTypes.map((item, index) => (
                <label
                  key={index}
                  className="text-[16px] flex gap-2 font-medium h-fit items-baseline cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="text-accent"
                    checked={selectedTripTypes.includes(item)}
                    onChange={() => handleTripTypeChange(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 h-full p-5">
          <div className="w-full h-full flex flex-col gap-2">
            <div className="text-[24px] font-semibold">Cost</div>
            <div className="columns-2 gap-4 p-3">
              {cost.map((item, index) => (
                <label
                  key={index}
                  className="text-[16px] flex gap-2 font-medium h-fit items-baseline cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCosts.includes(item)}
                    onChange={() => handleCostChange(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 h-full p-5">
          <div className="w-full h-full flex flex-col gap-2">
            <div className="text-[24px] font-semibold">Duration</div>
            <div className="columns-2 gap-4 p-3">
              {duration.map((item, index) => (
                <label
                  key={index}
                  className="text-[16px] flex gap-2 font-medium h-fit items-baseline cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedDurations.includes(item)}
                    onChange={() => handleDurationChange(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
