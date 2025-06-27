"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/axios";
import { PackageType } from "@/app/_providers/AuthProvider";
import { PackageCardSkeleton } from "../../_components/packageSkeleton";
import { PackageHeader } from "./_components/PackageHeader";
import { PackageSummary } from "./_components/PackageSummary";
import { PackageItinerary } from "./_components/PackageItinerary";
import { Button } from "@/components/ui/button";
import { MoveLeftIcon } from "lucide-react";

export default function PackageDetailPage() {
  const { packageId } = useParams();
  const [packageData, setPackageData] = useState<PackageType | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const getPackage = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/package?packageId=${packageId}`);
        const data = response.data.packages?.[0];
        if (data) setPackageData(data);
      } catch (err) {
        console.error("Failed to fetch package:", err);
      } finally {
        setLoading(false);
      }
    };

    if (packageId) getPackage();
  }, [packageId]);

  if (loading) return <PackageCardSkeleton />;
  if (!packageData)
    return <p className="text-center text-lg">Package not found.</p>;

  return (
    <div className="flex flex-col space-y-10">
      <div className="mb-4">
        <Button variant="outline" onClick={() => router.push("/company")}>
          ← Back
        </Button>
      </div>
      <PackageHeader
        title={packageData.title}
        description={packageData.description}
      />
      <PackageSummary packageData={packageData} router={router} />
      <PackageItinerary packageItems={packageData.packageItem} />
    </div>
  );
}
