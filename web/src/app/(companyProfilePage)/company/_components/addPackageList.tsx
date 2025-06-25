"use client";

import { useEffect, useState } from "react";
import { api } from "@/axios";
import { PackageItemCard } from "./packageItemCard";
import { PackageItemType } from "@/app/_providers/AuthProvider";
import { usePackageContext } from "./PackageProvider";
import { Stepper } from "./ui/Stepper";
import { AlertDial } from "./Alert";
import { toast } from "sonner";
import { Loader } from "lucide-react";
export const PackageItemList = ({ packageId }: { packageId: string }) => {
  const { newPackage, addItemToPackage } = usePackageContext();
  const [items, setItems] = useState<PackageItemType[]>([]);
  const [order, setOrder] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");
  const duration = Number(newPackage?.duration) || 1;
  const packageItems = async () => {
    const res = await api.get("/packageItem");
    setItems(res.data.packageItem);
  };

  useEffect(() => {
    packageItems();
  }, [packageId]);

  const dur = Number(newPackage?.duration) || 1;
  const steps = Array.from({ length: dur }, (_, i) => `Day ${i + 1}`);

  const addToPackage = async () => {
    try {
      setLoading(true);
      if (newPackage?._id && selectedItemId) {
        await addItemToPackage(newPackage?._id, selectedItemId);
        toast.success("Successfully added to package");
      }
      if (order < duration) {
        setOrder(order + 1);
      } else {
        setIsOpen(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add item to package");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-6 w-full pb-24 relative">
      <Stepper steps={steps} currentStep={order} />

      <div className="grid grid-cols-1 gap-4 mt-4">
        {items.map((item) => (
          <PackageItemCard
            key={`${item.destinationId}-${item._id}`}
            title={item.title}
            image={item.image}
            description={item.description}
            activity={item.activity}
            packageItemId={item._id}
            packageItems={packageItems}
            setSelectedItemId={setSelectedItemId}
          />
        ))}
      </div>

      <AlertDial
        title="All itinerary days have been successfully created!"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="fixed bottom-4 left-0 w-full flex justify-center z-50">
        <button
          onClick={addToPackage}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition">
          {loading ? <Loader className="animate-spin" /> : "Submit Itinerary"}
        </button>
      </div>
    </div>
  );
};
