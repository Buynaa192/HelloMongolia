"use client";

import React from "react";
import { TripType } from "../page";
import { ActivityType } from "@/app/_providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type SearchFilterProps = {
  selectedTripTypes: TripType[];
  setSelectedTripTypes: React.Dispatch<React.SetStateAction<TripType[]>>;
  applyFilters: () => void;
  clearAllFilters: () => void;
  selectedCosts: string[];
  setSelectedCosts: React.Dispatch<React.SetStateAction<string[]>>;
  selectedDurations: string[];
  setSelectedDurations: React.Dispatch<React.SetStateAction<string[]>>;
  allActivities: ActivityType[];
  selectedActivities: ActivityType[];
  setSelectedActivities: React.Dispatch<React.SetStateAction<ActivityType[]>>;
};

export const SearchFilter: React.FC<SearchFilterProps> = ({
  selectedTripTypes,
  setSelectedTripTypes,
  selectedCosts,
  setSelectedCosts,
  clearAllFilters,
  selectedDurations,
  setSelectedDurations,
  allActivities,
  selectedActivities,
  setSelectedActivities,
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

  const handleActivityChange = (activity: ActivityType) => {
    setSelectedActivities((prev) =>
      prev.some((a) => a._id === activity._id)
        ? prev.filter((a) => a._id !== activity._id)
        : [...prev, activity]
    );
  };

  return (
    <div className="w-130 h-fit bg-transparent flex-col flex items-center relative z-10 pl-20 ">
      <div className="w-full h-[40px] flex items-center justify-between  ">
        <div className=" font-semibold  w-70  text-white text-3xl ">
          All Search Filters
        </div>
        <div className="flex h-10  items-center justify-end p-4">
          <Button
            onClick={clearAllFilters}
            className="w-[150px] text-white h-[40px] border-2 max-2xl:text-[18px] rounded-3xl flex items-center justify-center font-semibold shadow-[0px_0px_20px_-10px_rgba(0,0,0,0.5)] hover:bg-white hover:text-black hover:shadow-lg duration-200"
          >
            CLEAR
          </Button>
        </div>
      </div>

      <div className="flex flex-col w-fit text-accent gap-4 mt-4 ">
        <div className="flex-1 h-fit pr-5 pl-5 ">
          <div className="flex flex-col gap-3">
            <div className=" font-semibold text-2xl ">Trip type</div>
            <div className="flex flex-wrap gap-3">
              {tripTypes.map((type) => {
                const selected = selectedTripTypes.includes(type);
                return (
                  <Badge
                    key={type}
                    onClick={() => handleTripTypeChange(type)}
                    className={`pt-2 px-4 border-none cursor-pointer transition-colors duration-200 text-sm font-medium group flex flex-col items-center max-2xl:text-[12px] ${
                      selected ? "bg-white/40 text-white" : "border-accent"
                    }`}
                  >
                    {type}
                    <div
                      className={`w-0 border-1 border-[#f1f1f100] group-hover:w-full group-hover:border-white duration-300 ${
                        selected ? "w-full border-white" : ""
                      }`}
                    ></div>
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex-1 h-fit pr-5 pl-5 ">
          <div className="flex flex-col gap-3">
            <div className="text-2xl font-semibold  ">Cost</div>
            <div className="flex flex-wrap gap-3">
              {cost.map((range) => {
                const selected = selectedCosts.includes(range);
                return (
                  <Badge
                    key={range}
                    onClick={() => handleCostChange(range)}
                    className={`pt-2 px-4 border-none cursor-pointer transition-colors duration-200 text-sm font-medium group flex flex-col items-center max-2xl:text-[12px] ${
                      selected ? "bg-white/40 text-white" : "border-accent"
                    }`}
                  >
                    {range}
                    <div
                      className={`w-0 border-1 border-[#f1f1f100] group-hover:w-full group-hover:border-white duration-300  ${
                        selected ? "w-full border-white" : ""
                      }`}
                    ></div>
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex-1 h-fit pr-5 pl-5">
          <div className="flex flex-col gap-3">
            <div className="text-2xl font-semibold  ">Duration</div>
            <div className="flex flex-wrap gap-3">
              {duration.map((range) => {
                const selected = selectedDurations.includes(range);
                return (
                  <Badge
                    key={range}
                    onClick={() => handleDurationChange(range)}
                    className={`pt-2 px-4 border-0 cursor-pointer transition-colors duration-200 text-sm font-medium group flex flex-col items-center max-2xl:text-[12px] ${
                      selected ? "bg-white/40 text-white" : "border-accent"
                    }`}
                  >
                    {range}
                    <div
                      className={`w-0 border-1 border-[#f1f1f100] group-hover:w-full group-hover:border-white duration-300 ${
                        selected ? "w-full border-white" : ""
                      }`}
                    ></div>
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex-1 h-fit pr-5 pl-5">
          <div className="flex flex-col gap-3">
            <div className="text-2xl font-semibold  ">Activities</div>
            <div className="flex flex-wrap gap-3">
              {allActivities.map((activity) => {
                const selected = selectedActivities.some(
                  (a) => a._id === activity._id
                );
                return (
                  <Badge
                    key={activity._id}
                    onClick={() => handleActivityChange(activity)}
                    className={`pt-2 px-4 border-0 cursor-pointer transition-colors duration-200 text-sm font-medium group flex flex-col items-center max-2xl:text-[12px] ${
                      selected ? "bg-white/40 text-white" : "border-accent"
                    }`}
                  >
                    {activity.emoji} {activity.activityName}
                    <div
                      className={`w-0 border-1 border-[#f1f1f100] group-hover:w-full group-hover:border-white duration-300 ${
                        selected ? "w-full border-white" : ""
                      }`}
                    ></div>
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
