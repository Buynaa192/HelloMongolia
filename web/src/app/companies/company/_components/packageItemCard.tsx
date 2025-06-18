import { ActivityType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type PackageItemCardProps = {
  order: number;
  title: string;
  image: string;
  description: string;
  activity: ActivityType[];
  packageId: string;
  packageItemId: string;
};

export const PackageItemCard = ({
  order,
  title,
  image,
  description,
  activity,
  packageId,
  packageItemId,
}: PackageItemCardProps) => {
  const [loading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const addToPackage = async () => {
    try {
      setLoading(true);
      const response = await api.post(`/package/addPackageItem/${packageId}`, {
        packageItemId,
      });
      setIsAdded(true);
      toast.success("Successfully added to package");
    } catch (error: any) {
      toast.error("Failed to add item to package");
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
                {act.name}
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
            <Button
              // onClick={deletePackageItem}
              disabled={loading || isAdded}
              className={`text-white transition ${
                isAdded
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}>
              {loading ? <Loader className="animate-spin w-4 h-4" /> : "delete"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
