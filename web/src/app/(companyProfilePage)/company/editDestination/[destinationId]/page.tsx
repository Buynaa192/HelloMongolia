"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/axios";
import { DestinationType, ActivityType } from "@/app/_providers/AuthProvider";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { uploadImage } from "../../_components/PackageProvider";
import { DestinationImages } from "./_components/DestinationImages";
import { DestinationActivities } from "./_components/DestinationActivities";

export default function DestinationDetailPage() {
  const { destinationId } = useParams<{ destinationId: string }>();
  const [destination, setDestination] = useState<DestinationType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [desc, setDesc] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [allActivities, setAllActivities] = useState<ActivityType[]>([]);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/activity/me");
        setAllActivities(res.data.activities || []);
      } catch (error) {
        console.error("Failed to fetch all activities:", error);
      }
    })();
  }, []);
  useEffect(() => {
    if (!destinationId) return;
    (async () => {
      try {
        const res = await api.get(
          `/destination?destinationId=${destinationId}`
        );
        const data = res.data.destinations?.[0] || null;
        setDestination(data);
        setDesc(data?.description || "");
        setSelectedActivities(
          data?.activities?.map((a: ActivityType) => a._id) || []
        );
        setImages(data?.destinationImages || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [destinationId]);

  const handleSave = async () => {
    try {
      let uploadedUrls: string[] = [];

      if (newFiles.length > 0) {
        uploadedUrls = await Promise.all(
          newFiles.map((file) => uploadImage(file))
        );
      }

      const updatedImages = [...images, ...uploadedUrls];
      await api.put(`/destination/put`, {
        id: destinationId,
        description: desc,
        activities: selectedActivities,
        destinationImages: updatedImages,
      });
      setDestination((prev) =>
        prev
          ? {
              ...prev,
              description: desc,
              destinationImages: updatedImages,
              activities: allActivities.filter((a) =>
                selectedActivities.includes(a._id)
              ),
            }
          : null
      );
      setImages(updatedImages);
      setIsEditing(false);
      setNewFiles([]);
    } catch (e) {
      console.error("Failed to save:", e);
    }
  };

  const toggleActivity = (id: string) => {
    setSelectedActivities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (!destination)
    return (
      <div className="text-center p-8 text-red-500">Destination not found</div>
    );

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      <div className="mb-4">
        <Button variant="outline" onClick={() => router.push("/company")}>
          ← Back
        </Button>
      </div>
      <DestinationImages
        images={images}
        setImages={setImages}
        newFiles={newFiles}
        setNewFiles={setNewFiles}
        isEditing={isEditing}
      />

      <Card>
        <CardContent className="p-6">
          <CardTitle className="text-3xl font-bold mb-4">
            {destination.destinationName}
          </CardTitle>
          {isEditing ? (
            <Textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="mb-4"
              rows={6}
            />
          ) : (
            <p className="text-gray-800 mb-4 whitespace-pre-line">
              {desc.length > 300 ? desc.slice(0, 300) + "..." : desc}
            </p>
          )}

          <div className="mb-4">
            <p className="font-semibold mb-2">Activities:</p>
            {isEditing ? (
              <DestinationActivities
                activities={allActivities}
                selected={selectedActivities}
                toggle={toggleActivity}
                editable={true}
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {destination.activities.map((act) => (
                  <span
                    key={act._id}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {act.emoji} {act.activityName}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            {isEditing ? (
              <>
                <Button
                  className="bg-red-300 text-white hover:bg-red-400 shadow-md flex-1 sm:flex-none"
                  variant="outline"
                  onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-green-500 text-white hover:bg-green-600 shadow-md flex-1 sm:flex-none"
                  onClick={handleSave}>
                  Save
                </Button>
              </>
            ) : (
              <Button
                className="bg-yellow-500 text-white hover:bg-yellow-600 shadow-md flex-1 sm:flex-none"
                onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
