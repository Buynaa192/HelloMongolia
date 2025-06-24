"use client";

import { useRef, useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/axios";
import { toast } from "sonner";
import { LocationMap } from "./LocationMap";

type NewDestinationFormProps = {
  onCreate: (newDestId: string) => void;
  onClose: () => void;
};

export function NewDestinationForm({
  onCreate,
  onClose,
}: NewDestinationFormProps) {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("Southern-Mongolia");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  // const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
  //   null
  // );
  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, i) => i !== indexToRemove));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== indexToRemove));
  };
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const urls = fileArray.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...fileArray]);
    setPreviewUrls((prev) => [...prev, ...urls]);
  };
  const handleSubmit = async () => {
    if (!name || !description || !location) {
      toast.error("Please fill all fields including location");
      return;
    }

    setLoading(true);
    try {
      const uploadedImageUrls: string[] = [];

      if (images.length > 0) {
        // for (const file of images) {
        //   const url = await uploadImage(file);
        //   uploadedImageUrls.push(url);
        // }
      }

      const response = await api.post("/destination", {
        destinationName: name,
        region,
        description,
        destinationImages: uploadedImageUrls,
        location,
      });

      toast.success("Destination created successfully!");
      onCreate(response.data._id);
      onClose();
    } catch (error) {
      toast.error("Failed to create destination");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const urls = fileArray.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...fileArray]);
    setPreviewUrls((prev) => [...prev, ...urls]);
  };

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
      <DialogHeader>
        <DialogTitle>Create New Destination</DialogTitle>
        <DialogDescription>
          Please fill the details for the new destination.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Input
          placeholder="Destination Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="border rounded-md p-2"
          value={region}
          onChange={(e) => setRegion(e.target.value)}>
          <option value="Southern-Mongolia">Southern Mongolia</option>
          <option value="Northern-Mongolia">Northern Mongolia</option>
          <option value="Eastern-Mongolia">Eastern Mongolia</option>
          <option value="Western-Mongolia">Western Mongolia</option>
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
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border border-dashed border-gray-400 rounded-md p-6 cursor-pointer text-center text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors">
            Click or drag images here to upload
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImagesChange}
            className="hidden"
          />

          {previewUrls.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {previewUrls.map((url, index) => (
                <div
                  key={index}
                  className="relative border rounded-lg overflow-hidden shadow-sm">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover"
                    onClick={() => window.open(url, "_blank")}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded opacity-100 hover:bg-red-700 transition-colors"
                    aria-label="Remove image">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <LocationMap />
      </div>
      <DialogFooter className="flex gap-2 justify-end">
        <Button disabled={loading} onClick={handleSubmit}>
          {loading ? "Creating..." : "Create"}
        </Button>
        <DialogClose asChild>
          <Button variant="outline" disabled={loading}>
            Cancel
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
