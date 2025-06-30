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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/app/_providers/AuthProvider";
import { Textarea } from "@/components/ui/textarea";
import { usePackageContext } from "./PackageProvider";
import { CreatePackageItinerary } from "./CreatePackageItinerary";
import { CreatePackageItemForm } from "./CreatePackageItemForm";
import { useRouter } from "next/navigation";

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schema = z.object({
  coverPhoto: z
    .any()
    .refine((file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
    }),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.string().min(1),
  cost: z.number(),
  tripType: z.string().min(1),
  availableFrom: z.string(),
  availableUntil: z.string(),
});

type FormData = z.infer<typeof schema>;

export const CreatePackage = () => {
  const { company } = useAuth();
  const { addPackage, newPackage, setNewPackage } = usePackageContext();
  const [loading, setLoading] = useState(false);
  const [prevProfileImage, setPrevProfileImage] = useState("");
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      tripType: "Adventure",
      availableFrom: "",
      availableUntil: "",
      coverPhoto: undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!company?._id) {
      console.error("Company ID not available");
      return;
    }

    const createdPackage = await addPackage(company._id, data, setLoading);

    if (createdPackage.package) {
      setNewPackage(createdPackage.package);
    }
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto flex flex-col  gap-6 item-center justify-center">
      <div className=" gap-6">
        <div className="mb-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            <MoveLeftIcon /> back
          </Button>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white px-6 md:px-12 py-10 shadow-xl rounded-2xl space-y-8 w-full">
            <p className="font-bold text-2xl">Package Details</p>
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
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
                        <option value="Adventure">Adventure</option>
                        <option value="Scenery">Scenery</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Historical">Historical</option>
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
            <FormField
              control={form.control}
              name="coverPhoto"
              render={() => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Cover Photo
                  </FormLabel>
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
          </form>
        </Form>
      </div>

      <CreatePackageItemForm />
    </div>
  );
};
