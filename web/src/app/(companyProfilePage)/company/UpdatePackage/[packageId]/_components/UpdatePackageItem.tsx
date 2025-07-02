"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { api } from "@/axios";
import { ActivityType, PackageItemType } from "@/app/_providers/AuthProvider";
import {
  uploadImage
} from "../../../_components/PackageProvider";
import { ItemFormType } from "./itemsSchema";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ItemFormLayout } from "./ItemFormlayout";
import { toast } from "sonner";
import { z } from "zod";
type Props = {
  packageItem: PackageItemType;
  getPackage: () => Promise<void>;
  setIsOpen: (value: boolean) => void;
};
const itemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.any().optional(),
  destinationId: z.string().min(1),
  accommodation: z.string().min(1),
  activity: z.array(z.string()).min(1),
});
export const UpdatePackageItemsForm = ({
  packageItem,
  getPackage,
  setIsOpen,
}: Props) => {
  const [activity, setActivity] = useState<ActivityType[]>();
  const [prevProfileImage, setPrevProfileImage] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useForm<ItemFormType>({
    resolver: zodResolver(itemSchema),
  });
  useEffect(() => {
    if (packageItem) {
      form.reset({
        title: packageItem.title,
        description: packageItem.description,
        destinationId: packageItem.destinationId?._id,
        accommodation: packageItem.accommodation?._id,
        activity: packageItem.activity?.map((a) => a._id) || [],
      });
      setPrevProfileImage(packageItem.image);
    }
  }, [packageItem]);

  useEffect(() => {
    const getActivities = async () => {
      try {
        const res = await api.get("/activity/me");
        setActivity(res.data.activities);
      } catch (err) {
        console.error("Failed to fetch activities:", err);
      }
    };
    getActivities();
  }, []);

  const onSubmit = async (data: ItemFormType) => {
    setLoading(true);
    const coverPhotoUrl =
      typeof data.image === "string"
        ? data.image
        : data.image
        ? await uploadImage(data.image)
        : "";
    try {
      await api.put(`packageItem/${packageItem._id}`, {
        image: coverPhotoUrl,
        title: data.title,
        destinationId: data.destinationId,
        description: data.description,
        activity: data.activity,
        accommodation: data.accommodation,
      });

      toast.success("Package item updated successfully");
      getPackage();
      setIsOpen(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update package item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="w-full bg-white max-h-screen overflow-y-auto rounded-xl">
      <DialogTitle>Day {packageItem.order} Details </DialogTitle>

      <ItemFormLayout
        form={form}
        onSubmit={onSubmit}
        prevProfileImage={prevProfileImage}
        setPrevProfileImage={setPrevProfileImage}
        activityList={activity}
        order={packageItem.order}
        loading={loading}
      />
    </DialogContent>
  );
};
