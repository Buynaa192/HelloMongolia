"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { api } from "@/axios";
import {
  ActivityType,
  PackageItemType,
  PackageType,
} from "@/app/_providers/AuthProvider";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusSquareIcon } from "lucide-react";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { usePackageContext } from "../../../_components/PackageProvider";
import { ItemFormType } from "./itemsSchema";
import {
  createPackageItemType,
  itemSchema,
} from "../../../_components/itemSchema";
import { FormLayout } from "../../../_components/FormLayout";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
type Props = {
  packageItem: PackageItemType;
};
export const UpdatePackageItemsForm = ({ packageItem }: Props) => {
  const { createPackageItemFun, loading, items, setItems } =
    usePackageContext();

  const [activity, setActivity] = useState<ActivityType[]>();
  const [prevProfileImage, setPrevProfileImage] = useState("");
  const [order, setOrder] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isclicked, setIsclicked] = useState(false);
  const form = useForm<ItemFormType>({
    resolver: zodResolver(itemSchema),
    // defaultValues: {
    //   title: packageItem.title,
    //   description: packageItem.description,
    //   destinationId: packageItem.destinationId?._id,
    //   accommodation: packageItem.accommodation?._id,
    //   activity: [],
    // },
  });
  useEffect(() => {
    if (packageItem) {
      form.reset({
        title: packageItem.title,
        description: packageItem.description,
        destinationId: packageItem.destinationId?._id,
        accommodation: packageItem.accommodation?._id,
        activity: [], // эсвэл packageItem.activity гэх мэт
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
    const itemWithOrder = { ...data, order };
    const itemData: createPackageItemType = await createPackageItemFun(
      itemWithOrder
    );
    setItems((prev) => [...prev, itemData.package]);
    setOrder((prev) => prev + 1);
    form.reset();
    setPrevProfileImage("");
    setIsOpen(false);
  };

  return (
    <DialogContent className="w-full bg-white max-h-screen overflow-y-auto rounded-xl">
      <DialogTitle>Day {order} Details </DialogTitle>

      <FormLayout
        form={form}
        onSubmit={onSubmit}
        prevProfileImage={prevProfileImage}
        setPrevProfileImage={setPrevProfileImage}
        activityList={activity}
        order={order}
        loading={loading}
      />
    </DialogContent>
  );
};
