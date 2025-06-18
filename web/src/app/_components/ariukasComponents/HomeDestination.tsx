"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Destination {
  name: string;
  mediaUrl: string;
  description: string;
  activities: string[];
  weather: Weather[];
}

interface Weather {
  season: string;
  averageTemperature: string;
}

interface ShowRegionProps {
  videoSource: string;
  regionName: string;
  details: string;
  destinations: Destination[];
}

export const ShowRegion = ({
  videoSource: initialVideo,
  regionName,
  details: regionDetails,
  destinations,
}: ShowRegionProps) => {
  const [videoSource, setVideoSource] = useState(initialVideo);
  const [hoveredDestination, setHoveredDestination] =
    useState<Destination | null>(null);
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  const activeDestination = selectedDestination || hoveredDestination;

  useEffect(() => {
    if (selectedDestination) {
      setVideoSource(selectedDestination.mediaUrl);
    } else if (hoveredDestination) {
      setVideoSource(hoveredDestination.mediaUrl);
    } else {
      setVideoSource(initialVideo);
    }
  }, [selectedDestination, hoveredDestination, initialVideo]);

  // Handler for when mouse leaves the entire region container
  const handleRegionMouseLeave = () => {
    setSelectedDestination(null);
    setHoveredDestination(null);
    setVideoSource(initialVideo);
  };

  return (
    <div
      className="group relative w-full h-[250px] hover:h-[600px] transition-all duration-700 overflow-hidden rounded-2xl shadow-lg"
      onMouseLeave={handleRegionMouseLeave}
    >
      <div className="absolute inset-0 w-full h-full z-0">
        {videoSource && videoSource.endsWith(".mp4") ? (
          <video
            key={videoSource}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            src={videoSource}
          />
        ) : videoSource ? (
          <Image
            key={videoSource}
            src={videoSource}
            alt={activeDestination?.name || regionName}
            fill
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="absolute inset-0 bg-black/50 z-10 transition-opacity duration-300" />

      <div className="absolute inset-0 z-20 flex flex-col group-hover:justify-start justify-center items-center px-4 text-center py-8">
        <p className="text-white text-3xl md:text-4xl font-semibold drop-shadow-lg transition-all duration-500">
          {activeDestination ? activeDestination.name : regionName}
        </p>
        <p className="text-white text-m mt-2 max-w-xl drop-shadow-lg">
          {activeDestination ? activeDestination.description : regionDetails}
        </p>

        {activeDestination && (
          <div className="flex flex-col gap-6 mt-6 text-gray-200 text-lg max-w-4xl items-center">
            <div className="w-full flex gap-20 text-lg">
              <div>
                <h3 className="font-semibold mb-2">Activities</h3>
                {activeDestination.activities.length > 0 ? (
                  <div className="list-disc list-inside italic ">
                    {activeDestination.activities.map((activity, i) => (
                      <ul key={i}>{activity}</ul>
                    ))}
                  </div>
                ) : (
                  <p className="italic">No activities listed.</p>
                )}
              </div>
              <div>
                <h3 className="font-semibold mb-2">Weather</h3>
                {activeDestination.weather.length > 0 ? (
                  <ul className="italic ">
                    {activeDestination.weather.map(
                      ({ season, averageTemperature }, i) => (
                        <li key={i}>
                          <strong>{season}:</strong> {averageTemperature}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p className="italic">No weather data available.</p>
                )}
              </div>
            </div>
            <Button
              asChild
              className="text-black bg-white hover:bg-black hover:text-white mt-6 w-fit"
            >
              <Link href={""}>Take me there!</Link>
            </Button>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 w-full z-30 opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-700 p-6 bg-white/10 backdrop-blur-lg flex flex-col items-center space-y-4 text-white">
        <p className="font-semibold">Top destinations in {regionName}</p>

        <ul className="flex flex-wrap gap-2 justify-center items-center text-white">
          {destinations.map((dest, idx) => (
            <React.Fragment key={dest.name}>
              <li
                onClick={() => setSelectedDestination(dest)}
                onMouseEnter={() => setHoveredDestination(dest)}
                onMouseLeave={() => setHoveredDestination(null)}
                className={`cursor-pointer transition-colors ${
                  selectedDestination?.name === dest.name
                    ? "text-blue-600 font-bold"
                    : "hover:text-blue-600"
                }`}
              >
                {dest.name}
              </li>
              {idx !== destinations.length - 1 && (
                <span className="mx-2 select-none text-white">·</span>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};
