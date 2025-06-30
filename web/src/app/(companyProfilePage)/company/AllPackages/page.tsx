"use client";

import { useAuth } from "@/app/_providers/AuthProvider";
import { CompanyPackages } from "../_components/companyPackages";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Sidebar } from "lucide-react";

export default function TravelDashboard() {
  const { company } = useAuth();
  const router = useRouter();
  return (
    <div className="flex h-screen bg-gradient-to-br text-white">
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-6">
          <div className="flex gap-3 items-center text-[20px]">
            <Sidebar />
            Travel Packages
          </div>
          <div className="text-gray-900 flex items-center gap-2">
            <Button
              variant="ghost"
              className="bg-white "
              onClick={() => {
                router.push("/company/CreatePackagePage");
              }}
            >
              <Plus />
              Create a package
            </Button>
          </div>
        </header>

        {company?._id && <CompanyPackages companyId={company._id} />}
      </main>
    </div>
  );
}
