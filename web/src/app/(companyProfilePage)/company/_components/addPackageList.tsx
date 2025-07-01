import React, { useEffect, useState } from "react";
import { api } from "@/axios";
import { PackageItemType } from "@/app/_providers/AuthProvider";
import { usePackageContext } from "./PackageProvider";
import { Stepper } from "./ui/Stepper";
import { AlertDial } from "./Alert";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { PackageItemCard } from "./packageItemCard";

export const PackageItemList = ({ packageId }: { packageId: string }) => {
  const { addItemToPackage } = usePackageContext();
  const [items, setItems] = useState<PackageItemType[]>([]);
  const [order, setOrder] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<null | string>(null);

  const duration = 1;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/packageItem");
        setItems(res.data.packageItem);
      } catch (err) {
        console.log("err", err);
        toast.error("Failed to load items");
      }
    };
    fetchItems();
  }, [packageId]);

  const steps = Array.from({ length: duration }, (_, i) => `Day ${i + 1}`);

  const handleNext = async () => {
    if (!selectedItemId) {
      toast.error("Please select an item first");
      return;
    }
    setLoading(true);
    try {
      await addItemToPackage(packageId, selectedItemId);
      toast.success(`Day ${order} added`);
      if (order < duration) {
        setOrder(order + 1);
        setSelectedItemId(null);
      } else {
        setIsComplete(true);
      }
    } catch {
      toast.error("Failed to add itinerary day");
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
            key={item._id}
            title={item.title}
            image={item.image}
            description={item.description}
            activity={item.activity}
            packageId={packageId}
            packageItemId={item._id}
            setSelectedItemId={setSelectedItemId}
          />
        ))}
      </div>

      <AlertDial
        title="All itinerary days have been successfully created!"
        isOpen={isComplete}
        setIsOpen={setIsComplete}
      />

      <div className="fixed bottom-4 left-0 w-full flex justify-center z-50">
        <button
          onClick={handleNext}
          disabled={loading}
          className={`px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2 \${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
          {loading ? (
            <Loader className="animate-spin" />
          ) : order < duration ? (
            `Add Day ${order}`
          ) : (
            "Finish Itinerary"
          )}
        </button>
      </div>
    </div>
  );
};
