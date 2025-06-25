"use client";

import { Star } from "lucide-react";
import { PackageType } from "@/app/_providers/AuthProvider";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DeletePackage } from "./deletePackage";
import { useState } from "react";
import { usePackageContext } from "./PackageProvider";
import { UpdatePackageForm } from "@/app/(customer)/companies/[id]/_components/updatePackageForm";

type Props = {
  packageData: PackageType;
};

export const PackageDialogContent = ({ packageData }: Props) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const { deletePackageItem } = usePackageContext();

  const toggleDay = (order: number) => {
    setExpandedDay((prev) => (prev === order ? null : order));
  };

  const ratingStar = (rating: number) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={18}
        className={
          i <= rating - 1 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }
      />
    ));

  return (
    <DialogContent className="max-w-3xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-center text-green-700 mb-4">
          {packageData.title}
        </DialogTitle>
      </DialogHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={packageData.coverPhoto}
          alt={packageData.title}
          className="w-full h-[300px] object-cover rounded-xl"
        />
        <div className="space-y-3 text-sm text-gray-700">
          <p>{packageData.description}</p>
          <p>
            <strong>Duration:</strong> {packageData.duration} days
          </p>
          <p>
            <strong>Cost:</strong>{" "}
            <span className="text-green-600 font-semibold">
              ${packageData.cost}
            </span>
          </p>
          <p className="flex gap-2 items-center">
            <strong>Rating:</strong> {ratingStar(packageData.rating)}
          </p>
          <p>
            <strong>Trip Type:</strong>{" "}
            <span className="inline-block px-3 py-1 text-xs bg-emerald-100 text-emerald-800 rounded-full">
              {packageData.tripType}
            </span>
          </p>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-yellow-500 text-white hover:bg-yellow-600 shadow-md w-full sm:w-auto">
                Update
              </Button>
            </DialogTrigger>
            <UpdatePackageForm packageData={packageData} />
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-red-600 text-white hover:bg-red-700 shadow-md w-full sm:w-auto">
                Delete
              </Button>
            </DialogTrigger>
            <DeletePackage
              title={packageData.title}
              packageId={packageData._id}
            />
          </Dialog>
        </div>
      </div>

      <div className="space-y-4 mt-6">
        <h3 className="text-lg font-semibold">Itinerary</h3>
        {packageData.packageItem
          ?.sort((a, b) => a.order - b.order)
          .map((item) => (
            <div
              key={item._id}
              className="border rounded-xl shadow-sm bg-cover bg-center min-h-[200px] text-white"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(255,255,255,0.4), rgba(0,0,0,0.4)), url(${item.image})`,

                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundBlendMode: "overlay",
              }}
            >
              <button
                className="w-full px-4 py-3 flex justify-between items-center text-left font-semibold text-white hover:bg-black/10 transition"
                onClick={() => toggleDay(item.order)}
              >
                <span className="drop-shadow-sm text-white">{`Day ${item.order}: ${item.title}`}</span>
                <span className="text-white drop-shadow-sm">
                  {expandedDay === item.order ? "▲" : "▼"}
                </span>
              </button>

              {expandedDay === item.order && (
                <div className="px-4 pb-4 space-y-2 bg-white/90 backdrop-blur-sm rounded-b-xl text-gray-800">
                  <p className="text-sm leading-relaxed">{item.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                    {item.activity.map((act) => (
                      <div
                        key={act._id}
                        className="flex gap-4 p-2 bg-white/90 rounded-lg items-center shadow-sm border border-gray-200"
                      >
                        <div className="flex flex-row gap-2 items-center">
                          <span className="text-xl">{act.emoji}</span>
                          <h5 className="font-medium text-gray-700">
                            {act.activityName}
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between gap-2 mt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          className="bg-yellow-500 hover:bg-yellow-600 text-white shadow-md"
                        >
                          Edit
                        </Button>
                      </DialogTrigger>
                    </Dialog>

                    <Button
                      size="sm"
                      variant="destructive"
                      className="shadow-md"
                      onClick={() => deletePackageItem(item._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </DialogContent>
  );
};
