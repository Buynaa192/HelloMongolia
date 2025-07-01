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
    <div className="relative z-10 flex items-center justify-center w-full h-25">
      <div className="w-[800px] h-[60px] border rounded-[30px] bg-white/10 backdrop-blur-lg flex items-center px-4">
        {/* Keyword Input */}
        <div className="flex items-center flex-1 h-full gap-2">
          <SearchIcon />
          <input
            type="text"
            className="h-full w-full outline-none border-0 bg-transparent text-accent text-[14px]"
            placeholder="Any keyword here"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="h-[calc(100%-10px)] border-l border-gray-300" />

        {/* Dates picker toggle */}
        <div className="flex items-center flex-1 h-full gap-2 pl-2">
          <div
            className="flex items-center w-5 h-5 cursor-pointer"
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
            <div className="flex items-center gap-2">
              <div className="flex flex-col justify-between gap-0">
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
              <div className="flex flex-col justify-between gap-0">
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
