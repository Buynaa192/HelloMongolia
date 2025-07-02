"use client";
import { DestinationType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Destination() {
  const [loading, setLoading] = useState(false);
  const [destinations, setDestinations] = useState<DestinationType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const getDestination = async () => {
    setLoading(true);
    try {
      const res = await api.get("/destination");
      setDestinations(res.data.destinations);
    } catch (error) {
      console.error("Failed to fetch destinations:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(destinations);
  const filteredDestinations = destinations.filter((dest) =>
    dest.destinationName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getDestination();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-black-400 to-gray-900 text-white p-4">
      <div className="w-full flex justify-center">
        <input
          type="text"
          placeholder="Search destinations..."
          value={searchTerm}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`mb-6 transition-all duration-500 ease-in-out ${
            isFocused ? "w-full" : "w-[15%]"
          } max-w-md px-4 py-2 rounded-md text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {filteredDestinations.map((dest) => (
            <div
              key={dest._id}
              className="bg-white text-black rounded-xl shadow-lg overflow-hidden flex flex-col"
            >
              <img
                src={dest.destinationImages[0]}
                alt={dest.destinationName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1">
                <h2 className="text-xl font-semibold">
                  {dest.destinationName}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {dest.description}
                </p>
                <p className="text-xs mt-2 text-gray-500">
                  Region: {dest.region?.regionName}
                </p>
                <p className="text-xs text-gray-500">
                  Activities:{" "}
                  {dest.activities?.map((a) => a.activityName).join(", ")}
                </p>
                {dest.weather.length > 0 && (
                  <div className="w-full flex justify-between items-center text-xs">
                    {dest.weather.map((item) => {
                      const tempC = ((item.averageTempF - 32) * 5) / 9;
                      return (
                        <div key={item._id}>
                          <div className="font-semibold">
                            {item.season}
                            <div>{tempC.toFixed(1)}°C</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="p-4 pt-0 flex justify-between gap-2">
                <Link
                  href={`/explore-destinations/${dest.region.regionName}/${dest._id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                >
                  View
                </Link>
                <Link
                  href={`/company/editDestination/${dest._id}`}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
