"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/axios";
import { PackageType } from "@/app/_providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import Sidebar from "../../_components/SideBar";

type Params = {
  packageId: string;
};

export default function Home() {
  const { packageId } = useParams<Params>();
  const [loading, setLoading] = useState(false);
  const [packageData, setPackageData] = useState<PackageType | null>(null);

  useEffect(() => {
    const getPackage = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/package?packageId=${packageId}`);
        const data = response.data.packages?.[0];
        if (data) {
          setPackageData(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (packageId) {
      getPackage();
    }
  }, [packageId]);

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold">
        Loading package information...
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="text-center text-lg font-semibold">
        Package not found.
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-black-400 to-gray-900 text-gray-800">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="space-y-4">
          <img
            src={packageData.coverPhoto}
            alt={packageData.title}
            className="w-full h-[300px] object-cover rounded-xl"
          />
          <h1 className="text-3xl font-bold">{packageData.title}</h1>
          <p className="text-gray-700">{packageData.description}</p>
          <p>
            <strong>Duration:</strong> {packageData.duration} days
          </p>
          <p>
            <strong>Cost:</strong>{" "}
            <span className="text-green-600 font-semibold">
              ${packageData.cost}
            </span>
          </p>
          <p className="flex gap-2 items-center">
            <strong>Rating:</strong>
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className={
                  index < packageData.rating
                    ? "text-yellow-400"
                    : "text-gray-300"
                }>
                ★
              </span>
            ))}
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Itinerary</h3>
          <div className="space-y-4">
            {packageData.packageItem?.map((item, index) => (
              <div
                key={item._id}
                className="border rounded-xl shadow-sm bg-cover bg-center min-h-[200px] text-white"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundBlendMode: "overlay",
                }}>
                <div className="w-full px-4 py-3 flex justify-between items-center bg-black/40 bg-opacity-50">
                  <h4 className="text-lg font-semibold">{`Day ${item.order}: ${item.title}`}</h4>
                  <span className="text-lg">{item.order}</span>
                </div>
                <div className="p-4 bg-black/30 text-gray-200">
                  <p>{item.description}</p>
                  <div className="space-y-2 mt-2">
                    {item.activity?.map((act) => (
                      <div key={act._id} className="flex gap-2 items-center">
                        <span className="text-xl">{act.emoji}</span>
                        <span>{act.activityName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2">
            <Pencil className="w-5 h-5" />
            Edit
          </Button>
          <Button
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
            <Trash className="w-5 h-5" />
            Delete
          </Button>
        </div>
      </main>
    </div>
  );
}
