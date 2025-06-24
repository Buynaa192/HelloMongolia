"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CompanyType } from "@/app/_providers/AuthProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Star } from "lucide-react";
import { api } from "@/axios";

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
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-16 relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/30">
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

            <div className="flex-1">
              {loading || !companyInfo ? (
                <>
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-64 mb-3" />
                  <Skeleton className="h-4 w-32 mb-3" />
                  <Skeleton className="h-10 w-32 mt-4" />
                </>
              ) : (
                <>
                  <h1 className="text-3xl font-bold">{companyInfo.name}</h1>
                  <p className="text-sm text-gray-300 mt-1">
                    Since {companyInfo.since}
                  </p>
                  <p className="text-sm text-gray-300 mt-2">
                    {companyInfo.about}
                  </p>

                  <div className="flex items-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(companyInfo.Rating)
                            ? "text-yellow-400"
                            : "text-gray-600"
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
                        className="text-xs px-2 py-1 bg-white/20 rounded-full"
                      >
                        {d.destinationName}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-4">
                    {companyInfo.phoneNumber && (
                      <Button className="bg-white text-black hover:bg-white/80">
                        Call: {companyInfo.phoneNumber}
                      </Button>
                    )}
                    {companyInfo.websiteURL && (
                      <a
                        href={companyInfo.websiteURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="ghost"
                          className="text-white border border-white/20"
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

      <div className="mt-10 max-w-5xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-semibold mb-4">Company Overview</h2>
        {loading || !companyInfo ? (
          <Skeleton className="h-24 w-full" />
        ) : (
          <p className="text-gray-300">{companyInfo.about}</p>
        )}
      </div>
    </div>
  );
}
