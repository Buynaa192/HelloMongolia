import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deletePackageFun } from "./updateAndDeletePackageFunction";
import { useState } from "react";
import { Loader } from "lucide-react";
type TitlePropsType = {
  title: string;
  packageId: string;
  getPackages: ()=>Promise<void>;
};
export const DeletePackage = ({ title, packageId, getPackages }: TitlePropsType) => {
  const [loading, setLoading] = useState(false)
  return (
    <DialogContent className="bg-white rounded-xl flex flex-col justify-center">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold">
          Are you sure you want to delete the &apos;{title} &apos; package?
        </DialogTitle>
      </DialogHeader>
      <DialogFooter className="w-full flex justify-center gap-4">
  <DialogClose asChild>
    <Button
      variant="ghost"
      className="border border-gray-300"
      onClick={() => {}}
    >
      cancel
    </Button>
  </DialogClose>
  <Button
    className="bg-red-600 text-white hover:bg-red-700"
    onClick={async () => {
      await deletePackageFun(packageId,setLoading);
      await getPackages(); 
    }}
  >
    {loading ? <Loader className="animate-spin"/>:"delete"}
  </Button>
</DialogFooter>
      <div className="flex justify-end gap-4 mt-6">
        
        
      </div>
    </DialogContent>
  );
};
