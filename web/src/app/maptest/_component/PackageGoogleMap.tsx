"use client";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 47.9184,
  lng: 106.9176,
};

type MarkerWithPhoto = {
  name: string;
  location: google.maps.LatLngLiteral;
  photoUrl?: string;
};

type Props = {
  markers: MarkerWithPhoto[];
};

export default function PackageGoogleMap({ markers }: Props) {
  const { isLoaded, loadError } = useJsApiLoader({ googleMapsApiKey: API_KEY });

  const [activeMarkerIndex, setActiveMarkerIndex] = useState<number | null>(
    null
  );

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="w-full mt-10">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markers.length > 0 ? markers[0].location : defaultCenter}
        zoom={5}
      >
        {markers.map((marker, idx) => (
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
