"use client";

import { PackageType } from "@/app/_providers/AuthProvider";
import BasicGoogleMapWithDirections from "@/app/maptest/_component/PackageGoogleMap";
import { api } from "@/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { ImageSlideHead } from "../_components/ImageSlideHeader";
import { ItineraryContent } from "../_components/ItineraryContent";
import { CompanyDetails } from "../_components/companyDetails";
import { CostOverview } from "../_components/costOverview";
import { TourBy } from "../_components/TourBy";
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
        <div className="w-[1440px] flex  gap-4  justify-between">
          <div className="w-full flex flex-col gap-4">
            <CompanyDetails packageDetail={packageDetail} />
            <ItineraryContent packageDetail={packageDetail} />
          </div>
          <div className="w-100  flex flex-col gap-3 sticky top-20 z-20 h-fit">
            <CostOverview packageDetail={packageDetail} />
            <TourBy packageDetail={packageDetail} />
          </div>
        </div>
      </div>

      <div className="w-[1440px] mt-10">
        <div className="text-accent text-3xl font-extrabold " style={{ fontFamily: "Dancing script" }}>
          Destinations in MAP
        </div>
        <BasicGoogleMapWithDirections packageDetail={packageDetail} />
      </div>
    </>
  );
}
