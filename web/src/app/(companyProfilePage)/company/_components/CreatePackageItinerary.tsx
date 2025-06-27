"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePackageContext } from "./PackageProvider";
import { CreatePackageItemForm } from "./CreatePackageItemForm";
import { PackageItemList } from "./addPackageList";

export const CreatePackageItinerary = () => {
  const { newPackage } = usePackageContext();
  const [viewMode, setViewMode] = useState<"create" | "list">("create");

  if (!newPackage) return null;

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 py-6 space-y-6">
      <div className="flex gap-4 mb-4">
        <Button
          variant={viewMode === "create" ? "default" : "outline"}
          onClick={() => setViewMode("create")}>
          ➕ Create New Itinerary
        </Button>
        <Button
          variant={viewMode === "list" ? "default" : "outline"}
          onClick={() => setViewMode("list")}>
          📋 View All Itineraries
        </Button>
      </div>

      {viewMode === "create" ? (
        <CreatePackageItemForm />
      ) : (
        <PackageItemList packageId={newPackage._id} />
      )}
    </div>
  );
};
