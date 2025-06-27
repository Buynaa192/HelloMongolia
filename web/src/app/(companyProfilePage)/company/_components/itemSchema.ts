import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES } from "./createPackage";
import { PackageItemType, PackageType } from "@/app/_providers/AuthProvider";

export const itemSchema = z.object({
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

export type ItemFormType = z.infer<typeof itemSchema>;

export type createPackageItemType = {
  message: string;
  package: PackageType;
};
