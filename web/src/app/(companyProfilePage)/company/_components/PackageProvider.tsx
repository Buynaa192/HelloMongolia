"use client";

import { PackageItemType, PackageType } from "@/app/_providers/AuthProvider";
import { api } from "@/axios";
import axios from "axios";
import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";
import { createPackageItemType } from "./itemSchema";
import { CreatePackageType } from "./createPackage";
type CreatePackageItemInput = {
  order: number;
  title: string;
  image?: File | string;
  destinationId: string;
  description: string;
  accommodation: string;
  activity: string[];
};
type PackageContextProps = {
  packages: PackageType[];
  items: PackageItemType[];
  view: string;
  loading: boolean;
  error: string | null;
  getPackages: (companyId: string) => Promise<void>;
  addPackage: (
    companyId: string,
    data: DataType,
    duration: number
  ) => Promise<CreatePackageType>;
  updatePackage: (
    packageId: string,
    data: DataType,
    duration: number
  ) => Promise<void>;
  deletePackage: (
    packageId: string,
    setLoading: (loading: boolean) => void
  ) => Promise<void>;
  deletePackageItem: (packageItemId: string) => Promise<void>;
  setItems: React.Dispatch<React.SetStateAction<PackageItemType[]>>;
  createPackageItemFun: (
    itemData: CreatePackageItemInput
  ) => Promise<createPackageItemType>;
  setView: (view: string) => void;
  addItemToPackage: (packageId: string, packageItemId: string) => void;
};

export type DataType = {
  name: string;
  description: string;
  cost: number;
  tripType: string;
  availableFrom: string;
  availableUntil: string;
  coverPhoto?: File | string;
};

const PackageContext = createContext({} as PackageContextProps);

const UPLOAD_PRESET = "HelloMongolia";
const CLOUD_NAME = "df60cobe2";

export const uploadImage = async (file: File): Promise<string> => {
  if (!(file instanceof File)) {
    throw new Error("Invalid file for upload");
  }
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    formData
  );

  return response.data.secure_url || response.data.url;
};

export function PackageProvider({ children }: { children: ReactNode }) {
  const [packages, setPackages] = useState<PackageType[]>([]);
  const [items, setItems] = useState<PackageItemType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState("Dashboard");
  const getPackages = async (companyId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/package/${companyId}`);
      const data = response.data;
      if (data?.packages) {
        setPackages(data.packages);
      } else {
        setPackages([]);
        setError("Invalid package data");
      }
    } catch (error) {
      console.error("getPackages error:", error);
      setError("An error occurred while fetching packages");
    } finally {
      setLoading(false);
    }
  };

  const addPackage = async (
    companyId: string,
    data: DataType,
    duration: number
  ) => {
    try {
      setLoading(true);

      const availableFromDate = new Date(data.availableFrom);
      const availableUntilDate = new Date(data.availableUntil);
      const costNumber = Number(data.cost);

      const coverPhotoUrl =
        typeof data.coverPhoto === "string"
          ? data.coverPhoto
          : data.coverPhoto
          ? await uploadImage(data.coverPhoto)
          : "";

      const response = await api.post(`/package`, {
        companyId,
        title: data.name,
        coverPhoto: coverPhotoUrl,
        description: data.description,
        duration: duration,
        availableFrom: availableFromDate,
        availableUntil: availableUntilDate,
        cost: costNumber,
        tripType: data.tripType,
      });

      toast.success("Package created successfully!", {
        style: {
          color: "green",
        },
      });
      return response.data;
    } catch (error) {
      console.error("addPackage error:", error);
      toast.error("Failed to create package", {
        style: {
          color: "red",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const createPackageItemFun = async (itemData: CreatePackageItemInput) => {
    try {
      setLoading(true);
      const coverPhotoUrl =
        typeof itemData.image === "string"
          ? itemData.image
          : itemData.image
          ? await uploadImage(itemData.image)
          : "";

      const response = await api.post(`/packageItem`, {
        order: Number(itemData.order),
        title: itemData.title,
        image: coverPhotoUrl,
        destinationId: itemData.destinationId,
        description: itemData.description,
        activity: itemData.activity,
        accommodation: itemData.accommodation,
      });

      toast.success("Package Item created successfully!", {
        style: {
          color: "green",
        },
      });
      return response.data;
    } catch (error) {
      console.error("addPackageItem error:", error);
      toast.error("Failed to create package item", {
        style: {
          color: "red",
        },
      });
    } finally {
      setLoading(false);
    }
  };
  const addItemToPackage = async (packageId: string, packageItemId: string) => {
    try {
      setLoading(true);
      await api.post(`/package/addPackageItem/${packageId}`, {
        packageItemId,
      });
    } catch (error) {
      console.error("addPackageItem error:", error);
      toast.error("Failed to add itinerary", {
        style: {
          color: "red",
        },
      });
    } finally {
      setLoading(false);
    }
  };
  const updatePackage = async (
    packageId: string,
    data: DataType,
    duration: number
  ) => {
    try {
      setLoading(true);

      const availableFromDate = new Date(data.availableFrom);
      const availableUntilDate = new Date(data.availableUntil);
      const costNumber = Number(data.cost);

      const coverPhotoUrl =
        typeof data.coverPhoto === "string"
          ? data.coverPhoto
          : data.coverPhoto
          ? await uploadImage(data.coverPhoto)
          : "";

      const response = await api.put(`/package/${packageId}`, {
        title: data.name,
        coverPhoto: coverPhotoUrl,
        description: data.description,
        availableFrom: availableFromDate,
        availableUntil: availableUntilDate,
        cost: costNumber,
        tripType: data.tripType,
        duration: duration,
      });

      toast.success("Package updated successfully!", {
        style: {
          color: "green",
        },
      });
      return response.data;
    } catch (error) {
      console.error("updatePackage error:", error);
      toast.error("Failed to update package", {
        style: {
          color: "red",
        },
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deletePackage = async (
    packageId: string,
    setLoading: (loading: boolean) => void
  ) => {
    try {
      setLoading(true);
      await api.delete(`/package/${packageId}`);
      toast.success("Package deleted successfully", {
        style: {
          color: "green",
        },
      });
      setPackages((prev) => prev.filter((pkg) => pkg._id !== packageId));
    } catch (error) {
      console.error("deletePackage error:", error);
      toast.error("Failed to delete package", {
        style: {
          color: "red",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const deletePackageItem = async (packageItemId: string) => {
    try {
      setLoading(true);
      await api.delete(`/packageItem/${packageItemId}`);
      toast.success("Package item deleted successfully", {
        style: {
          color: "green",
        },
      });
    } catch (error) {
      console.error("deletePackageItem error:", error);
      toast.error("Failed to delete package item", {
        style: {
          color: "red",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PackageContext.Provider
      value={{
        packages,
        loading,
        error,
        items,
        view,
        setView,
        setItems,
        getPackages,
        addPackage,
        updatePackage,
        deletePackage,
        deletePackageItem,
        createPackageItemFun,
        addItemToPackage,
      }}>
      {children}
    </PackageContext.Provider>
  );
}

export const usePackageContext = () => useContext(PackageContext);
