"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api, setAuthToken } from "@/axios";
export type ActivityType = {
  _id: string;
  emoji: string;
  name: string;
};
export type PackageItemType = {
  _id: string;
  order: number;
  title: string;
  image: string;
  destination: string;
  description: string;
  activity: ActivityType[];
  accomodation: string;
};
export type PackageType = {
  _id: string;
  owner: string;
  coverPhoto: string;
  description: string;
  packageItem: PackageItemType[];
  duration: number;
  availableFrom: Date;
  availableUntil: Date;
  cost: number;
  hutulbur: File;
  tripType: string;
  rating: number;
};
export type ReviewType = {
  _id: string;
  reviewerName: string;
  companyId: string;
  message: string;
};
export type DestinationType = {
  _id: string;
  destinationName: string;
  destinationImages: string[];
  region: string;
  description: string;
  activities: ActivityType[];
};
export type CompanyType = {
  _id: string;
  email: string;
  password: string;
  name: string;
  background: string;
  avatarImage: string;
  since: number;
  phoneNumber: number;
  websiteURL: string;
  about: string;
  packages: PackageType[];
  availableDestinations: DestinationType[];
  reviews: ReviewType[];
  Rating: number;
};
type AuthContextType = {
  company?: CompanyType;
  signIn: (email: string, password: string) => Promise<void>;
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
      const { data } = await api.post(`/auth/sign-in`, {
        email,
        password,
      });
      console.log("USer", data.user);
      localStorage.setItem("token", data.token);
      setCompany(data.user);
      router.push("/");
      return data.user;
    } catch {
      toast.error("Failed to log in");
      return undefined;
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
