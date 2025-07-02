"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { api } from "@/axios";

import { ActivityType } from "@/app/_providers/AuthProvider";
import { usePackageContext } from "../../../_components/PackageProvider";
import { FormLayout } from "../../../_components/FormLayout";
import {
  createPackageItemType,
  ItemFormType,
  itemSchema,
} from "../../../_components/itemSchema";
type Props = {
  packageId: string;
  getPackage: () => Promise<void>;
  order: number;
  setIsOpen: (value: boolean) => void;
};

export const AddPackageItemForm = ({
  packageId,
  getPackage,
  order,
  setIsOpen,
}: Props) => {
  const { createPackageItemFun, loading, addItemToPackage } =
    usePackageContext();

  const [activity, setActivity] = useState<ActivityType[]>();
  const [prevProfileImage, setPrevProfileImage] = useState("");
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
    const itemWithOrder = { ...data, order };
    const itemData: createPackageItemType = await createPackageItemFun(
      itemWithOrder
    );
    await addItemToPackage(packageId, itemData.package._id);
    form.reset();
    setPrevProfileImage("");
    setIsOpen(false);
    getPackage();
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
