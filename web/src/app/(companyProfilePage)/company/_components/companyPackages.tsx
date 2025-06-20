"use client";
import { PackageType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import { useEffect, useState } from "react";

import { PackageCardSkeleton } from "./packageSkeleton";
import { PackageCard } from "./packageCard";
import { usePackageContext } from "./PackageProvider";

type CompanyPackagesProps = {
  companyId: string;
  isCompanyLoggedIn: boolean;
};

export const CompanyPackages = ({
  companyId,
  isCompanyLoggedIn,
}: CompanyPackagesProps) => {
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { getPackages } = usePackageContext();
  useEffect(() => {
    if (companyId) {
      getPackages(companyId);
    }
  }, [companyId]);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <PackageCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (packages.length === 0) {
    return <div>No packages available.</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-8">
      {packages.map((item) => (
        <PackageCard
          key={item._id}
          loading={false}
          isCompanyLoggedIn={isCompanyLoggedIn}
          packages={item}
          image={item.coverPhoto}
          title={item.title}
          description={item.description}
          price={String(item.cost)}
          duration={item.duration}
          rating={item.rating}
        />
      ))}
    </div>
  );
};
