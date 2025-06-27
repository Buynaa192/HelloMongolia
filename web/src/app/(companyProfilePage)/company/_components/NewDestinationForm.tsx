"use client";

import { useEffect, useRef, useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/axios";
import { toast } from "sonner";
import { ActivityType } from "@/app/_providers/AuthProvider";
import { ImageUploadSection } from "./ImageUploadSection";
import { ActivitiesSelector } from "./ActivitiesSelector";
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

type NewDestinationFormProps = {
  onCreate: (newDestId: string) => void;
  onClose: () => void;
};

export function NewDestinationForm({
  onCreate,
  onClose,
}: NewDestinationFormProps) {
  const [name, setName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [region, setRegion] = useState("6859247b611c9aae4411aaa4");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [selectedActivityIds, setSelectedActivityIds] = useState<string[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const defaultCenter = { lat: 47.9184, lng: 106.9176 };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { data } = await api.get("/activity/me");
        setActivities(data.activities);
      } catch {
        toast.error("Failed to fetch activities.");
      }
    };
    fetchActivities();
  }, []);

  const handleSubmit = async () => {
    if (!name || !description || !location) {
      toast.error("Please fill all required fields.");
      return;
    }
    try {
      const res = await api.post("/destination/post", {
        destinationName: name,
        destinationImages: [],
        region: region,
        description: description,
        location: location,
        activities: selectedActivityIds,
      });
      toast.success("Destination created!");
      onCreate(res.data._id);
      onClose();
    } catch (err) {
      toast.error("Error creating destination.");
      console.error(err);
    }
  };

  return (
    <DialogContent className="rounded-none outline-0 border-0 flex justify-center !max-w-screen items-center py-16 w-screen h-screen bg-black/50">
      <div className="bg-white rounded-2xl border w-[500px] h-[800px] overflow-scroll p-6">
        <DialogHeader>
          <DialogTitle>Create New Destination</DialogTitle>
          <DialogDescription>
            Fill in the destination details below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {isLoaded && (
            <>
              <Autocomplete
                onLoad={(ac) => {
                  ac.setOptions({ componentRestrictions: { country: "mn" } });
                  setAutocomplete(ac);
                }}
                onPlaceChanged={() => {
                  const place = autocomplete?.getPlace();
                  if (!place?.geometry?.location) return;
                  const lat = place.geometry.location.lat();
                  const lng = place.geometry.location.lng();
                  setLocation({ lat, lng });
                  map?.panTo({ lat, lng });
                  setSearchLocation(
                    place.formatted_address || place.name || ""
                  );
                }}>
                <Input
                  ref={inputRef}
                  placeholder="Search location on map"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </Autocomplete>

              <div className="w-full h-[400px] rounded overflow-hidden border">
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={location || defaultCenter}
                  zoom={6}
                  onLoad={(mapInstance) => setMap(mapInstance)}>
                  {location && <Marker position={location} />}
                </GoogleMap>
              </div>
            </>
          )}

          <select
            className="border rounded-md p-2"
            value={region}
            onChange={(e) => setRegion(e.target.value)}>
            <option value="6859247b611c9aae4411aaa4">Southern Mongolia</option>
            <option value="68592416611c9aae4411aaa2">Northern Mongolia</option>
            <option value="685924ef611c9aae4411aaa7">Eastern Mongolia</option>
            <option value="68592534611c9aae4411aaaa">Western Mongolia</option>
          </select>

          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <ImageUploadSection />

          <ActivitiesSelector
            activities={activities}
            selectedActivityIds={selectedActivityIds}
            setSelectedActivityIds={setSelectedActivityIds}
          />
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button onClick={handleSubmit}>Create</Button>
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </div>
    </DialogContent>
  );
}
