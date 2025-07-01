"use client";

import { Clock, Edit, MapPin, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/axios";
import { PackageCardSkeleton } from "./packageSkeleton";
import { PackageType } from "@/app/_providers/AuthProvider";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { DeletePackage } from "./deletePackage";
import Link from "next/link";

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

  if (loading) return <PackageCardSkeleton />;
  if (!packageData) return null;

  return (
    <div className="w-full flex justify-center ">
      <div className="group w-full min-h-[420px] rounded-[10px] shadow-xl hover:shadow-2xl border-[1px] border-[#27272a] transition-all duration-200 bg-white flex flex-col relative overflow-hidden">
        <Link href={`/travel-plans/${packageData._id}`}>
          {packageData.coverPhoto ? (
            <img
              src={packageData.coverPhoto}
              alt={packageData.title}
              className="w-full h-[250px] object-cover rounded-t-[10px] transition-transform duration-300 "
            />
          ) : (
            <div className="w-full h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 rounded-t-2xl">
              No Image Available
            </div>
          )}
        </Link>

        <div className="flex flex-col text-white bg-black flex-1 p-4 gap-2 z-30">
          <div className="flex justify-between">
            <h2 className="text-[20px] font-bold line-clamp-2">
              {packageData.title}
            </h2>
            <div className="text-[12px] flex items-center rounded-2xl px-3 font-bold bg-[#27272a] text-white">
              ${packageData.cost}
            </div>
          </div>
          <p className="text-sm text-[#a1a1aa] line-clamp-3">
            {packageData.description}
          </p>
          <div className="flex flex-row justify-between gap-4">
            <span className="text-sm text-[#a1a1aa] flex items-center gap-2">
              <Clock size={18} />
              {packageData.duration}{" "}
              {Number(packageData.duration) === 1 ? "day" : "days"}
            </span>
          </div>
          {packageData.packageItem.map((item) => (
            <div className="flex items-center gap-2" key={item._id}>
              <MapPin size={14} color="gray" />
              Day {item.order}: {item.title}
            </div>
          ))}
          <div className="mt-6 flex flex-col justify-between sm:flex-row sm:flex-wrap gap-4 w-full">
            <div className="flex flex-1">
              <Link href={`/company/UpdatePackage/${packageId} `}>
                <Button className="bg-black border border-[#27272a] shadow-md w-full sm:flex-none">
                  <Edit />
                  Edit
                </Button>
              </Link>
            </div>
            <div className="flex flex-1">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-black border border-[#27272a] text-white shadow-md flex-1 w-full sm:flex-none">
                    <Trash2 />
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
    </div>
  );
};
