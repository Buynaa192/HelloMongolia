"use client";
import { PackageType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import { useEffect, useState } from "react";
import { PackageCard } from "./packageCard";
import { PackageCardSkeleton } from "./packageSkeleton";

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

  useEffect(() => {
    const packages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/package/${companyId}`);
        const data = response.data;
        if (data?.packages) {
          setPackages(data.packages);
        } else {
          setPackages([]);
          setError("Invalid package data");
        }
      } catch (error) {
        console.log("error:", error);
        setError("An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      packages();
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
    <div className="grid grid-cols-3 gap-4">
      {packages.map((item) => (
        <PackageCard
          key={item._id}
          loading={false}
          image={item.coverPhoto}
          title={item.description}
          description={item.description}
          price={`$${item.cost}`}
          isCompanyLoggedIn={isCompanyLoggedIn}
          Update={() => console.log("Update", item._id)}
          Delete={() => console.log("Delete", item._id)}
        />
      ))}
    </div>
  );
};
