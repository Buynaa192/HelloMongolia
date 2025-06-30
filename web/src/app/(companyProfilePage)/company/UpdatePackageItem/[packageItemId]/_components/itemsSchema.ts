import { z } from "zod";
import { PackageType } from "@/app/_providers/AuthProvider";
export const itemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.any().optional(),
  destinationId: z.string().min(1),
  accommodation: z.string().min(1),
  activity: z.array(z.string()).min(1),
});

export type ItemFormType = z.infer<typeof itemSchema>;

export type createPackageItemType = {
  message: string;
  package: PackageType;
};
