"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader, MoveLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { PackageType } from "@/app/_providers/AuthProvider";
import { usePackageContext } from "../../../_components/PackageProvider";
import { api } from "@/axios";
import { useRouter } from "next/navigation";
import { UpdatePackageItemsForm } from "./UpdatePackageItem";
import { PackageItemCard } from "./packageItemCard";

const schema = z.object({
  coverPhoto: z.any().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.string().min(1),
  cost: z.number().min(1),
  tripType: z.string().min(1),
  availableFrom: z.string(),
  availableUntil: z.string(),
});

type FormData = z.infer<typeof schema>;

export type Props = {
  packageId: string;
};

export const UpdatePackageForm = ({ packageId }: Props) => {
  const [packge, setPackge] = useState<PackageType>();
  const [prevProfileImage, setPrevProfileImage] = useState(packge?.coverPhoto);
  const { updatePackage, loading } = usePackageContext();
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      duration: "",
      cost: 0,
      tripType: "",
      // availableFrom:
      //   new Date(packge?.availableFrom).toISOString().split("T")[0] ?? "",
      // availableUntil:
      //   new Date(packge?.availableUntil).toISOString().split("T")[0] ?? "",
    },
  });

  const onSubmit = async (data: FormData) => {
    // await updatePackage(packageData._id, data);
    // if (onSuccess) onSuccess();
  };
  useEffect(() => {
    if (packge) {
      form.reset({
        coverPhoto: packge.coverPhoto,
        name: packge.title ?? "",
        description: packge.description ?? "",
        duration: packge.duration ?? "",
        cost: packge.cost ?? 0,
        tripType: packge.tripType ?? "",
        availableFrom: packge.availableFrom
          ? new Date(packge.availableFrom).toISOString().split("T")[0]
          : "",
        availableUntil: packge.availableUntil
          ? new Date(packge.availableUntil).toISOString().split("T")[0]
          : "",
      });
      setPrevProfileImage(packge.coverPhoto);
    }
  }, [packge]);
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/package?packageId=${packageId}`);
        console.log(res.data.packages[0]);
        if (res) {
          setPackge(res.data.packages[0]);
        }
      } catch (error) {
        console.error("Failed to fetch package:", error);
      }
    })();
  }, []);
  return (
    <div className="w-full max-w-screen-lg mx-auto flex flex-col  gap-6 item-center justify-center">
      <div className=" gap-6">
        <div className="mb-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            <MoveLeftIcon className="mr-2" /> Back to Dashboard
          </Button>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 bg-white p-6 rounded-xl shadow-lg w-full">
            <FormField
              control={form.control}
              name="coverPhoto"
              render={() => (
                <FormItem>
                  <FormLabel>Cover Photo</FormLabel>
                  <FormControl>
                    <div className="relative w-full h-64 border border-dashed overflow-hidden rounded-xl">
                      {prevProfileImage && (
                        <img
                          src={prevProfileImage}
                          className="object-cover w-full h-full"
                        />
                      )}
                      <label className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/10 hover:bg-black/20 transition">
                        <Camera />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              form.setValue("coverPhoto", file);
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package Name</FormLabel>
                  <FormControl>
                    <Input placeholder="insert package name" {...field} />
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
                    <Textarea placeholder="About the package..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="3 days" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost ($)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tripType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trip Type</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full border rounded p-2">
                        <option value="Scenery">Scenery</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Historial">Historical</option>
                        <option value="Family">Family</option>
                        <option value="Scientific">Scientific</option>
                        <option value="Festival & Events">
                          Festival & Events
                        </option>
                        <option value="Off-road">Off-road</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availableFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available From</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availableUntil"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Until</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {packge?.packageItem.map((item, index) => (
                <PackageItemCard key={item._id} item={item} index={index} />
              ))}
            </div>
            {/* {packge && <UpdatePackageItemsForm packge={packge} />} */}
            <div className="flex justify-between">
              <Button
                type="submit"
                className={`text-white px-4 py-2 rounded hover:bg-yellow-700 transition ${
                  loading ? "bg-yellow-200" : "bg-yellow-500"
                }`}>
                {loading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Update Package"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
