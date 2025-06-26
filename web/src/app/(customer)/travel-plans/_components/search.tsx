"use client";

import { useState } from "react";
import { CalendarIcon } from "../assets/calendar";
import { SearchIcon } from "../assets/searchIcon";

type SearchProps = {
  keyword: string;
  setKeyword: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;

  setEndDate: (value: string) => void;
  applyFilters: () => void;
};

export const Search: React.FC<SearchProps> = ({
  keyword,
  setKeyword,
  startDate,

  setStartDate,
  endDate,
  setEndDate,
}) => {
  const [showDates, setShowDates] = useState(false);

  return (
    <div className="w-full h-25 bg-transparent flex items-center justify-center relative z-10">
      <div className="w-[1000px] h-[60px] border rounded-[30px] bg-white/10 backdrop-blur-lg flex items-center pl-2 pr-2">
        {/* Keyword Input */}
        <div className="flex-1 h-full rounded-s-[30px] flex gap-2 items-center pl-2">
          <SearchIcon />
          <input
            type="text"
            className="h-full outline-none border-0 bg-transparent text-accent text-[14px]"
            placeholder="Any keyword here"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="h-[calc(100%-10px)] border-l border-gray-300" />

        {/* Dates picker toggle */}
        <div className="flex-1 h-full flex gap-2 items-center pl-2">
          <div
            className="w-5 h-5 cursor-pointer flex items-center"
            onClick={() => setShowDates(!showDates)}
          >
            <CalendarIcon />
          </div>
          {!showDates ? (
            <span
              className="text-gray-500 text-[14px] cursor-pointer"
              onClick={() => setShowDates(true)}
            >
              {startDate && endDate
                ? `${startDate} - ${endDate}`
                : "Select dates"}
            </span>
          ) : (
            <div className="flex gap-2 items-center">
              <div className="flex flex-col gap-0 justify-between">
                <div className="text-[8px] text-accent">From:</div>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="outline-none border-0 text-[14px] text-accent bg-linear-to-l from-white to-20% rounded-r-2xl cursor-pointer"
                />
                <div className="h-2"></div>
              </div>
              <span>-</span>
              <div className="flex flex-col gap-0 justify-between">
                <div className="text-[8px] text-accent">Until:</div>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="outline-none border-0 text-[14px] text-accent  bg-linear-to-l from-white to-20% rounded-r-2xl cursor-pointer"
                />
                <div className="h-2"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
