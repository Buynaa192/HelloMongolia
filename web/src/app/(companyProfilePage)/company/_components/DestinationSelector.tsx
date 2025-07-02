import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel } from "@/components/ui/form";
import { api } from "@/axios";
import { RefreshCcw } from "lucide-react";

type DestinationType = {
  _id: string;
  destinationName: string;
  destinationImages: string[];
  createdAt: string;
};

type DestinationSelectorProps = {
  selectedId: string;
  setDestinationId: (id: string) => void;
};

export const DestinationSelector = ({
  selectedId,
  setDestinationId,
}: DestinationSelectorProps) => {
  const [destinations, setDestinations] = useState<DestinationType[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const loadDestinations = async () => {
    try {
      const res = await api.get("/destination");
      const sorted = res.data.destinations.sort(
        (a: DestinationType, b: DestinationType) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
      setDestinations(sorted);
    } catch (error) {
      console.error("Failed to fetch destinations:", error);
    }
  };

  useEffect(() => {
    loadDestinations();
  }, []);
  const sortedDestinations = useMemo(() => {
    if (!selectedId) return destinations;
    const idx = destinations.findIndex((d) => d._id === selectedId);
    if (idx === -1) return destinations;
    const copy = [...destinations];
    const [newest] = copy.splice(idx, 1);
    return [newest, ...copy];
  }, [destinations, selectedId]);
  const filteredDestinations = useMemo(() => {
    if (!searchTerm) return sortedDestinations;
    return sortedDestinations.filter((d) =>
      d.destinationName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedDestinations, searchTerm]);

  const visibleDestinations = expanded
    ? filteredDestinations
    : filteredDestinations.slice(0, 4);

  const selectedDestination = useMemo(() => {
    return destinations.find((d) => d._id === selectedId);
  }, [selectedId, destinations]);
  return (
    <>
      <FormItem>
        <FormLabel>Search destinations by name</FormLabel>
        <div className="flex flex-row gap-2">
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          />
          <Button
            type="button"
            onClick={() => {
              loadDestinations();
            }}>
            <RefreshCcw />
          </Button>
        </div>
      </FormItem>

      {selectedDestination && (
        <div className="mb-4 text-sm text-gray-600">
          ✅ Selected destination:{" "}
          <span className="font-medium text-black">
            {selectedDestination.destinationName}
          </span>
        </div>
      )}

      <div className="grid grid-cols-2  gap-4">
        {visibleDestinations.map((dest) => (
          <div
            key={dest._id}
            onClick={() => {
              setDestinationId(dest._id);
              setExpanded(false);
            }}
            className={`cursor-pointer rounded-xl border p-3 shadow hover:ring-2 hover:ring-primary transition ${
              selectedId === dest._id
                ? "border-blue-600 ring-2 ring-blue-500"
                : "border-gray-200"
            }`}
          >
            <img
              src={dest.destinationImages[0]}
              alt={dest.destinationName}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <p className="text-center font-medium">{dest.destinationName}</p>
          </div>
        ))}
      </div>

      {destinations.length > 4 && (
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 underline text-sm"
          >
            {expanded ? "See less" : "See more"}
          </button>
        </div>
      )}

      <div className="mt-4 text-center">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            window.open("/company/CreateDestination", "_blank");
          }}>
          + Create a new destination
        </Button>
      </div>
    </>
  );
};
