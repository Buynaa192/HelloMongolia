import { api } from "@/axios";
import axios from "axios";
import { toast } from "sonner";

export type DataType = {
  name: string;
  description: string;
  duration: string;
  cost: number;
  tripType: string;
  availableFrom: string;
  availableUntil: string;
  rating: number;
  coverPhoto?: File;
  itinerary?: File;
};
type FormdataType = {
  companyId: string;
  data: DataType;
  setLoading: (loading: boolean) => void;
};
export const UPLOUD_PRESSET = "temuulen";
export const CLOUD_NAME = "dpmo1etqt";

export const uploadImage = async (file: File) => {
  if (!(file instanceof File)) {
    console.error(" a valid file");
    return;
  }
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOUD_PRESSET);
  const responseImg = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    formData
  );

  return responseImg.data.secure_url || responseImg.data.url;
};
export const CreatePackageFun = async ({
  companyId,
  data,
  setLoading,
}: FormdataType) => {
  const availableFrm = new Date(data.availableFrom);

  const availableUntl = new Date(data.availableUntil);
  const cost = Number(data.cost);
  const coverPhoto = await uploadImage(data.coverPhoto!);
  const itineraryPdf = await uploadImage(data.itinerary!);

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
