"use client";
import { useEffect, useState } from "react";
import { usePackageContext } from "./PackageProvider";
import { PackageCardSkeleton } from "./packageSkeleton";
import { Button } from "@/components/ui/button";
import { PackageCard } from "./packagecard";

type CompanyPackagesProps = {
  companyId: string;
};

export const CompanyPackages = ({ companyId }: CompanyPackagesProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { getPackages, packages, loading } = usePackageContext();

  useEffect(() => {
    if (companyId) {
      getPackages(companyId);
    }
  }, [companyId]);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <PackageCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (packages.length === 0) {
    return <div>No packages available.</div>;
  }

  const displayedPackages = isExpanded ? packages : packages.slice(0, 4);

  return (
    <section className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        All active travel packages
      </h3>

      <div
        className={`grid grid-cols-3 gap-6 transition-all duration-300 ${
          isExpanded ? "max-h-[600px] overflow-y-scroll pr-2" : ""
        }`}>
        {displayedPackages.map((item) => (
          <PackageCard key={item._id} packageId={item._id} />
        ))}
      </div>

      {packages.length > 4 && (
        <div className="mt-6 flex justify-center">
          <Button onClick={toggleExpanded}>
            {isExpanded ? "See Less" : "See More"}
          </Button>
        </div>
      )}
    </section>
  );
};
