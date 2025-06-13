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
import axios from "axios";
import { api, setAuthToken } from "@/axios";
import { string } from "zod";
export type Activity = {
  id: string;
  emoji: string;
  name: string;
};
export type PackageItem = {
  id: string;
  order: number;
  title: string;
  image: string;
  destination: string;
  description: string;
  activity: Activity[];
  accomodation: string;
};
export type Package = {
  id: string;
  owner: string;
  coverPhoto: string;
  description: string;
  packageItem: PackageItem[];
  duration: number;
  availableFrom: Date;
  availableUntil: Date;
  cost: number;
  hutulbur: File;
  tripType: string;
  rating: number;
};
export type Review = {
  id: string;
  reviewerName: string;
  companyId: string;
  message: string;
};
export type Destination = {
  id: string;
  name: string;
  images: string[];
  region: string;
  description: string;
  activities: Activity[];
};
export type Company = {
  id: string;
  email: string;
  password: string;
  name: string;
  background: string;
  avatarImage: string;
  since: number;
  phoneNumber: number;
  websiteURL: string;
  about: string;
  packages: Package[];
  availableDestinations: Destination[];
  reviews: Review[];
  Rating: number;
};
type AuthContextType = {
  company?: Company;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setCompany: (company?: Company) => void;
  getCompany: () => Promise<void>;
};
const AuthContext = createContext({} as AuthContextType);
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [company, setCompany] = useState<Company>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await axios.post(`/auth/sign-in`, {
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
