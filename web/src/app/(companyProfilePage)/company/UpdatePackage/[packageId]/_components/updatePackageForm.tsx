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
import { PackageItemCard } from "./packageItemCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddPackageItemForm } from "./AddNewItem";
import { DialogTitle } from "@radix-ui/react-dialog";

const schema = z.object({
  coverPhoto: z.any().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
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
  const [prevProfileImage, setPrevProfileImage] = useState("");
  const { updatePackage, loading } = usePackageContext();
  const [isOpen, setIsOpen] = useState(false);
  const duration = packge?.packageItem ? packge.packageItem.length : 0;
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      cost: 0,
      tripType: "Adventure",
      availableFrom: "",
      availableUntil: "",
      coverPhoto: undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    await updatePackage(packageId, data, duration);
    setTimeout(() => {
      router.push("/company/AllPackages");
    }, 500);
  };
  const getPackage = async () => {
    try {
      const res = await api.get(`/package?packageId=${packageId}`);
      if (res) {
        setPackge(res.data.packages[0]);
      }
    } catch (error) {
      console.error("Failed to fetch package:", error);
    }
  };
  useEffect(() => {
    if (packge) {
      setPrevProfileImage(packge.coverPhoto);

      form.reset({
        coverPhoto: packge.coverPhoto,
        name: packge.title ?? "",
        description: packge.description ?? "",
        cost: packge.cost ?? 0,
        tripType: packge.tripType ?? "",
        availableFrom: packge.availableFrom
          ? new Date(packge.availableFrom).toISOString().split("T")[0]
          : "",
        availableUntil: packge.availableUntil
          ? new Date(packge.availableUntil).toISOString().split("T")[0]
          : "",
      });
    }
  }, [packge]);
  useEffect(() => {
    getPackage();
  }, []);
  console.log("photo", prevProfileImage);
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
            <p className="font-medium text-xl">Update Package Details</p>
            <FormField
              control={form.control}
              name="coverPhoto"
              render={() => (
                <FormItem>
                  <FormLabel>Cover Photo</FormLabel>
                  <FormControl>
                    <div className="relative w-full h-64 border border-dashed overflow-hidden rounded-xl">
                      {prevProfileImage ? (
                        <img
                          src={prevProfileImage}
                          className="object-cover w-full h-full"
                          alt="Cover Photo"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          No image
                        </div>
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
            <Card className="w-full">
              <CardHeader className="flex flex-row justify-between">
                <div>
                  <CardTitle>Update your daily itinerary details</CardTitle>
                  <CardDescription>
                    Edit the destinations, activities, and notes for each day of
                    your trip.
                  </CardDescription>
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button>Add Day</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl w-full max-h-screen overflow-y-auto bg-white rounded-xl">
                    <DialogTitle>
                      Day{" "}
                      {packge?.packageItem.length
                        ? packge?.packageItem.length + 1
                        : 1}
                    </DialogTitle>

                    <AddPackageItemForm
                      packageId={packageId}
                      getPackage={getPackage}
                      order={
                        packge?.packageItem.length
                          ? packge?.packageItem.length + 1
                          : 1
                      }
                      setIsOpen={setIsOpen}
                    />
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="w-full grid grid-cols-3 gap-4">
                  {packge?.packageItem.map((item, index) => (
                    <PackageItemCard
                      key={item._id}
                      item={item}
                      index={index}
                      getPackage={getPackage}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-between">
              <Button
                disabled={loading}
                type="submit"
                className={`text-white px-4 py-2 rounded hover:bg-yellow-700 transition ${
                  loading ? "bg-yellow-200" : "bg-yellow-500"
                }`}>
                {loading ? <Loader className="animate-spin" /> : "Save changes"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
