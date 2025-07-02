"use client";

import { LocationType, PackageType } from "@/app/_providers/AuthProvider";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useMemo, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 47.9184,
  lng: 106.9176,
};

type Location = {
  name: string;
  location: LocationType;
  photoUrl?: string;
};

type PackageGoogleMapProps = {
  packageDetail: PackageType;
};

export default function PackageGoogleMap({
  packageDetail,
}: PackageGoogleMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({ googleMapsApiKey: API_KEY });
  const [activeMarkerIndex, setActiveMarkerIndex] = useState<number | null>(
    null
  );

  const locations: Location[] = useMemo(() => {
    return packageDetail.packageItem
      .filter((item) => !!item.destinationId)
      .map((item) => {
        const { destinationId } = item;

        const { destinationName, location, destinationImages } = destinationId!;

        return {
          location,
          name: destinationName,
          photoUrl: destinationImages[0] ?? "",
        };
      });
  }, []);

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={5}
      >
        {locations.map((marker, idx) => (
          <Marker
            key={idx}
            position={marker.location}
            onMouseOver={() => setActiveMarkerIndex(idx)}
            onMouseOut={() => setActiveMarkerIndex(null)}
          >
            {activeMarkerIndex === idx && (
              <InfoWindow
                position={marker.location}
                onCloseClick={() => setActiveMarkerIndex(null)}
              >
                <div
                  className="flex flex-col items-center gap-2"
                  style={{ width: 200 }}
                >
                  <div className="text-sm font-semibold">{marker.name}</div>
                  {marker.photoUrl ? (
                    <img
                      src={marker.photoUrl}
                      alt={marker.name}
                      className="w-full h-auto rounded-md"
                    />
                  ) : (
                    <div>No image available</div>
                  )}
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
}
