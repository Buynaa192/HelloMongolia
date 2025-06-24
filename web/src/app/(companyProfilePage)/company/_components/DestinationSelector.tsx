"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { api } from "@/axios";
import { NewDestinationForm } from "./NewDestinationForm";

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

  const visibleDestinations = expanded
    ? destinations
    : destinations.slice(0, 3);

  const handleCreateSuccess = (newId: string) => {
    setDestinationId(newId);
    setModalOpen(false);
    loadDestinations();
  };

  return (
    <>
      <FormItem>
        <FormLabel>Choose Destination</FormLabel>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {visibleDestinations.map((dest) => (
            <div
              key={dest._id}
              onClick={() => setDestinationId(dest._id)}
              className={`cursor-pointer rounded-xl border p-3 shadow hover:ring-2 hover:ring-primary transition ${
                selectedId === dest._id
                  ? "border-blue-600 ring-2 ring-blue-500"
                  : "border-gray-200"
              }`}>
              <img
                src={dest.destinationImages[0]}
                alt={dest.destinationName}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <p className="text-center font-medium">{dest.destinationName}</p>
            </div>
          ))}
        </div>
        {destinations.length > 3 && (
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="text-blue-600 underline text-sm">
              {expanded ? "See less" : "See more"}
            </button>
          </div>
        )}

        <div className="mt-4 text-center">
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="bg-green-400 hover:bg-green-500">
                + Create New Destination
              </Button>
            </DialogTrigger>
            <NewDestinationForm
              onCreate={handleCreateSuccess}
              onClose={() => setModalOpen(false)}
            />
          </Dialog>
        </div>

        <FormMessage />
      </FormItem>
    </>
  );
};
