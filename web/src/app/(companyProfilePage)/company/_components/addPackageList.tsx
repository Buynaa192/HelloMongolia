"use client";

import { useEffect, useState } from "react";
import { api } from "@/axios";
import { PackageItemCard } from "./packageItemCard";
import { PackageItemType } from "@/app/_providers/AuthProvider";
import { usePackageContext } from "./PackageProvider";
import { Stepper } from "./ui/Stepper";
import { AlertDial } from "./Alert";
export const PackageItemList = ({ packageId }: { packageId: string }) => {
  const { newPackage } = usePackageContext();
  const [items, setItems] = useState<PackageItemType[]>([]);
  const [order, setOrder] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const packageItems = async () => {
    const res = await api.get("/packageItem");
    setItems(res.data.packageItem);
  };

  useEffect(() => {
    packageItems();
  }, [packageId]);

  const dur = Number(newPackage?.duration) || 1;
  const steps = Array.from({ length: dur }, (_, i) => `Day ${i + 1}`);

  const handleSubmit = () => {
    console.log("Submit clicked!");
  };

  return (
    <div className="space-y-6 w-full pb-24 relative">
      <Stepper steps={steps} currentStep={order} />

      <div className="grid grid-cols-1 gap-4 mt-4">
        {items.map((item) => (
          <PackageItemCard
            key={item._id}
            title={item.title}
            image={item.image}
            description={item.description}
            activity={item.activity}
            packageId={packageId}
            packageItemId={item._id}
            packageItems={packageItems}
            order={order}
            setOrder={setOrder}
            setIsOpen={setIsOpen}
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
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition">
          Submit Itinerary
        </button>
      </div>
    </div>
  );
};
