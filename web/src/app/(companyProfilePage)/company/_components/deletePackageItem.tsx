import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { usePackageContext } from "./PackageProvider";
type TitlePropsType = {
  title: string;
  packageItemId: string;
  packageItems: () => Promise<void>;
};
export const DeletePackageItem = ({
  title,
  packageItemId,
  packageItems,
}: TitlePropsType) => {
  const { deletePackageItem, loading } = usePackageContext();
  return (
    <DialogContent className="bg-white rounded-xl flex flex-col justify-center">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold">
          Are you sure you want to delete the &apos;{title} &apos; package item?
        </DialogTitle>
      </DialogHeader>
      <DialogFooter className="w-full flex justify-center gap-4">
        <DialogClose asChild>
          <Button
            variant="ghost"
            className="border border-gray-300"
            onClick={() => {}}>
            cancel
          </Button>
        </DialogClose>
        <Button
          className="bg-red-600 text-white hover:bg-red-700"
          onClick={async () => {
            await deletePackageItem(packageItemId);
            await packageItems();
          }}>
          {loading ? <Loader className="animate-spin" /> : "delete"}
        </Button>
      </DialogFooter>
      <div className="flex justify-end gap-4 mt-6"></div>
    </DialogContent>
  );
};
