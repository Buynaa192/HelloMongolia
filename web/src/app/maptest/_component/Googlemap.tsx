"use client";

import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState, useCallback, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const containerStyle = {
  width: "100%",
  height: "700px",
};

const defaultCenter = {
  lat: 47.9184,
  lng: 106.9176,
};

type Props = {
  apiKey: string;
};

type MarkerType = {
  id: string;
  lat: number;
  lng: number;
  address?: string;
};

export default function MyGoogleMap({ apiKey }: Props) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [selected, setSelected] = useState<MarkerType | null>(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const generateId = () => crypto.randomUUID();

  const handleMapClick = useCallback(
    async (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const data = await res.json();

      // Clean address: remove plus code
      const rawAddress =
        data.results?.[0]?.formatted_address || "Unknown location";
      const address = rawAddress.replace(/^[A-Z0-9+]+ /, "");

      const newMarker = { id: generateId(), lat, lng, address };
      setMarkers((prev) => [...prev, newMarker]);
      setSelected(newMarker);
    },
    [apiKey]
  );

  const handlePlaceChanged = () => {
    if (!autocomplete) return;

    const place = autocomplete.getPlace();
    if (!place.geometry?.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const address = place.formatted_address || place.name || "Unknown place";

    const newMarker = { id: generateId(), lat, lng, address };
    setMarkers((prev) => [...prev, newMarker]);
    setSelected(newMarker);
  };

  const handleMarkerDragEnd = useCallback(
    (e: google.maps.MapMouseEvent, id: string) => {
      if (!e.latLng) return;
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      setMarkers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, lat, lng } : m))
      );
    },
    []
  );

  const handleMarkerDblClick = useCallback(
    (id: string) => {
      setMarkers((prev) => prev.filter((m) => m.id !== id));
      if (selected?.id === id) setSelected(null);
    },
    [selected]
  );

  const clearMarkers = () => {
    setMarkers([]);
    setSelected(null);
    setDirections(null);
  };

  useEffect(() => {
    if (markers.length < 2) {
      setDirections(null);
      return;
    }

    const origin = { lat: markers[0].lat, lng: markers[0].lng };
    const destination = {
      lat: markers[markers.length - 1].lat,
      lng: markers[markers.length - 1].lng,
    };
    const waypoints = markers.slice(1, -1).map((m) => ({
      location: { lat: m.lat, lng: m.lng },
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
          console.error("Error fetching directions:", status);
        }
      }
    );
  }, [markers]);

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <Autocomplete
          onLoad={setAutocomplete}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            ref={inputRef}
            placeholder="Search a place..."
            className="p-2 border rounded w-full max-w-md"
          />
        </Autocomplete>
        <Button onClick={clearMarkers} variant="destructive">
          Clear
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="w-full">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={markers[markers.length - 1] || defaultCenter}
            zoom={6}
            onClick={handleMapClick}
          >
            {markers.map((m) => (
              <Marker
                key={m.id}
                position={{ lat: m.lat, lng: m.lng }}
                draggable
                onClick={() => setSelected(m)}
                onDragEnd={(e) => handleMarkerDragEnd(e, m.id)}
                onLoad={(marker) => {
                  marker.addListener("dblclick", () =>
                    handleMarkerDblClick(m.id)
                  );
                }}
              />
            ))}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </div>

        {selected && (
          <Card className="w-[300px] h-fit shrink-0">
            <CardHeader>
              <CardTitle>📍 Marker Info</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                <strong>Address:</strong> {selected.address}
              </p>
              <p>
                <strong>Latitude:</strong> {selected.lat}
              </p>
              <p>
                <strong>Longitude:</strong> {selected.lng}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
