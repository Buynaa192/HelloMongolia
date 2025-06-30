"use client";

import { PackageType } from "@/app/_providers/AuthProvider";
import BasicGoogleMapWithDirections from "@/app/maptest/_component/PackageGoogleMap";
import { api } from "@/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { ImageSlideHead } from "../_components/ImageSlideHeader";
import { ItineraryContent } from "../_components/ItineraryContent";
import { Itinerary } from "../_components/Itinerary";
import { CompanyDetails } from "../_components/companyDetails";
type Params = {
  id: string;
};
export default function PackagePage() {
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState(false);
  const [packageDetail, setPackageDetail] = useState<PackageType>();

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setLoading(true);

        const { data } = await api.get(`/package?packageId=${id}`);

        setPackageDetail(data.packages[0]);
      } catch (err) {
        console.error("Failed to fetch packages", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, []);

  if (loading)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader className="animate-spin text-white" />
      </div>
    );

  if (!packageDetail) return null;

  return (
    <>
      <div className="w-full flex items-center flex-col gap-4 bg-transparent text-accent ">
        <ImageSlideHead packageDetail={packageDetail} />
        <div className="w-[1440px] flex flex-col gap-4">
          <Itinerary />
          <div className="w-full border-1 border-[#e4e4e5]"></div>
          <ItineraryContent packageDetail={packageDetail} />
          <CompanyDetails packageDetail={packageDetail} />
        </div>
      </div>

      <div className="w-[1440px]">
        <div className="text-accent text-4xl font-extrabold" style={{ fontFamily: "Dancing script" }}>
          Destinations in MAP
        </div>
        <BasicGoogleMapWithDirections packageDetail={packageDetail} />
      </div>
    </>
  );
}
