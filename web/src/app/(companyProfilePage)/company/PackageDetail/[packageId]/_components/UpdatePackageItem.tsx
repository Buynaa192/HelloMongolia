"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/axios";
import { ActivityType } from "@/app/_providers/AuthProvider";
import { ItemFormType, itemSchema } from "../../../_components/itemSchema";
import { toast } from "sonner";
import { FormLayout } from "../../../_components/FormLayout";
import { uploadImage } from "../../../_components/PackageProvider";

type Props = {
  packageItemId: string;
};

export const UpdatePackageItemForm = ({ packageItemId }: Props) => {
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState<ActivityType[]>();
  const [prevProfileImage, setPrevProfileImage] = useState("");
  const [order, setOrder] = useState(0);

  const form = useForm<ItemFormType>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: "",
      description: "",
      destinationId: "",
      accommodation: "",
      activity: [],
    },
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(
          `/packageItem?packageItemId=${packageItemId}`
        );
        const item = res.data.packageItem[0];
        if (item) {
          form.reset({
            title: item.title || "",
            description: item.description || "",
            destinationId: item.destinationId?._id || "",
            accommodation: item.accommodation?._id || "",
            activity: item.activity?.map((a: ActivityType) => a._id) || [],
          });
          if (item.image) {
            setPrevProfileImage(item.image);
          }
          if (item.order) {
            setOrder(item.order);
          }
        } else {
          toast.error("Package item not found");
        }
      } catch (err) {
        console.error("Failed to fetch item", err);
        toast.error("Failed to load item");
      }
    };
    fetchItem();
  }, [packageItemId, form]);

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
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("destinationId", data.destinationId);
      formData.append("accommodation", data.accommodation);

      data.activity.forEach((a) => formData.append("activity", a));

      let coverPhotoUrl = "";
      if (typeof data.image === "string") {
        coverPhotoUrl = data.image;
      } else if (data.image instanceof File) {
        coverPhotoUrl = await uploadImage(data.image);
      }

      formData.append("imageUrl", coverPhotoUrl);

      await api.put(`/packageItem/${packageItemId}`, formData);
      toast.success("Package item updated successfully!");
    } catch (err) {
      console.error("Failed to update item", err);
      toast.error("Failed to update item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormLayout
      form={form}
      onSubmit={onSubmit}
      prevProfileImage={prevProfileImage}
      setPrevProfileImage={setPrevProfileImage}
      activityList={activity}
      order={order}
      loading={loading}
    />
  );
};
