import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Props } from "./updatePackageForm";
import { deletePackageFun } from "./updateAndDeletePackageFunction";
type TitlePropsType = {
  title: string;
  packageId: string;
};
export const DeletePackage = ({ title, packageId }: TitlePropsType) => {
  return (
    <DialogContent className="bg-white rounded-xl">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold">
          Are you sure you want to delete the '{title}' package?
        </DialogTitle>
      </DialogHeader>
      <div className="flex justify-end gap-4 mt-6">
        <Button
          variant="ghost"
          className="border border-gray-300"
          onClick={() => {}}>
          cancel
        </Button>
        <Button
          className="bg-red-600 text-white hover:bg-red-700"
          onClick={() => deletePackageFun(packageId)}>
          delete
        </Button>
      </div>
    </DialogContent>
  );
};
