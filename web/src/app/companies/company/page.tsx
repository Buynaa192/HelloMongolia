"use client";

import { useAuth } from "@/app/_providers/AuthProvider";
import Image from "next/image";
import { CompanyPackages } from "./_components/companyPackages";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AddPackageForm } from "./_components/addPackageForm";

export default function CompanyExplore() {
  const { company } = useAuth();
  const isCompanyLoggedIn = true;

  const companyId = "684b7452cf844286f738f2db";

  return (
    <div className="w-full min-h-screen flex flex-col gap-12 bg-white">
      <div className="relative w-full h-[60vh] overflow-hidden rounded-b-3xl shadow-lg">
        <Image
          src="https://res.cloudinary.com/idemo/image/upload/balloons"
          alt="Cover"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 z-10 " />
        {isCompanyLoggedIn && (
          <div className="absolute top-4 right-8 z-30 ">
            <Button className="bg-yellow-400 text-white hover:bg-yellow-500 shadow">
              Edit Cover Photo
            </Button>
          </div>
        )}

        <div className="absolute inset-0 flex flex-col justify-center items-center z-20 text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Welcome to our company's website.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl drop-shadow-md">
            We will bring you an amazing journey.
          </p>
        </div>
      </div>

      {isCompanyLoggedIn && (
        <div className="w-full px-6 flex justify-end ">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                + Create package
              </Button>
            </DialogTrigger>
            <AddPackageForm />
          </Dialog>
        </div>
      )}
      <div className="px-6 md:px-20">
        <CompanyPackages
          companyId={companyId}
          isCompanyLoggedIn={isCompanyLoggedIn}
        />
      </div>
    </div>
  );
}
