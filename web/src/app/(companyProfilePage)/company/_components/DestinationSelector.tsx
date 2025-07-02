import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/axios";
import { NewDestinationForm } from "./NewDestinationForm";
import Link from "next/link";

type DestinationType = {
  _id: string;
  destinationName: string;
  destinationImages: string[];
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
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const loadDestinations = async () => {
    try {
      const res = await api.get("/destination");
      setDestinations(res.data.destinations);
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
    : filteredDestinations.slice(0, 3);

  const handleCreateSuccess = (newId: string) => {
    setDestinationId(newId);
    setModalOpen(false);
    loadDestinations();
  };
  const selectedDestination = useMemo(() => {
    return destinations.find((d) => d._id === selectedId);
  }, [selectedId, destinations]);
  return (
    <>
      <FormItem>
        <FormLabel>Search destinations by name</FormLabel>
        <input
          type="text"
          placeholder="Search destinations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
      </FormItem>

      {selectedDestination && (
        <div className="mb-4 text-sm text-gray-600">
          ✅ Selected destination:{" "}
          <span className="font-medium text-black">
            {selectedDestination.destinationName}
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {visibleDestinations.map((dest) => (
          <div
            key={dest._id}
            onClick={() => setDestinationId(dest._id)}
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

      {filteredDestinations.length > 3 && (
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
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">+ Create a new destination</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
            <DialogHeader>
              <DialogTitle>Create New Destination</DialogTitle>
              <DialogDescription>
                Fill in the destination details below.
              </DialogDescription>
            </DialogHeader>

            <NewDestinationForm
              onCreate={handleCreateSuccess}
              onClose={() => setModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
