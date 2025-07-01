"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { usePackageContext } from "./PackageProvider";
import { api } from "@/axios";
import { FormLayout } from "./FormLayout";
import { ActivityType } from "@/app/_providers/AuthProvider";
import { createPackageItemType, ItemFormType, itemSchema } from "./itemSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusSquareIcon } from "lucide-react";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { ItemCard } from "../CreatePackagePage/_components/ItemCard";

export const CreatePackageItemForm = () => {
  const { createPackageItemFun, loading, items, setItems } =
    usePackageContext();

  const [activity, setActivity] = useState<ActivityType[]>();
  const [prevProfileImage, setPrevProfileImage] = useState("");
  const [order, setOrder] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isclicked, setIsclicked] = useState(false);
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
    setItems((prev) => [...prev, itemData.package]);
    setOrder((prev) => prev + 1);
    form.reset();
    setPrevProfileImage("");
    setIsOpen(false);
  };

  return (
    <Card>
      <CardContent className="w-full max-w-screen-lg mx-auto flex flex-col  gap-6 p-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-2xl">Daily Itinerary</p>
            <p>Add detailed day-by-day plans for your package</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            />
          </Dialog>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.length === 0 ? (
            <div className="flex justify-center items-center col-span-full">
              <div className="w-[30%] flex flex-col item-center  justify-center gap-4 p-4">
                <p className="text-xl font-medium">No itinerary items yet</p>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button type="button" onClick={() => setIsclicked(true)}>
                      <PlusSquareIcon /> Add First Day
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
                  />
                </Dialog>
              </div>
            </div>
          ) : (
            items.map((item, index) => (
              <ItemCard
                key={item._id}
                item={item}
                index={index}
                setItems={setItems}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
