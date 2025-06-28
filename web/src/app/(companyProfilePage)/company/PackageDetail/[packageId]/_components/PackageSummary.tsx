"use client";

import { useRouter } from "next/navigation";
import { PackageType } from "@/app/_providers/AuthProvider";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { UpdatePackageForm } from "../../../_components/updatePackageForm";
import { DeletePackage } from "../../../_components/deletePackage";

type Props = {
  packageData: PackageType;
  router: ReturnType<typeof useRouter>;
};

export function PackageSummary({ packageData }: Props) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/10 p-6 rounded-xl">
      <img
        src={packageData.coverPhoto}
        alt={packageData.title}
        className="w-full h-[400px] object-cover rounded-xl shadow"
      />

      <div className="space-y-4 text-sm text-white">
        <p>
          <strong>Duration:</strong> {packageData.duration} days
        </p>
        <p>
          <strong>Cost:</strong>{" "}
          <span className="text-green-400">${packageData.cost}</span>
        </p>
        <div className="flex flex-row">
          <strong>Rating:</strong> {ratingStar(packageData.rating)}
        </div>
        <p>
          <strong>Trip Type:</strong>{" "}
          <span className="inline-block px-3 py-1 text-xs bg-emerald-200 text-emerald-800 rounded-full">
            {packageData.tripType}
          </span>
        </p>
        <p>
          <strong>Available:</strong>{" "}
          {new Date(packageData.availableFrom).toLocaleDateString()} —{" "}
          {new Date(packageData.availableUntil).toLocaleDateString()}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-4 w-full">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-yellow-500 text-white hover:bg-yellow-600 shadow-md flex-1 sm:flex-none">
                Update
              </Button>
            </DialogTrigger>
            <UpdatePackageForm packageData={packageData} />
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-red-600 text-white hover:bg-red-700 shadow-md flex-1 sm:flex-none">
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
    </div>
  );
}
