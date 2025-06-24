"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { CompanyPackages } from "./_components/companyPackages";
import { usePackageContext } from "./_components/PackageProvider";
import { CreatePackage } from "./_components/createPackage";
import { CompanyDestinations } from "./_components/companyDestinations";
import Sidebar from "./_components/SideBar";
import { useAuth } from "@/app/_providers/AuthProvider";

export default function TravelDashboard() {
  const { view } = usePackageContext();
  const { company } = useAuth();
  return (
    <div className="flex h-screen bg-gradient-to-br from-black-400 to-gray-900 text-gray-800">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        {view === "dashboard" && (
          <>
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

            <div className="grid grid-cols-3 gap-6 mt-8">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Best Destination</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2"></CardContent>
              </Card>
            </div>
          </>
        )}

        {view === "create" && <CreatePackage />}
      </main>
    </div>
  );
}
