"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { usePackageContext } from "./PackageProvider";
import { api } from "@/axios";
import { FormLayout } from "./FormLayout";
import { ActivityType, PackageItemType } from "@/app/_providers/AuthProvider";
import { createPackageItemType, ItemFormType, itemSchema } from "./itemSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusSquareIcon } from "lucide-react";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";

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
  const [order, setOrder] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isclicked, setIsclicked] = useState(false);
  const [items, setItems] = useState<PackageItemType[]>([]);
  const duration = Number(newPackage?.duration) || 1;
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

    if (newPackage?._id && itemData.package._id) {
      await addItemToPackage(newPackage._id, itemData.package._id);
    }

    const nextOrder = order + 1;

    if (nextOrder > duration) {
      setIsOpen(true);
      setNewPackage(null);
    } else {
      setOrder(nextOrder);
      form.reset();
      setPrevProfileImage("");
    }
  };

  const steps = Array.from({ length: duration }, (_, i) => `Day ${i + 1}`);

  return (
    <Card>
      <CardContent className="w-full max-w-screen-lg mx-auto flex flex-col  gap-6 p-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-xl">Daily Itinerary</p>
            <p>Add detailed day-by-day plans for your package</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsclicked(!isclicked)}>
                <PlusSquareIcon /> Add Day
              </Button>
            </DialogTrigger>

            <FormLayout
              form={form}
              onSubmit={onSubmit}
              prevProfileImage={prevProfileImage}
              setPrevProfileImage={setPrevProfileImage}
              activityList={activity}
              order={order}
              loading={loading}
              setIsclicked={setIsclicked}
            />
          </Dialog>
        </div>
        <div className="f-full flex justify-center item-center">
          <div className=" w-[20%]flex flex-col gap-4 p-4">
            <p>No itinerary items yet</p>
            <Button type="button" onClick={() => setIsclicked(true)}>
              <PlusSquareIcon /> Add First Day
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
