import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
type AlertType = {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
export const AlertDial = ({ title, isOpen, setIsOpen }: AlertType) => {
  const router = useRouter();
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              router.push("/company/AllPackages");
            }}>
            Return to dashboard
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              router.push("/company/CreatePackagePage");
            }}>
            Create a new travel package
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
