"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/axios";
import { PackageCardSkeleton } from "./packageSkeleton";
import { PackageType } from "@/app/_providers/AuthProvider";
import Link from "next/link";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { UpdatePackageForm } from "./updatePackageForm";
import { Button } from "@/components/ui/button";
import { DeletePackage } from "./deletePackage";

type PackageCardProps = {
  packageId: string;
};

export const PackageCard = ({ packageId }: PackageCardProps) => {
  const [packageData, setPackageData] = useState<PackageType>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getPackage = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/package?packageId=${packageId}`);
        const data = response.data.packages?.[0];
        if (data) {
          setPackageData(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (packageId) getPackage();
  }, [packageId]);

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

  if (loading) return <PackageCardSkeleton />;
  if (!packageData) return null;

  return (
    <div className="w-full flex justify-center cursor-pointer">
      <div className="group w-[90%] min-h-[420px] rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 bg-white flex flex-col relative overflow-hidden">
        {packageData.coverPhoto ? (
          <img
            src={packageData.coverPhoto}
            alt={packageData.title}
            className="w-full h-[250px] object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 rounded-t-2xl">
            No Image Available
          </div>
        )}
        <div className="absolute top-0 left-0 w-full h-[250px] bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <span className="absolute top-0 left-0 w-full h-[250px] flex items-center justify-center text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          See more
        </span>

        <div className="flex flex-col flex-1 p-4 gap-2 z-30">
          <h2 className="text-[20px] font-bold line-clamp-2">
            {packageData.title}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-3">
            {packageData.description}
          </p>
          <div className="flex gap-1">{ratingStar(packageData.rating)}</div>
          <div className="flex flex-row justify-between gap-4">
            <span>
              {packageData.duration}{" "}
              {Number(packageData.duration) === 1 ? "day" : "days"}
            </span>
            <span className="text-xl font-bold text-green-500">
              ${packageData.cost}
            </span>
          </div>
          <div className="mt-6 flex flex-col justify-between sm:flex-row sm:flex-wrap gap-4 w-full">
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
    </div>
  );
};
