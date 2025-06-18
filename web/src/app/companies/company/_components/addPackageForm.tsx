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
import { Textarea } from "./ui/textarea";
import { Input } from "@/components/ui/input";
import { CreatePackageFun } from "./createPackageFunction";
import { PackageType } from "@/app/_providers/AuthProvider";
import { PackageItemList } from "../addPackageList";
const companyId = "684b7452cf844286f738f2db";
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
type createPackageType = {
  message: string;
  package: PackageType;
};
const schema = z.object({
  coverPhoto: z
    .any()
    .refine(
      (file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type),
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
    .refine((file) => file && file.type === "application/pdf", {
      message: "Please upload a valid PDF file",
    }),
  availableFrom: z.string(),
  availableUntil: z.string(),
  rating: z.number().min(0).max(5),
});

type FormData = z.infer<typeof schema>;

export const AddPackageForm = () => {
  const [packageId, setPackageId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [prevProfileImage, setPrevProfileImage] = useState("");
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      duration: "",
      cost: "",
      tripType: "",
      availableFrom: "",
      availableUntil: "",
      coverPhoto: undefined,
      itinerary: undefined,
      rating: 0,
    },
  });
  const onSubmit = async (data: FormData) => {
    const createdPackage: createPackageType = await CreatePackageFun({
      companyId,
      data,
      setLoading,
    });

    if (createdPackage) {
      setPackageId(createdPackage.package._id);
    }
  };
  return (
    <DialogContent className="w-full bg-white max-h-screen overflow-y-auto rounded-xl">
      <DialogHeader>
        <DialogTitle>
          {packageId ? "add PackageItem" : "Add Package"}
        </DialogTitle>
        {!packageId ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 bg-white p-6 rounded-xl shadow-lg w-full  ">
              <FormField
                control={form.control}
                name="coverPhoto"
                render={({}) => (
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
                        <select
                          {...field}
                          className="w-full border rounded p-2">
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
                  render={({}) => (
                    <FormItem>
                      <FormLabel>Itinerary PDF</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              form.setValue("itinerary", file);
                             
                            }
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
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
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
                  
                  className={` text-white px-4 py-2 rounded hover:bg-green-700 transition ${
                    loading ? "bg-green-200" : "bg-green-500"
                  } text-white`}>
                  {loading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Create Package"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div>
            <PackageItemList packageId={packageId} />
          </div>
        )}
      </DialogHeader>
    </DialogContent>
  );
};
