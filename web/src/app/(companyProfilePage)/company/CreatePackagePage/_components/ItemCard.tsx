import React from "react";
import { PackageItemType } from "@/app/_providers/AuthProvider";
import { MapPin, Trash } from "lucide-react";
import { usePackageContext } from "../../_components/PackageProvider";

type Props = {
  item: PackageItemType;
  index: number;
  setItems: React.Dispatch<React.SetStateAction<PackageItemType[]>>;
};

export const ItemCard = ({ item, index, setItems }: Props) => {
  const { deletePackageItem } = usePackageContext();

  const handleDelete = async () => {
    try {
      await deletePackageItem(item._id);
      setItems((prevItems) => prevItems.filter((i) => i._id !== item._id));
    } catch (err) {
      console.error("Failed to delete package item:", err);
    }
  };

  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition text-sm flex justify-between gap-4 items-start">
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-bold">
            Day {index + 1}
          </span>
          <button
            onClick={handleDelete}
            className="p-1 rounded hover:bg-red-100 transition">
            <Trash className="text-red-500 w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1 text-gray-600 text-sm">
          <MapPin className="w-4 h-4" />
          <span>{item.destinationId?.destinationName || "No destination"}</span>
        </div>

        <div>
          <p className="font-medium text-gray-700">Activities:</p>
          {item.activity && item.activity.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-1">
              {item.activity.map((act) => (
                <span
                  key={act._id || act.activityName}
                  className="bg-gray-100 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <span>{act.emoji}</span>
                  <span>{act.activityName}</span>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No activities</p>
          )}
        </div>

        <div>
          <p className="font-medium text-gray-700">Accommodation:</p>
          <p className="text-gray-600">
            {item.accommodation?.hotelName || "No accommodation"}
          </p>
        </div>
      </div>

      {/* {item.destinationId?.destinationImages && (
        <img
          src={item.destinationId.destinationImages[0]}
          alt={item.destinationId.destinationName}
          className="w-28 h-28 object-cover rounded-lg shadow border"
        />
      )} */}
    </div>
  );
};
