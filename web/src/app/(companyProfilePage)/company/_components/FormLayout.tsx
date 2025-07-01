import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader, Camera } from "lucide-react";
import { DestinationSelector } from "./DestinationSelector";
import { ActivityType } from "@/app/_providers/AuthProvider";
import { ItemFormType } from "./itemSchema";
import { AccommodationSelector } from "./AccommodationSelector";
import { UseFormReturn } from "react-hook-form";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ActivitySelector } from "../CreatePackagePage/_components/ActivitySelector";
type Props = {
  form: UseFormReturn<ItemFormType>;
  onSubmit: (data: ItemFormType) => Promise<void>;
  prevProfileImage: string;
  setPrevProfileImage: (url: string) => void;
  activityList?: ActivityType[];
  order: number;
  loading: boolean;
};

export const FormLayout = ({
  form,
  onSubmit,
  prevProfileImage,
  setPrevProfileImage,
  activityList,
  loading,
  order,
}: Props) => {
  return (
    <DialogContent className="w-full bg-white max-h-screen overflow-y-auto rounded-xl">
      <DialogTitle>Day {order} Details </DialogTitle>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white px-6  py-10 shadow-xl rounded-2xl space-y-8 w-full">
          <div className="grid grid-cols-2 gap-4">
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
          </div>
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <div className="relative w-full h-64 border-2 border-dashed rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                    {prevProfileImage ? (
                      <img
                        src={prevProfileImage}
                        alt="Preview"
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
            name="accommodation"
            render={({ field }) => (
              <AccommodationSelector
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <FormField
            control={form.control}
            name="activity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activities</FormLabel>
                <FormControl>
                  <ActivitySelector
                    activityList={activityList || []}
                    selectedIds={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-6">
            <Button
              type="button"
              onClick={form.handleSubmit(onSubmit)}
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
                "Add Day"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};
