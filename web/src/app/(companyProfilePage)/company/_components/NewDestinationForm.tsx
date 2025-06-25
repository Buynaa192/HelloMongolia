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

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

type NewDestinationFormProps = {
  onCreate: (newDestId: string) => void;
  onClose: () => void;
};

export function NewDestinationForm({
  onCreate,
  onClose,
}: NewDestinationFormProps) {
  const [name, setName] = useState(""); //
  const [searchLocation, setSearchLocation] = useState("");
  const [region, setRegion] = useState("6859247b611c9aae4411aaa4");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [selectedActivityIds, setSelectedActivityIds] = useState<string[]>([]);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const urls = fileArray.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...fileArray]);
    setPreviewUrls((prev) => [...prev, ...urls]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const fileArray = Array.from(e.dataTransfer.files);
    const urls = fileArray.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...fileArray]);
    setPreviewUrls((prev) => [...prev, ...urls]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImage = async (file: File) => {
    const CLOUD_NAME = "df60cobe2";
    const UPLOAD_PRESET = "HelloMongolia";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async () => {
    if (!name || !description || !location) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const uploadedImageUrls = await Promise.all(
        images.map((file) => uploadImage(file))
      );

      const res = await api.post("/destination/post", {
        destinationName: name,
        destinationImages: uploadedImageUrls,
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
    } finally {
      setLoading(false);
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
          {isLoaded ? (
            <>
              <Autocomplete
                onLoad={(ac) => {
                  ac.setOptions({
                    componentRestrictions: { country: "mn" },
                  });
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
                }}
              >
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
                  onLoad={(mapInstance) => setMap(mapInstance)}
                >
                  {location && <Marker position={location} />}
                </GoogleMap>
              </div>
            </>
          ) : (
            <p>Loading map...</p>
          )}

          <select
            className="border rounded-md p-2"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
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

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Destination Images
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border border-dashed border-gray-400 rounded-md p-6 text-center text-gray-500 hover:border-blue-500 hover:text-blue-600 cursor-pointer"
            >
              Click or drag images here to upload
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImagesChange}
            />
            {previewUrls.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                {previewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative border rounded-lg overflow-hidden shadow"
                  >
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover"
                      onClick={() => window.open(url, "_blank")}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded hover:bg-red-700"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {activities.map((act) => (
              <label
                key={act._id}
                className={`flex items-center gap-2 border p-2 rounded cursor-pointer transition ${
                  selectedActivityIds.includes(act._id)
                    ? "bg-blue-100 border-blue-500"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedActivityIds.includes(act._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedActivityIds((prev) => [...prev, act._id]);
                    } else {
                      setSelectedActivityIds((prev) =>
                        prev.filter((id) => id !== act._id)
                      );
                    }
                  }}
                />
                <span>
                  {act.emoji} {act.activityName}
                </span>
              </label>
            ))}
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button disabled={loading} onClick={handleSubmit}>
            {loading ? "Creating..." : "Create"}
          </Button>
          <DialogClose asChild>
            <Button variant="outline" disabled={loading} onClick={onClose}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </div>
    </DialogContent>
  );
}
