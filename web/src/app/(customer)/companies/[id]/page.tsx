"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CompanyType } from "@/app/_providers/AuthProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Star } from "lucide-react";
import { api } from "@/axios";
import { PackageCardForCompany } from "../../_components/ariukasComponents/PackageCard";

export default function CompanyProfile() {
  const params = useParams();
  const companyID = params.id;

  const [loading, setLoading] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<CompanyType | null>(null);

  useEffect(() => {
    const getCompany = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/company?companyId=${companyID}`);
        setCompanyInfo(res.data.companies[0]);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      } finally {
        setLoading(false);
      }
    };

    getCompany();
  }, [companyID]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative w-full h-[300px] md:h-[400px]">
        {loading || !companyInfo?.background ? (
          <Skeleton className="w-full h-full absolute" />
        ) : (
          <Image
            src={companyInfo.background}
            fill
            alt="Company Background"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-24 relative z-10">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white/20 shadow-md">
              {loading || !companyInfo?.AvatarImage ? (
                <Skeleton className="w-full h-full rounded-full" />
              ) : (
                <Image
                  src={companyInfo.AvatarImage}
                  alt={companyInfo?.name || "Avatar"}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex-1 w-full">
              {loading || !companyInfo ? (
                <>
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-64 mb-3" />
                  <Skeleton className="h-4 w-32 mb-3" />
                  <Skeleton className="h-10 w-32 mt-4" />
                </>
              ) : (
                <>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {companyInfo.name}
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    Since {companyInfo.since}
                  </p>
                  <p className="text-sm text-gray-300 mt-3 leading-relaxed">
                    {companyInfo.about}
                  </p>

                  <div className="flex items-center gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(companyInfo.Rating)
                            ? "text-yellow-400"
                            : "text-gray-700"
                        }`}
                        fill={
                          i < Math.round(companyInfo.Rating)
                            ? "currentColor"
                            : "transparent"
                        }
                      />
                    ))}
                    <span className="text-sm text-gray-400 ml-2">
                      {companyInfo.Rating.toFixed(1)} / 5 ({companyInfo.reviews}{" "}
                      reviews)
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {companyInfo.availableDestinations?.map((d, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 bg-white/15 rounded-full"
                      >
                        {d.destinationName}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {companyInfo.phoneNumber && (
                      <Button className="bg-white text-black hover:bg-white/80 transition">
                        Call: {companyInfo.phoneNumber}
                      </Button>
                    )}
                    {companyInfo.websiteURL && (
                      <a
                        href={
                          companyInfo.websiteURL.startsWith("http")
                            ? companyInfo.websiteURL
                            : `https://${companyInfo.websiteURL}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="ghost"
                          className="text-white border border-white/20 hover:bg-white/10 transition"
                        >
                          Visit Website
                        </Button>
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-[1440px] mx-auto px-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Company Overview
        </h2>
        {loading || !companyInfo ? (
          <Skeleton className="h-24 w-full" />
        ) : (
          <p className="text-gray-300 leading-relaxed">{companyInfo.about}</p>
        )}
      </div>

      <div className="mt-12 w-full mx-auto px-6 pb-2 ">
        <h2 className="text-xl  max-w-[1440px]  md:text-2xl font-semibold mb-4  lg:max-w-5xl">
          Our travel-plans
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto h-100">
          {companyInfo?.packages.map((pack, index) => (
            <PackageCardForCompany key={index} trip={pack} />
          ))}
        </div>
      </div>
    </div>
  );
}
