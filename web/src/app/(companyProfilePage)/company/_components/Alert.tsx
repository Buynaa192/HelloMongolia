import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { usePackageContext } from "./PackageProvider";
type AlertType = {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
export const AlertDial = ({ title, isOpen, setIsOpen }: AlertType) => {
  const { setView } = usePackageContext();
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setView("dashboard");
            }}>
            Return to dashboard
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setView("create");
            }}>
            Create a new travel package
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
