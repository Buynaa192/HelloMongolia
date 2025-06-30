"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, LayoutDashboardIcon, Package, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/_providers/AuthProvider";
import { usePackageContext } from "./PackageProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Sidebar() {
  const { company, signOut } = useAuth();
  const { view, setView } = usePackageContext();
  const router = useRouter();
  return (
    <aside className="w-64 transition-all duration-300 bg-[#18181b] text-gray-100 p-4 flex flex-col justify-between shadow-xl h-sc">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-white truncate">
            {company?.name || "Company"}
          </h1>
        </div>

        <nav className="">
          <div className="flex flex-col space-y-2">
            <Button
              variant="ghost"
              className={`justify-start px-3 py-2 flex items-center gap-3 rounded-md transition text-sm ${
                view === "Dashboard"
                  ? "bg-[#27272a] text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
              onClick={() => {
                setView("Dashboard");
                router.push("/company");
              }}
            >
              <LayoutDashboardIcon size={18} />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className={`justify-start px-3 py-2 flex items-center gap-3 rounded-md transition text-sm ${
                view === "Create Package"
                  ? "bg-[#27272a] text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
              onClick={() => {
                setView("Create Package");
                router.push("/company/AllPackages");
              }}
            >
              <Package size={18} />
              Packages
            </Button>
            <Button
              variant="ghost"
              className={`justify-start px-3 py-2 flex items-center gap-3 rounded-md transition text-sm ${
                view === "Account settings"
                  ? "bg-[#27272a] text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
              onClick={() => {
                setView("Account settings");
                router.push("/company/AccountSettings");
              }}
            >
              <Settings size={18} />
              Account settings
            </Button>
          </div>
        </nav>
      </div>
      <Popover>
        <PopoverTrigger>
          <div className="relative flex gap-1">
            <Image
              src={
                company?.AvatarImage ||
                "https://res.cloudinary.com/df60cobe2/image/upload/v1750665181/03_Amarbayasgalant_nhzt5k.jpg"
              }
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col max-h-10">
              <div className="flex items-center text-[16px] font-bold">
                {company?.name}
              </div>
              <div className="text-[10px] text-gray-500 flex">
                {company?.email}
              </div>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-50 p-0">
          <Button className="w-full" variant={"ghost"} onClick={signOut}>
            <LogOut size={18} className="mr-2" />
            Log out
          </Button>
        </PopoverContent>
      </Popover>
    </aside>
  );
}
