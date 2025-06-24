"use client";
import Image from "next/image";
import { CompanyPackages } from "./companyPackages";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AddPackageForm } from "./addPackageForm";
import { PlusCircle, Camera } from "lucide-react";

export default function CompanyExplore() {
  const isCompanyLoggedIn = true;

  const companyId = "684b7452cf844286f738f2db";

  return (
    <div className="w-full min-h-screen flex flex-col gap-16 bg-white">
      <div className="relative w-full h-[65vh] overflow-hidden rounded-b-3xl shadow-lg">
        <Image
          src="https://res.cloudinary.com/idemo/image/upload/balloons"
          alt="Cover"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent z-10" />
        {isCompanyLoggedIn && (
          <div className="absolute top-4 right-6 z-30">
            <Button className="flex items-center gap-2 bg-yellow-400 text-white hover:bg-yellow-500 shadow-lg">
              <Camera size={16} />
              Edit Cover
            </Button>
          </div>
        )}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-white px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl">
            Welcome to our company&apos;s website.
          </h1>
          <p className="text-lg  drop-shadow-md">
            We will bring you an amazing journey.
          </p>
        </div>
      </div>
      {isCompanyLoggedIn && (
        <div className="w-full px-6  flex justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 shadow-md transition">
                <PlusCircle size={18} />
                Create Package
              </Button>
            </DialogTrigger>
            <AddPackageForm />
          </Dialog>
        </div>
      )}
      <div className="px-6 ">
        <CompanyPackages
          companyId={companyId}
          isCompanyLoggedIn={isCompanyLoggedIn}
        />
      </div>
    </div>
  );
}
