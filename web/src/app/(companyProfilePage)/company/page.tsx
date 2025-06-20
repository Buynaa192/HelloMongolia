"use client";
import Image from "next/image";
import { CompanyPackages } from "./_components/companyPackages";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CompanyExplore() {
  const isCompanyLoggedIn = true;
  const companyId = "684b7452cf844286f738f2db";
  const router = useRouter();

  return (
    <div className="w-full min-h-screen flex flex-col gap-16 bg-white">
      <div className="w-full px-6  flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              onClick={() => router.push("./createPackage")}
              className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 shadow-md transition">
              <PlusCircle size={18} />
              Create Package
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
      <div className="px-6 ">
        <CompanyPackages
          companyId={companyId}
          isCompanyLoggedIn={isCompanyLoggedIn}
        />
      </div>
    </div>
  );
}
