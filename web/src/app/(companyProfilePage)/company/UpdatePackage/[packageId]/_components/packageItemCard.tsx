import React, { useState } from "react";
import { PackageItemType } from "@/app/_providers/AuthProvider";
import { MapPin, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePackageContext } from "../../../_components/PackageProvider";
import { UpdatePackageItemsForm } from "./UpdatePackageItem";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";

type Props = {
  item: PackageItemType;
  index: number;
  getPackage: () => Promise<void>;
};

export const PackageItemCard = ({ item, index, getPackage }: Props) => {
  const { deletePackageItem } = usePackageContext();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deletePackageItem(item._id);
      getPackage();
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

        <div className="flex flex-row justify-between">
          <button
            onClick={() => setDeleteOpen(true)}
            className="p-1 rounded hover:bg-red-100 transition">
            <Trash className="text-red-500 w-6 h-6" />
          </button>

          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <Button className="text-white bg-yellow-500 rounded hover:bg-yellow-700 transition">
                Edit
              </Button>
            </DialogTrigger>
            <UpdatePackageItemsForm
              packageItem={item}
              getPackage={getPackage}
              setIsOpen={setEditOpen}
            />
          </Dialog>
        </div>
      </div>

      <ConfirmDeleteDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        title="Are you sure you want to delete this day?"
        onConfirm={handleDelete}
      />
    </div>
  );
};
