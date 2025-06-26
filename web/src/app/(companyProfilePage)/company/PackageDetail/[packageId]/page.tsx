"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/axios";
import { PackageType } from "@/app/_providers/AuthProvider";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PackageCardSkeleton } from "../../_components/packageSkeleton";
import { Star } from "lucide-react";
import { UpdatePackageForm } from "../../_components/updatePackageForm";
import { DeletePackage } from "../../_components/deletePackage";

export default function PackageDetailPage() {
  const { packageId } = useParams();
  const [packageData, setPackageData] = useState<PackageType | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const getPackage = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/package?packageId=${packageId}`);
        const data = response.data.packages?.[0];
        if (data) setPackageData(data);
      } catch (err) {
        console.error("Failed to fetch package:", err);
      } finally {
        setLoading(false);
      }
    };

    if (packageId) getPackage();
  }, [packageId]);
  const ratingStar = (rating: number) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={18}
        className={
          i <= rating - 1 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }
      />
    ));
  if (loading) return <PackageCardSkeleton />;
  if (!packageData)
    return <p className="text-center text-lg">Package not found.</p>;

  return (
    <div className="flex flex-col space-y-10">
      <div className="mb-4">
        <Button variant="outline" onClick={() => router.push("/company")}>
          ← Back
        </Button>
      </div>
      <div className="mb-6">
        <h1 className="text-3xl text-gray-300  font-bold">
          {packageData.title}
        </h1>
        <p className="text-gray-300">{packageData.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/10 p-6 rounded-xl">
        <img
          src={packageData.coverPhoto}
          alt={packageData.title}
          className="w-full h-[400px] object-cover rounded-xl shadow"
        />

        <div className="space-y-4 text-sm text-white">
          <p>
            <strong>Duration:</strong> {packageData.duration} days
          </p>
          <p>
            <strong>Cost:</strong>{" "}
            <span className="text-green-400">${packageData.cost}</span>
          </p>
          <div className="flex flex-row">
            <strong>Rating:</strong> {ratingStar(packageData.rating)}
          </div>
          <p>
            <strong>Trip Type:</strong>{" "}
            <span className="inline-block px-3 py-1 text-xs bg-emerald-200 text-emerald-800 rounded-full">
              {packageData.tripType}
            </span>
          </p>
          <p>
            <strong>Available:</strong>{" "}
            {new Date(packageData.availableFrom).toLocaleDateString()} —{" "}
            {new Date(packageData.availableUntil).toLocaleDateString()}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-4 w-full">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-yellow-500 text-white hover:bg-yellow-600 shadow-md flex-1 sm:flex-none">
                  Update
                </Button>
              </DialogTrigger>
              <UpdatePackageForm packageData={packageData} />
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-red-600 text-white hover:bg-red-700 shadow-md flex-1 sm:flex-none">
                  Delete
                </Button>
              </DialogTrigger>
              <DeletePackage
                title={packageData.title}
                packageId={packageData._id}
              />
            </Dialog>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl text-gray-300 font-semibold mb-4">
          Day-by-Day Itinerary
        </h2>
        <div className="space-y-6">
          {packageData.packageItem?.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/10 p-6 rounded-xl">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[300px] object-cover rounded-xl shadow"
              />

              <div className="space-y-4 text-white text-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold">
                    Day {item.order}: {item.title}
                  </h4>

                  <p>{item.description}</p>

                  {item.accommodation && (
                    <p>
                      <strong>Accommodation:</strong>{" "}
                      {item.accommodation.hotelName}
                    </p>
                  )}

                  {item.destinationId?.destinationName && (
                    <p>
                      <strong>Destination:</strong>{" "}
                      {item.destinationId.destinationName}
                    </p>
                  )}

                  {item.activity?.length > 0 && (
                    <div>
                      <p className="font-semibold mb-1">Activities:</p>
                      <div className="flex flex-wrap gap-3">
                        {item.activity.map((act) => (
                          <span
                            key={act._id}
                            className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm">
                            <span>{act.emoji}</span> {act.activityName}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-white shadow">
                        Update This Day
                      </Button>
                    </DialogTrigger>
                    <div className="p-6"></div>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
