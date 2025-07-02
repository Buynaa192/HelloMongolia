"use client";
import { useEffect, useState } from "react";
import { PackageCardSkeleton } from "./packageSkeleton";
import { Button } from "@/components/ui/button";
import { DestinationType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import { DestinationCard } from "./destinationCard";

type CompanyPackagesProps = {
  companyId: string;
};

export const CompanyDestinations = ({ companyId }: CompanyPackagesProps) => {
  const [error, setError] = useState<string | null>(null);
  const [destinations, setDestinations] = useState<DestinationType[]>();
  const [loading, setLoading] = useState(false);
  const [searchDestination, setSearchDestination] = useState("");
  useEffect(() => {
    const getDestination = async (companyId: string) => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/destination/byCompanyId/${companyId}`);
        const data = res.data.destinations;
        if (data) {
          setDestinations(data);
        } else {
          setDestinations([]);
          setError("Invalid destination  data");
        }
      } catch (error) {
        console.error("getDestination error:", error);
        setError("Failed to fetch destinations.");
      } finally {
        setLoading(false);
      }
    };
    if (companyId) {
      getDestination(companyId);
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

  if (destinations?.length === 0) {
    return <div>No destinations found</div>;
  }

  const filteredDestinations =
    destinations?.filter((dest) =>
      dest.destinationName
        .toLowerCase()
        .includes(searchDestination.toLowerCase())
    ) || [];

  return (
    <section className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        All active travel destinations
      </h3>
      <input
        type="text"
        placeholder="Search destinations..."
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        value={searchDestination}
        onChange={(e) => setSearchDestination(e.target.value)}
      />
      <div
        className={`grid grid-cols-3 gap-6 items-stretch transition-all duration-300`}
      >
        {displayedDestination?.map((item) => (
          <DestinationCard key={item._id} destinationId={item._id} />
        ))}
      </div>

      {filteredDestinations.length > 6 && (
        <div className="mt-6 flex justify-center">
          <Button onClick={toggleExpanded}>
            {isExpanded ? "See Less" : "See More"}
          </Button>
        </div>
      )}
    </section>
  );
};
