"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { CompanyPackages } from "./_components/companyPackages";
import { CompanyDestinations } from "./_components/companyDestinations";
import { useAuth } from "@/app/_providers/AuthProvider";
export default function TravelDashboard() {
  const { company } = useAuth();
  return (
    <div className="flex h-screen bg-gradient-to-br from-black-400 to-gray-900 text-gray-800">
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">Hello!</h2>
            <p className="text-sm text-gray-600">
              Welcome back and explore the world.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Input placeholder="Search Destination..." className="w-64" />
            <div className="flex items-center gap-2">
              <Image
                src="https://res.cloudinary.com/idemo/image/upload/eytykctytgopvpgxfrzk"
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </div>
        </header>

        {company?._id && <CompanyPackages companyId={company._id} />}

        <div className="col-span-1 space-y-4">
          {company?._id && <CompanyDestinations companyId={company?._id} />}
        </div>
      </main>
    </div>
  );
}
