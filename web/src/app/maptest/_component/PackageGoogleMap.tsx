"use client";

import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 47.9184,
  lng: 106.9176,
};

type MarkerWithName = {
  lat: number;
  lng: number;
  name: string;
};

type Props = {
  markers: MarkerWithName[];
};

export default function BasicGoogleMapWithDirections({ markers }: Props) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || "";
  const { isLoaded, loadError } = useJsApiLoader({ googleMapsApiKey: apiKey });

  const parsedMarkers = useMemo(
    () => markers.map((m) => ({ lat: m.lat, lng: m.lng })),
    [markers]
  );

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [activeMarkerIndex, setActiveMarkerIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (parsedMarkers.length < 2) {
      setDirections(null);
      return;
    }

    const origin = parsedMarkers[0];
    const destination = parsedMarkers[parsedMarkers.length - 1];
    const waypoints = parsedMarkers.slice(1, -1).map((m) => ({
      location: m,
      stopover: true,
    }));

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin,
        destination,
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: false,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        } else {
          console.error("Failed to fetch directions:", status);
        }
      }
    );
  }, [parsedMarkers]);

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={parsedMarkers[0] || defaultCenter}
        zoom={6}
      >
        {markers.map((marker, idx) => (
          <Marker
            key={idx}
            position={{ lat: marker.lat, lng: marker.lng }}
            onMouseOver={() => setActiveMarkerIndex(idx)}
            onMouseOut={() => setActiveMarkerIndex(null)}
          >
            {activeMarkerIndex === idx && (
              <InfoWindow
                position={{ lat: marker.lat, lng: marker.lng }}
                options={{ disableAutoPan: true }}
              >
                <div style={{ fontSize: "14px", padding: 0 }}>
                  {marker.name}
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}

        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{ suppressMarkers: true }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
