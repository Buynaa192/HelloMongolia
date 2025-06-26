"use client";

import { PropsWithChildren } from "react";
import { PackageProvider } from "./company/_components/PackageProvider";
import Sidebar from "./company/_components/SideBar";

export default function CustomerLayout({ children }: PropsWithChildren) {
  return (
    <PackageProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-black-400 to-gray-900 text-gray-800">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </PackageProvider>
  );
}
