import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";

import { PackageType } from "@/app/_providers/AuthProvider";
import { UpdatePackageFun } from "./updateAndDeletePackageFunction";
import { Textarea } from "./ui/textarea";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schema = z.object({
  coverPhoto: z
    .any()
    .refine(
      (file) => file?.[0] && ACCEPTED_IMAGE_TYPES.includes(file[0].type),
      {
        message: "Only .jpg, .jpeg, .png and .webp formats are supported.",
      }
    ),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.string().min(1),
  cost: z.string().min(1),
  tripType: z.string().min(1),
  itinerary: z
    .any()
    .refine((file) => file?.[0] && file[0].type === "application/pdf", {
      message: "Please upload a valid PDF file",
    }),
  availableFrom: z.string(),
  availableUntil: z.string(),
  rating: z.number().min(0).max(5),
});

type FormData = z.infer<typeof schema>;
export type Props = {
  packageData: PackageType;
};

export const UpdatePackageForm = ({ packageData }: Props) => {
  const [loading, setLoading] = useState(false);
  console.log("", packageData);
  const [prevProfileImage, setPrevProfileImage] = useState(
    packageData.coverPhoto
  );
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: packageData.title,
      description: packageData.description,
      duration: packageData.duration,
      cost: packageData.cost,
      tripType: packageData.tripType,
      itinerary: packageData.itinerary,
      availableFrom: new Date(packageData.availableFrom)
        .toISOString()
        .split("T")[0],
      availableUntil: new Date(packageData.availableUntil)
        .toISOString()
        .split("T")[0],
      rating: Number(packageData.rating),
    },
  });

  const onSubmit = async (data: FormData) => {
    await UpdatePackageFun({
      packageId: packageData._id,
      data,
      setLoading,
    });
  };

  return (
    <DialogContent className="w-full bg-white max-h-screen overflow-y-auto rounded-xl">
      <DialogHeader>
        <DialogTitle>update package</DialogTitle>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 bg-white p-6 rounded-xl shadow-lg w-full  ">
            <FormField
              control={form.control}
              name="coverPhoto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Photo</FormLabel>
                  <FormControl>
                    <div className="relative w-full  h-40 border border-dashed  overflow-hidden rounded-xl">
                      {prevProfileImage && (
                        <img
                          src={prevProfileImage}
                          className="object-cover w-full h-full "
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
                              form.setValue("coverPhoto", e.target.files);
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
                      <Input placeholder=" 3 days" {...field} />
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
                        <option value="Sightseeing">Sightseeing</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Culture & history">
                          Culture & History
                        </option>
                        <option value="Family vacations">
                          Family Vacations
                        </option>
                        <option value="Scientific">Scientific</option>
                        <option value="Festival & Events">
                          Festival & Events
                        </option>
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
              <FormField
                control={form.control}
                name="itinerary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Itinerary PDF</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => {
                          const files = e.target.files;
                          field.onChange(files);
                        }}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating (0-5)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                // disabled={loading || !form.formState.isValid}
                className={` text-white px-4 py-2 rounded hover:bg-green-700 transition ${
                  loading ? "bg-yellow-200" : "bg-yellow-500"
                } text-white`}>
                {loading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Update Package"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogHeader>
    </DialogContent>
  );
};
