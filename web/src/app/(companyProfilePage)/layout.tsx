"use client";

import { PropsWithChildren } from "react";
import { PackageProvider } from "./company/_components/PackageProvider";
import Sidebar from "./company/_components/SideBar";

export default function CustomerLayout({ children }: PropsWithChildren) {
  return (
    <PackageProvider>
      <div className="flex h-screen bg-black text-gray-800">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </PackageProvider>
  );
}
