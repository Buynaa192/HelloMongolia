"use client";
import { useParams } from "next/navigation";
import { UpdatePackageForm } from "./_components/updatePackageForm";

export default function UpdatePackageHome() {
  const params = useParams();
  const packageId = params?.packageId;

  if (typeof packageId !== "string") {
    return <div className="text-red-500 p-8">Invalid package ID</div>;
  }
  return (
    <div className="flex h-screen bg-gradient-to-br from-black-400 to-gray-900 text-gray-800">
      <main className="flex-1 p-8 overflow-y-auto">
        <UpdatePackageForm packageId={packageId} />
      </main>
    </div>
  );
}
