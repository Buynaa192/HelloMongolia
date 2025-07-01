"use client";
import { useEffect, useState } from "react";
import { usePackageContext } from "./PackageProvider";

import { Button } from "@/components/ui/button";
import { PackageCard } from "./packagecard";

type CompanyPackagesProps = {
  companyId: string;
};

export const CompanyPackages = ({ companyId }: CompanyPackagesProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { getPackages, packages } = usePackageContext();
  useEffect(() => {
    if (companyId) {
      getPackages(companyId);
    }
  }, [companyId]);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };
  if (packages.length == 0) return <div>no packages to show</div>;
  return (
    <section className="rounded-xl shadow-md mb-8">
      <div
        className={`grid grid-cols-4 gap-6 transition-all duration-300 ${
          isExpanded ? "max-h-[600px] overflow-y-scroll pr-2" : ""
        }`}>
        {packages.map((item) => (
          <PackageCard key={item._id} packageId={item._id} />
        ))}
      </div>

      {packages.length > 9 && (
        <div className="mt-6 flex justify-center">
          <Button onClick={toggleExpanded}>
            {isExpanded ? "See Less" : "See More"}
          </Button>
        </div>
      )}
    </section>
  );
};
