import { ActivityType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { usePackageContext } from "./PackageProvider";
type PackageItemCardProps = {
  title: string;
  image: string;
  description: string;
  activity: ActivityType[];
  packageId: string;
  packageItemId: string;
  order: number;
  packageItems: () => Promise<void>;
  setOrder: (value: number) => void;
  setIsOpen: (value: boolean) => void;
};

export const PackageItemCard = ({
  title,
  image,
  description,
  activity,
  packageId,
  packageItemId,
  order,
  setOrder,
  setIsOpen,
}: PackageItemCardProps) => {
  const { newPackage, addItemToPackage } = usePackageContext();
  const [loading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const duration = Number(newPackage?.duration || 1);
  const addToPackage = async () => {
    try {
      setLoading(true);
      if (newPackage?._id && packageItemId) {
        await addItemToPackage(newPackage?._id, packageItemId);
      }

      setIsAdded(true);
      toast.success("Successfully added to package");
      if (order < duration) {
        setOrder(order + 1);
      } else {
        setIsOpen(true);
      }
      setIsAdded(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to add item to package");
    } finally {
      setLoading(false);
    }
  };

  const removeFromPackage = async () => {
    try {
      setLoading(true);
      await api.delete(`/package/${packageId}/removeItem/${packageItemId}`);
      setIsAdded(true);
      toast.success("Package item removed successfully");
      setIsAdded(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-stretch justify-center">
      <div className="flex w-[90%] min-h-[380px] rounded-2xl shadow-xl hover:shadow-2xl flex-col hover:w-[92%] duration-200 bg-white">
        <img
          src={image}
          alt={title}
          className="w-full h-[200px] rounded-t-2xl object-cover"
        />
        <div className="flex flex-col justify-between flex-1 p-4 gap-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Day {order}</span>
            <span className="text-blue-600 font-medium">#{title}</span>
          </div>

          <p className="text-sm text-gray-700 line-clamp-3">{description}</p>

          <div className="flex flex-wrap gap-2 mt-2">
            {activity.map((act, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                {act.activityName}
              </span>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <Button
              onClick={addToPackage}
              disabled={loading || isAdded}
              className={`text-white transition ${
                isAdded
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}>
              {loading ? (
                <Loader className="animate-spin w-4 h-4" />
              ) : isAdded ? (
                "Added"
              ) : (
                "Add to Package"
              )}
            </Button>
            {isAdded && (
              <Button
                className="bg-red-400 text-white hover:bg-red-500 transition"
                onClick={removeFromPackage}>
                {loading ? (
                  <Loader className="animate-spin w-4 h-4" />
                ) : (
                  `Remove from day ${order}`
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
