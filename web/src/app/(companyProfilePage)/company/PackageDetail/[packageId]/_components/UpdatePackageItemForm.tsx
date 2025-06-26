// "use client";

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { Loader } from "lucide-react";

// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// import { api } from "@/axios";
// import {
//   ActivityType,
//   PackageItemType,
// } from "@/app/_providers/AuthProvider";
// import { ActivityMultiSelect } from "./ActivityMultiSelect";
// import { DestinationSelector } from "../../../_components/DestinationSelector";

// const schema = z.object({
//   title: z.string().min(1),
//   description: z.string().min(1),
//   image: z.any().optional(),
//   destinationId: z.string().min(1),
//   accommodation: z.string().min(1),
//   activity: z.array(z.string()).min(1),
// });

// type FormValues = z.infer<typeof schema>;

// type Props = {
//   item: PackageItemType;
//   onSuccess?: () => void;
// };

// export function UpdatePackageItemForm({ item, onSuccess }: Props) {
//   const [activities, setActivities] = useState<ActivityType[]>([]);
//   const [previewImage, setPreviewImage] = useState(item.image);
//   const [loading, setLoading] = useState(false);

//   const form = useForm<FormValues>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       title: item.title,
//       description: item.description,
//       destinationId: item.destinationId?._id || "",
//       accommodation: item.accommodation?.hotelName || "",
//       activity: item.activity?.map((a) => a._id) || [],
//       image: undefined,
//     },
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [destRes, actRes] = await Promise.all([
//           api.get("/destination"),
//           api.get("/activity/me"),
//         ]);
//         setActivities(actRes.data.activities || []);
//       } catch (err) {
//         console.error("Dropdown data fetch error", err);
//       }
//     };
//     fetchData();
//   }, []);

//   const onSubmit = async (values: FormValues) => {
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("title", values.title);
//     formData.append("description", values.description);
//     formData.append("destinationId", values.destinationId);
//     formData.append("accommodation", values.accommodation);
//     values.activity.forEach((id) => formData.append("activity", id));
//     if (values.image && values.image[0]) {
//       formData.append("image", values.image[0]);
//     }

//     try {
//       await api.put(`/packageItem/${item._id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("Day itinerary updated");
//       onSuccess?.();
//     } catch (err) {
//       console.error("Update failed:", err);
//       toast.error("Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <DialogContent className="w-full bg-white max-h-screen overflow-y-auto rounded-xl">
//       <DialogHeader>
//         <DialogTitle>Update Day {item.order}</DialogTitle>
//       </DialogHeader>

//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-6 p-6 text-black">
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Title</FormLabel>
//                 <FormControl>
//                   <Input {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Description</FormLabel>
//                 <FormControl>
//                   <Textarea {...field} rows={4} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="image"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Image</FormLabel>
//                 <FormControl>
//                   <div>
//                     <Input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => {
//                         field.onChange(e.target.files);
//                         if (e.target.files?.[0]) {
//                           setPreviewImage(
//                             URL.createObjectURL(e.target.files[0])
//                           );
//                         }
//                       }}
//                     />
//                     {previewImage && (
//                       <img
//                         src={previewImage}
//                         alt="Preview"
//                         className="mt-3 rounded-xl w-full max-w-md h-48 object-cover"
//                       />
//                     )}
//                   </div>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="destinationId"
//             render={({ field }) => (
//               <DestinationSelector
//                 selectedId={field.value}
//                 setDestinationId={field.onChange}
//               />
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="accommodation"
//             render={({ field }) => (

//             )}
//           />

//           {/* Activity */}
//           <FormField
//             control={form.control}
//             name="activity"
//             render={({ field }) => (
//               <ActivityMultiSelect
//                 selected={field.value}
//                 setSelected={field.onChange}
//                 activities={activities}
//               />
//             )}
//           />

//           {/* Submit */}
//           <Button type="submit" className="w-full md:w-auto" disabled={loading}>
//             {loading ? (
//               <span className="flex items-center gap-2">
//                 <Loader size={16} className="animate-spin" />
//                 Saving...
//               </span>
//             ) : (
//               "Save Changes"
//             )}
//           </Button>
//         </form>
//       </Form>
//     </DialogContent>
//   );
// }
