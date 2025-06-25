import { ActivityType } from "@/app/_providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useState } from "react";

type PackageItemCardProps = {
  title: string;
  image: string;
  description: string;
  activity: ActivityType[];
  packageId: string;
  packageItemId: string;
  packageItems: () => Promise<void>;
  setSelectedItemId: (value: string) => void;
};

export const PackageItemCard = ({
  title,
  image,
  description,
  activity,
  packageId,
  packageItemId,
  setSelectedItemId,
}: PackageItemCardProps) => {
  const [loading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // const removeFromPackage = async () => {
  //   try {
  //     setLoading(true);
  //     await api.delete(`/package/${packageId}/removeItem/${packageItemId}`);
  //     setIsAdded(true);
  //     toast.success("Package item removed successfully");
  //     setIsAdded(false);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Failed ");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
            <span className="text-blue-600 font-medium">#{title}</span>
          </div>

          <p className="text-sm text-gray-700 line-clamp-3">{description}</p>

          <div className="flex flex-wrap gap-2 mt-2">
            {activity.map((act, idx) => (
              <span
                key={idx + 10}
                className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                {act.activityName}
              </span>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <Button
              onClick={() => {
                setSelectedItemId(packageItemId);
                setIsAdded(true);
              }}
              disabled={isAdded}
              className={`text-white transition ${
                isAdded
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}>
              {isAdded ? "Added" : "Add to Package"}
            </Button>
            {isAdded && (
              <Button
                className="bg-red-400 text-white hover:bg-red-500 transition"
                onClick={() => {
                  setIsAdded(false);
                }}>
                remove
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
