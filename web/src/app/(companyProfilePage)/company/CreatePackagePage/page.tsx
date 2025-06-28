"use client";

import { CreatePackage } from "../_components/createPackage";

export default function TravelDashboard() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-black-400 to-gray-900 text-gray-800">
      <main className="flex-1 p-8 overflow-y-auto">
        <CreatePackage />
      </main>
    </div>
  );
}
