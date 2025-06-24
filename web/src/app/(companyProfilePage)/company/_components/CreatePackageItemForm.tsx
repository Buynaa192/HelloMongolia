"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { usePackageContext } from "./PackageProvider";
import {
  ActivityType,
  DestinationType,
  PackageItemType,
} from "@/app/_providers/AuthProvider";
import { Stepper } from "./ui/stepper";
import { Camera, Loader } from "lucide-react";
import { ACCEPTED_IMAGE_TYPES } from "./createPackage";
import { api } from "@/axios";
import { AlertDial } from "./Aalert";
import { DestinationSelector } from "./DestinationSelector";
export type createPackageItemType = {
  message: string;
  package: PackageItemType;
};
const itemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z
    .any()
    .refine((file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
    }),
  destinationId: z.string().min(1),
  accomodation: z.string().min(1),
  activity: z.array(z.string()).min(1),
});

type ItemFormType = z.infer<typeof itemSchema>;

export const CreatePackageItemForm = () => {
  const { newPackage, createPackageItemFun, loading, addItemToPackage } =
    usePackageContext();
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
    const getDestinations = async () => {
      try {
        const act = await api.get("/activity/me");
        setActivity(act.data.activities);
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      }
    };

    getDestinations();
  }, []);

  const onSubmit = async (data: ItemFormType) => {
    const itemWithOrder = { ...data, order };
    const itemData: createPackageItemType = await createPackageItemFun(
      itemWithOrder
    );
    if (newPackage?._id && itemData.package._id) {
      await addItemToPackage(newPackage?._id, itemData.package._id);
    }
    if (order < duration) {
      setOrder(order + 1);
      form.reset();
      setPrevProfileImage("");
    } else {
      setIsOpen(true);
    }
  };
  const dur = Number(newPackage?.duration) || 1;
  const steps = Array.from({ length: dur }, (_, i) => `Day ${i + 1}`);

  return (
    <div className="space-y-6 w-full">
      <Stepper steps={steps} currentStep={order} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white px-6 md:px-12 py-10 shadow-xl rounded-2xl space-y-8 w-full">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Image</FormLabel>
                <FormControl>
                  <div className="relative w-full h-64 border-2 border-dashed rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                    {prevProfileImage ? (
                      <img
                        src={prevProfileImage}
                        alt="Cover Preview"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-gray-400">No image selected</span>
                    )}
                    <label className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition cursor-pointer">
                      <Camera size={24} className="text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            form.setValue("image", file);
                            setPrevProfileImage(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="destinationId"
            render={({ field }) => (
              <DestinationSelector
                selectedId={field.value}
                setDestinationId={field.onChange}
              />
            )}
          />
          <FormField
            control={form.control}
            name="accomodation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Accommodation</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="activity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activities</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                    {activity?.map((act) => (
                      <label
                        key={act._id}
                        className={`flex items-center gap-2 border p-2 rounded-lg cursor-pointer transition ${
                          field.value.includes(act._id)
                            ? "bg-blue-100 border-blue-500"
                            : "border-gray-300"
                        }`}>
                        <input
                          type="checkbox"
                          checked={field.value.includes(act._id)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            const newValue = checked
                              ? [...field.value, act._id]
                              : field.value.filter((id) => id !== act._id);
                            field.onChange(newValue);
                          }}
                        />
                        <div className="flex flex-row items-center  gap-2">
                          <p className="text-sm font-medium text-black">
                            {act.activityName}
                          </p>
                          <p className="text-sm font-medium text-black">
                            {act.emoji}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className={`w-full md:w-auto flex justify-center items-center gap-2 px-6 py-3 rounded-md text-white ${
              loading ? "bg-green-300" : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={loading}>
            {loading ? (
              <>
                <Loader className="animate-spin" size={18} />
                <span>Adding...</span>
              </>
            ) : (
              `Add day${order} `
            )}
          </Button>
        </form>
      </Form>
      <AlertDial
        title="All itinerary days have been successfully created!"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      ;
    </div>
  );
};
