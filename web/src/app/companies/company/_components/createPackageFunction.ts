import { api } from "@/axios";
import axios from "axios";
import { title } from "process";
import { toast } from "sonner";

export type DataType = {
  name: string;
  description: string;
  duration: string;
  cost: string;
  tripType: string;
  availableFrom: string;
  availableUntil: string;
  rating: number;
  coverPhoto?: any;
  itinerary?: any;
};
type FormdataType = {
  companyId: string;
  data: DataType;
  setLoading: (loading: boolean) => void;
};
export const UPLOUD_PRESSET = "temuulen";
export const CLOUD_NAME = "dpmo1etqt";
export const uploadImage = async (file: File | undefined) => {
  console.log(file);
  if (!file) {
    console.warn("No file provided for upload");
    return undefined;
  }
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOUD_PRESSET);

  try {
    const responseImg = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );
    return responseImg.data.secure_url || responseImg.data.url;
  } catch (error) {
    console.error("Upload failed:", error);
    return undefined;
  }
};
export const CreatePackageFun = async ({
  companyId,
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
    const response = await api.post(`/package`, {
      companyId,
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
