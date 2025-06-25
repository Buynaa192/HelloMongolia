"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { api, setAuthToken } from "@/axios";
export type ActivityType = {
  _id: string;
  emoji: string;
  activityName: string;
};
export type PackageItemType = {
  _id: string;
  order: number;
  title: string;
  image: string;
  destinationId: DestinationType | null;
  description: string;
  activity: ActivityType[];
  accommodation: AccommodationType;
};
export type PackageType = {
  _id: string;
  title: string;
  owner: string;
  coverPhoto: string;
  description: string;
  packageItem: PackageItemType[];
  duration: string;
  availableFrom: string;
  availableUntil: string;
  cost: number;
  itinerary: string;
  tripType: string;
  rating: number;
  companyId: CompanyType;
};
export type ReviewType = {
  _id: string;
  reviewerName: string;
  companyId: string;
  message: string;
};

export type WeatherType = {
  _id: string;
  season: "Spring" | "Summer" | "Autumn" | "Winter";
  averageTempF: number;
};

export type rgnType =
  | "Northern-Mongolia"
  | "Southern-Mongolia"
  | "Western-Mongolia"
  | "Eastern-Mongolia";

export type RegionType = {
  _id: string;
  regionName: rgnType;
  description: string;
  videoUrl: string;
};

export type DestinationType = {
  _id: string;
  destinationName: string;
  destinationImages: string[];
  region: string;
  description: string;
  activities: ActivityType[];
  location: LocationType;
  weather: WeatherType[];
};
export type LocationType = {
  lat: number;
  lng: number;
};
export type AccommodationType = {
  _id: string;
  hotelName: string;
  address: string;
};

export type CompanyType = {
  _id: string;
  email: string;
  password: string;
  name: string;
  background: string;
  AvatarImage: string;
  since: number;
  phoneNumber: number | null;
  websiteURL: string;
  about: string;
  packages: PackageType[];
  availableDestinations: DestinationType[];
  reviews: number;
  Rating: number;
};
type AuthContextType = {
  company?: CompanyType;
  signIn: (email: string, password: string) => Promise<CompanyType>;
  signOut: () => Promise<void>;
  setCompany: (company?: CompanyType) => void;
  getCompany: () => Promise<void>;
};
const AuthContext = createContext({} as AuthContextType);
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [company, setCompany] = useState<CompanyType>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post(`/auth/signin`, {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setCompany(data.user);
      return data.user;
    } catch {
      throw new Error("error");
    }
  };

  const signOut = async () => {
    setAuthToken(null);
    localStorage.removeItem("token");
    setCompany(undefined);
    router.push("/");
  };
  const getCompany = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/auth/me");
      setCompany(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setAuthToken(token);
    getCompany();
  }, []);

  return (
    <AuthContext.Provider
      value={{ company, signIn, signOut, setCompany, getCompany }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
