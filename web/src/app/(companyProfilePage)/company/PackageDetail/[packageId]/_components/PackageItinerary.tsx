"use client";

import { PackageItemType } from "@/app/_providers/AuthProvider";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  packageItems?: PackageItemType[];
};

export function PackageItinerary({ packageItems }: Props) {
  if (!packageItems || packageItems.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl text-gray-300 font-semibold mb-4">
        Day-by-Day Itinerary
      </h2>
      <div className="space-y-6">
        {packageItems.map((item) => (
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
                <Link
                  key={item._id}
                  href={`/company/UpdatePackageItem/${item._id}`}>
                  <Button className="bg-yellow-500 text-white hover:bg-yellow-600 shadow-md flex-1 sm:flex-none">
                    Update itinerary
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
