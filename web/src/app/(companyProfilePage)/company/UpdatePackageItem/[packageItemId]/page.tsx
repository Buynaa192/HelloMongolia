"use client";

import { useParams } from "next/navigation";
import { UpdatePackageItemForm } from "../../PackageDetail/[packageId]/_components/UpdatePackageItem";

export default function TravelDashboard() {
  const { packageItemId } = useParams();
  const packageItemIdStr = Array.isArray(packageItemId)
    ? packageItemId[0]
    : packageItemId;

  if (!packageItemIdStr) {
    return <div>Itinerary not found</div>;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-black to-gray-900 text-gray-800">
      <main className="flex-1 p-8 overflow-y-auto">
        <UpdatePackageItemForm packageItemId={packageItemIdStr} />
      </main>
    </div>
  );
}
