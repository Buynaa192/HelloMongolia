"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

type Props = {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  newFiles: File[];
  setNewFiles: React.Dispatch<React.SetStateAction<File[]>>;
  isEditing: boolean;
};

export function DestinationImages({
  images,
  setImages,
  newFiles,
  setNewFiles,
  isEditing,
}: Props) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(newPreviews);

    // clear memory when component unmounts or files change
    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newFiles]);

  if (isEditing) {
    return (
      <div className="grid grid-cols-3 gap-2 mb-6">
        {[...images, ...previewUrls].map((img, i) => (
          <div
            key={i}
            className="relative group rounded-lg overflow-hidden h-40">
            <Image src={img} alt={`Image ${i}`} fill className="object-cover" />
            <button
              type="button"
              onClick={() => {
                if (i < images.length) {
                  // remove from existing images
                  setImages((prev) => prev.filter((_, index) => index !== i));
                } else {
                  // remove from newFiles
                  const newIndex = i - images.length;
                  setNewFiles((prev) =>
                    prev.filter((_, index) => index !== newIndex)
                  );
                }
              }}
              className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-80 hover:opacity-100">
              ❌ Remove
            </button>
          </div>
        ))}
        <div className="col-span-3">
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = e.target.files;
              if (files) setNewFiles(Array.from(files));
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`grid gap-2 ${
        images.length === 1
          ? "grid-cols-1"
          : images.length === 2
          ? "grid-cols-2"
          : "grid-cols-3"
      } ${images.length === 1 ? "h-96" : "h-[400px]"}`}>
      {images.map((img, i) => (
        <div
          key={i}
          className={`relative rounded-lg overflow-hidden ${
            i === 0 && images.length >= 3 ? "col-span-2 row-span-2" : ""
          }`}>
          <Image src={img} alt={`Image ${i}`} fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}
