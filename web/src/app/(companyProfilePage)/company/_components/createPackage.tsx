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
import { PackageType, useAuth } from "@/app/_providers/AuthProvider";
import { Textarea } from "@/components/ui/textarea";
import { usePackageContext } from "./PackageProvider";
import { useRouter } from "next/navigation";
import { CreatePackageItemForm } from "./CreatePackageItemForm";
import { AlertDial } from "./Alert";

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export type CreatePackageType = {
  message: string;
  package: PackageType;
};
const schema = z.object({
  coverPhoto: z
    .any()
    .refine((file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
    }),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  cost: z.number(),
  tripType: z.string().min(1),
  availableFrom: z.string(),
  availableUntil: z.string(),
});

type FormData = z.infer<typeof schema>;

export const CreatePackage = () => {
  const { company } = useAuth();
  const { addPackage, addItemToPackage, items, loading, setItems } =
    usePackageContext();
  const [prevProfileImage, setPrevProfileImage] = useState("");
  const [DialogOpen, setDialogOpen] = useState(false);
  const [createdPackageId, setCreatedPackageId] = useState<string | null>(null);
  const [error, setError] = useState("");
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
    if (items.length === 0) {
      setError(
        "Please add at least one item to the package before submitting."
      );
      return;
    }
    const duration = items.length;

    const createdPackage: CreatePackageType = await addPackage(
      company._id,
      data,
      duration
    );

    if (createdPackage?.package._id) {
      setCreatedPackageId(createdPackage.package._id);
      for (const item of items) {
        try {
          await addItemToPackage(createdPackage?.package._id, item._id);
        } catch (err) {
          console.error(`Failed to add item ${item._id}:`, err);
        }
      }
    }
    form.reset();
    setItems([]);
    setPrevProfileImage("");
    setTimeout(() => {
      setDialogOpen(true);
    }, 500);
  };

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
            className="bg-white px-6 md:px-12 py-10 shadow-xl rounded-2xl space-y-8 w-full">
            <p className="font-bold text-2xl">Package Details</p>

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
            <CreatePackageItemForm error={error} setError={setError} />
            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                className={`w-full md:w-auto flex justify-center items-center gap-2 px-6 py-3 rounded-md text-white ${
                  loading ? "bg-green-300" : "bg-green-600 hover:bg-green-700"
                }`}
                disabled={loading}>
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={18} />
                    <span>Creating...</span>
                  </>
                ) : (
                  "Create Package"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      {createdPackageId && (
        <AlertDial
          title="Package created successfully!"
          isOpen={DialogOpen}
          setIsOpen={setDialogOpen}
        />
      )}
    </div>
  );
};
