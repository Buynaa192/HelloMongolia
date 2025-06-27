"use client";

import { useRef, useState } from "react";

export function ImageUploadSection() {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div>
      <label className="block mb-2 font-medium text-gray-700">
        Destination Images
      </label>
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border border-dashed border-gray-400 rounded-md p-6 text-center text-gray-500 hover:border-blue-500 hover:text-blue-600 cursor-pointer">
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
              className="relative border rounded-lg overflow-hidden shadow">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover"
                onClick={() => window.open(url, "_blank")}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded hover:bg-red-700">
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
