"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CompanyType } from "../../_providers/AuthProvider";
import { api } from "@/axios";
import { BackToHomePathButtons } from "../_components/ariukasComponents/BackToHomePagePathButtons";
import { CompanyCard } from "../_components/ariukasComponents/CompanyCard";

export default function ExploreCompanies() {
  const [companies, setCompanies] = useState<CompanyType[]>([]);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const res = await api.get(`/company`);
        setCompanies(res.data.companies);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };

    getCompanies();
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white ">
      <div className="w-full h-[500px] relative">
        <Image
          src="https://res.cloudinary.com/df60cobe2/image/upload/v1750683343/f6beaae5087528cc4d696a2d3b514669f17b7dda_m8mgtu.jpg"
          fill
          alt="companiescover"
          className="object-cover"
        />
        <div className="bg-black/50 absolute w-full h-full top-0 flex justify-center items-end px-6 py-10 gap-10 ">
          <h1 className="w-full text-4xl md:text-5xl font-extrabold text-white justify-self-end">
            Discover
            <div className="flex">
              {"Mongolia".split("").map((letter, i) => (
                <div
                  key={i}
                  className={`text-7xl duration-200 ${
                    animated ? `animate-fadeRed` : ""
                  }`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {letter}
                </div>
              ))}
            </div>
            with Trusted Tour Experts
          </h1>
          <p className="text-xl md:text-xl text-white/80 max-w-2xl">
            Browse a curated list of Mongolia’s leading tour operators offering
            unforgettable journeys across the steppe, desert, and mountains.
            Find your perfect travel partner today.
          </p>
        </div>
      </div>
      <BackToHomePathButtons />
      <div className="w-full px-6 ">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Explore Tour Operators
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 max-w-5xl mx-auto ">
          {companies?.map((company, index) => (
            <CompanyCard key={index} company={company} />
          ))}
        </div>
      </div>
    </div>
  );
}
