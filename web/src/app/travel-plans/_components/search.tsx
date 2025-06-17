"use client";

import { useState } from "react";

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
  applyFilters,
}) => {
  const [showDates, setShowDates] = useState(false);

  return (
    <div className="w-full h-40 bg-white flex items-center justify-center">
      <div className="w-[1000px] h-[60px] border rounded-[30px] flex items-center pl-2 pr-2">
        {/* Keyword Input */}
        <div className="flex-1 h-full rounded-s-[30px] flex gap-2 items-center pl-2">
          <img src={"/images/passkey.png"} className="w-5 h-5" alt="Keyword" />
          <input
            type="text"
            className="h-full outline-none border-0"
            placeholder="Any keyword here"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="h-[calc(100%-10px)] border-l border-gray-300" />

        {/* Dates picker toggle */}
        <div className="flex-1 h-full flex gap-2 items-center pl-2">
          <img
            src={"/images/date.png"}
            className="w-5 h-5 cursor-pointer"
            onClick={() => setShowDates(!showDates)}
            alt="Select dates"
          />
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
                <div className="text-[8px]">From:</div>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="outline-none border-0 text-[14px]"
                />
              </div>
              <span>-</span>
              <div className="flex flex-col gap-0 justify-between">
                <div className="text-[8px]">Until:</div>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="outline-none border-0 text-[14px]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Search button */}
        <div
          onClick={applyFilters}
          className="flex-1 flex items-center justify-center text-[24px] font-semibold text-black shadow-2xl bg-white rounded-[25px] h-[50px] hover:bg-black hover:text-white duration-200 cursor-pointer"
        >
          Search
        </div>
      </div>
    </div>
  );
};
