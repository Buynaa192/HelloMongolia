"use client";

import { useState } from "react";
import {
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutDashboardIcon,
  PlusSquareIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/_providers/AuthProvider";
import { usePackageContext } from "./PackageProvider";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { company, signOut } = useAuth();
  const { view, setView } = usePackageContext();
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } transition-all duration-300 bg-gray-950 text-gray-100 p-4 flex flex-col  rounded-r-2xl shadow-xl border-r border-gray-800`}>
      <div>
        <div className="flex items-center justify-between mb-6">
          {!collapsed && (
            <h1 className="text-xl font-bold text-emerald-400 truncate">
              {company?.name || "Company"}
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-white transition">
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex flex-col space-y-2">
          <Button
            variant="ghost"
            className={`justify-start px-3 py-2 flex items-center gap-3 rounded-md transition text-sm ${
              view === "Dashboard"
                ? "bg-emerald-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
            onClick={() => {
              setView("Dashboard");
              router.push("/company");
            }}>
            <LayoutDashboardIcon size={18} />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className={`justify-start px-3 py-2 flex items-center gap-3 rounded-md transition text-sm ${
              view === "Create Package"
                ? "bg-emerald-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
            onClick={() => {
              setView("Create Package");
              router.push("/company/CreatePackagePage");
            }}>
            <PlusSquareIcon size={18} />
            Create Package
          </Button>
          <Button
            variant="ghost"
            className={`justify-start px-3 py-2 flex items-center gap-3 rounded-md transition text-sm ${
              view === "Account settings"
                ? "bg-emerald-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
            onClick={() => {
              setView("Account settings");
              router.push("/company/AccountSettings");
            }}>
            <PlusSquareIcon size={18} />
            Account settings
          </Button>
        </nav>
      </div>

      <Button
        onClick={() => signOut()}
        variant="ghost"
        className="w-full justify-start px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white mt-6">
        <LogOut size={18} className="mr-2" />
        {!collapsed && "Log Out"}
      </Button>
    </aside>
  );
}
