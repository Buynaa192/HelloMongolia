"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { DestinationType, RegionType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";

export const ShowRegion = ({ videoUrl, regionName, _id, description: regionDetails }: RegionType) => {
  const [videoSource, setVideoSource] = useState(videoUrl);
  const [destinations, setDestinations] = useState<DestinationType[]>([]);

  const [hoveredDestination, setHoveredDestination] = useState<DestinationType | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<DestinationType | null>(null);

  const activeDestination = selectedDestination || hoveredDestination;

  useEffect(() => {
    if (selectedDestination) {
      setVideoSource(selectedDestination.destinationImages[0]);
    } else if (hoveredDestination) {
      setVideoSource(hoveredDestination.destinationImages[0]);
    } else {
      setVideoSource(videoUrl);
    }
  }, [selectedDestination, hoveredDestination, videoUrl]);

  const handleRegionMouseLeave = () => {
    setSelectedDestination(null);
    setHoveredDestination(null);
    setVideoSource(videoUrl);
  };

  useEffect(() => {
    const fetchDestinationsByTheRegion = async () => {
      try {
        const response = await api.get(`/regions/destinations/${_id}`);

        setDestinations(response.data.regionDestination);
      } catch (err) {
        console.error("Failed to fetch destinations by region", err);
      }
    };

    fetchDestinationsByTheRegion();
  }, []);

  return (
    <div
      className="group relative w-full h-[250px] hover:h-[600px] transition-all duration-700 overflow-hidden shadow-lg"
      onMouseLeave={handleRegionMouseLeave}
    >
      <div className="absolute inset-0 w-full  z-0  h-full ">
        {videoSource &&
          (videoSource.endsWith(".mp4") ? (
            <video key={videoSource} className="w-full h-full object-cover" autoPlay muted loop playsInline src={videoSource} />
          ) : (
            <Image key={videoSource} src={videoSource} alt={activeDestination?.destinationName || regionName} fill className="object-cover" />
          ))}
      </div>

      <div className="absolute inset-0 bg-black/50 z-10 transition-opacity duration-300" />

      <div className="absolute inset-0 z-20 flex flex-col group-hover:justify-start justify-center items-center px-4 text-center py-8">
        <p className="text-white text-3xl md:text-4xl font-semibold drop-shadow-lg transition-all duration-500">
          {activeDestination ? activeDestination.destinationName : regionName}
        </p>
        <p className="text-white text-m mt-2 max-w-xl drop-shadow-lg">{activeDestination ? activeDestination.description : regionDetails}</p>

        {activeDestination && (
          <div className="flex flex-col gap-6 mt-6 text-gray-200 text-lg max-w-4xl items-center">
            <div className="w-full flex gap-20 text-lg">
              <div>
                <h3 className="font-semibold mb-2">Activities</h3>
                {activeDestination.activities.length > 0 ? (
                  <div className="list-disc list-inside italic ">
                    {activeDestination.activities.map((activity, i) => (
                      <ul key={i}>
                        {activity.emoji}
                        {activity.activityName}
                      </ul>
                    ))}
                  </div>
                ) : (
                  <p className="italic">No activities listed.</p>
                )}
              </div>
              {activeDestination.weather.length > 0 && (
                <div className="">
                  <h3 className="font-semibold mb-2">Weather</h3>
                  {activeDestination.weather ? (
                    <ul className="italic ">
                      {activeDestination.weather.map(({ season, averageTempF }, i) => (
                        <li key={i}>
                          <strong>{season}:</strong> {averageTempF}°F
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="italic">No weather data available.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 w-full z-30 opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-700 p-6 bg-white/10 backdrop-blur-lg flex flex-col items-center space-y-4 text-white">
        <p className="font-semibold">Top destinations in {regionName}</p>

        <ul className="flex flex-wrap gap-2 justify-center items-center text-white">
          {destinations?.map((dest, idx) => (
            <React.Fragment key={dest.destinationName}>
              <li
                onClick={() => setSelectedDestination(dest)}
                onMouseEnter={() => setHoveredDestination(dest)}
                onMouseLeave={() => setHoveredDestination(null)}
                className={`cursor-pointer transition-colors ${
                  selectedDestination?.destinationName === dest.destinationName ? "text-blue-600 font-bold" : "hover:text-blue-600"
                }`}
              >
                <Link href={`/explore-destinations/${regionName}/${dest._id}`}>{dest.destinationName}</Link>
              </li>
              {idx !== destinations.length - 1 && <span className="mx-2 select-none text-white">·</span>}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};
