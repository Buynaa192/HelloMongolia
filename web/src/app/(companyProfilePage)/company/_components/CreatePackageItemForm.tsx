"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { usePackageContext } from "./PackageProvider";
import { api } from "@/axios";
import { Stepper } from "./ui/Stepper";
import { AlertDial } from "./Alert";
import { FormLayout } from "./FormLayout";
import { ActivityType } from "@/app/_providers/AuthProvider";
import { createPackageItemType, ItemFormType, itemSchema } from "./itemSchema";

export const CreatePackageItemForm = () => {
  const {
    newPackage,
    setNewPackage,
    createPackageItemFun,
    loading,
    addItemToPackage,
  } = usePackageContext();

  const [activity, setActivity] = useState<ActivityType[]>();
  const [prevProfileImage, setPrevProfileImage] = useState("");
  const [order, setOrder] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const duration = Number(newPackage?.duration) || 1;
  const form = useForm<ItemFormType>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: "",
      description: "",
      destinationId: "",
      accomodation: "",
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
    if (newPackage?._id && itemData.package._id) {
      await addItemToPackage(newPackage._id, itemData.package._id);
    }
    if (order < duration) {
      setOrder(order + 1);
      form.reset();
      setPrevProfileImage("");
    } else {
      setNewPackage(null);
      setIsOpen(true);
    }
  };

  const steps = Array.from({ length: duration }, (_, i) => `Day ${i + 1}`);

  return (
    <div className="space-y-6 w-full">
      <Stepper steps={steps} currentStep={order} />
      <FormLayout
        form={form}
        onSubmit={onSubmit}
        prevProfileImage={prevProfileImage}
        setPrevProfileImage={setPrevProfileImage}
        activityList={activity}
        order={order}
        loading={loading}
      />
      <AlertDial
        title="All itinerary days have been successfully created!"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};
