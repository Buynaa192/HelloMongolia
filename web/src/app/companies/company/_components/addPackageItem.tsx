import { PackageItemType } from "@/app/_providers/AuthProvider";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

export const AddPackageForm = () => {
    const [packageItem,setPackageItem]=useState<PackageItemType>()

  const [loading, setLoading] = useState(false);
    const onSubmit = async () => { }

  return (
    <DialogContent className="w-full bg-white max-h-screen overflow-y-auto rounded-xl">
      <DialogHeader>
              <DialogTitle>Add PackageItem</DialogTitle>
              <div>
                  
              </div>
              
       
      </DialogHeader>
    </DialogContent>
  );
};
