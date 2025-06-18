import { api } from "@/axios";
import { DataType, uploadImage } from "./createPackageFunction";
import { toast } from "sonner";
import { PackageType } from "@/app/_providers/AuthProvider";
type FormdataType = {
  packageId: string;
  data: DataType;
  setLoading: (loading: boolean) => void;
};
export const UpdatePackageFun = async ({
  packageId,
  data,
  setLoading,
}: FormdataType) => {
  const availableFrm = new Date(data.availableFrom);

  const availableUntl = new Date(data.availableUntil);
  const cost = Number(data.cost);
  const coverPhoto = await uploadImage(data.coverPhoto[0]);
  console.log(coverPhoto);
  const itineraryPdf = await uploadImage(data.itinerary[0]);
  console.log(itineraryPdf);
  try {
    setLoading(true);
    const response = await api.put(`/package/${packageId}`, {
      packageId,
      title: data.name,
      coverPhoto: coverPhoto,
      description: data.description,
      duration: data.duration,
      availableFrom: availableFrm,
      availableUntil: availableUntl,
      cost: cost,
      itinerary: itineraryPdf,
      tripType: data.tripType,
      rating: data.rating,
    });
    toast.success("success!");
    return response.data;
  } catch (error) {
    console.error(error);
    {
      toast.error("error!");
    }
  } finally {
    setLoading(false);
  }
};
export const deletePackageFun = async (packageId: string) => {
  try {
    const res = await api.delete(`/package/${packageId}`);
    toast.success("Package deleted successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete the package");
  }
};
