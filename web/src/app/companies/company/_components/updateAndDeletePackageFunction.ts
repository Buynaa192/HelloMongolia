import { api } from "@/axios";
import { DataType, uploadImage } from "./createPackageFunction";
import { toast } from "sonner";
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
  try {
    setLoading(true);

    const availableFrm = new Date(data.availableFrom);
    const availableUntl = new Date(data.availableUntil);
    const cost = Number(data.cost);
    const coverPhoto =
      typeof data.coverPhoto === "string"
        ? data.coverPhoto
        : await uploadImage(data.coverPhoto!);

    const itineraryPdf =
      typeof data.itinerary === "string"
        ? data.itinerary
        : await uploadImage(data.itinerary!);

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

    toast.success("Success!");
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Error updating package!");
  } finally {
    setLoading(false);
  }
};

export const deletePackageFun = async (
  packageId: string,
  setLoading: (value: boolean) => void
) => {
  try {
    setLoading(true);
    await api.delete(`/package/${packageId}`);
    toast.success("Package deleted successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete the package");
  } finally {
    setLoading(false);
  }
};

export const deletePackageItemFun = async (
  packageItemId: string,
  setLoading: (value: boolean) => void
) => {
  try {
    setLoading(true);
    await api.delete(`/packageItem/${packageItemId}`);
    toast.success("Package item deleted successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete the package item");
  } finally {
    setLoading(false);
  }
};
