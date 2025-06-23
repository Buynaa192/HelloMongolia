"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { CompanyType } from "../_providers/AuthProvider";
import { api } from "@/axios";

export default function ExploreCompanies() {
  const [companies, setCompanies] = useState<CompanyType[]>([]);

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
    <div className="min-h-screen w-full bg-black text-white px-6 py-10">
      <div></div>
      <h1 className="text-3xl font-bold mb-8 text-center">
        Explore Tour Operators
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {companies?.map((company) => (
          <div
            key={company._id}
            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg flex gap-4"
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden">
              <Image
                src="https://res.cloudinary.com/df60cobe2/image/upload/v1750327943/nteLogo_jthqil.png"
                alt={company.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{company.name}</h2>
              <p className="text-sm text-gray-300 mt-1">{company.about}</p>

              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(company.Rating)
                        ? "text-yellow-400"
                        : "text-gray-500"
                    }`}
                    fill={
                      i < Math.round(company.Rating)
                        ? "currentColor"
                        : "transparent"
                    }
                  />
                ))}
                <span className="text-sm text-gray-400 ml-1">
                  {company.Rating.toFixed(1)}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {company.availableDestinations?.map((d, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-white/20 rounded-full"
                  >
                    {d.destinationName}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
