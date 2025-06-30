"use client";

import { useAuth } from "@/app/_providers/AuthProvider";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { CompanyPackages } from "../_components/companyPackages";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function TravelDashboard() {
  const { company } = useAuth();
  const router = useRouter();
  return (
    <div className="flex h-screen bg-gradient-to-br from-black-400 to-gray-900 text-gray-800">
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="bg-white "
              onClick={() => {
                router.push("/company/CreatePackagePage");
              }}>
              Create a package
            </Button>
          </div>
        </header>

        {company?._id && <CompanyPackages companyId={company._id} />}
      </main>
    </div>
  );
}
