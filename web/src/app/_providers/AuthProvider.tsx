"use client";
import {
  createContext,
  PropsWithChildren,
  useCallback,
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
  accommodation?: AccommodationType;
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
  region: RegionType;
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
  companyName: string;
  phoneNumber: number;
  since: number;
  websiteURL: string | null;
  about: string;
  background: string;
  AvatarImage: string;
  packages: PackageType[] | null;
  availableDestinations: DestinationType[] | null;
  reviews: number;
  Rating: number;
};
export type GuideStatus =
  | "Open for new bookings!"
  | "Booked and busy on the run!";

export type GuideType = {
  _id: string;
  name: string;
  phoneNumber: number;
  bio: string;
  status: GuideStatus;
  background: string;
  avatarImage: string;
  instagramURL: {
    type: String;
    default: "";
  };
  facebookURL: {
    type: String;
    default: "";
  };
  experienceYears?: number;
  experiencedDestinations?: string[];
  spokenLanguages: string[];
};

export type CustomerType = {
  _id: string;
  name: string;
  phoneNumber: number;
  avatarImage: string;
  nationality: string;
  travelExperience?: number;
};

export type UserProfile = CompanyType | GuideType | CustomerType;

export type UserRole = "company" | "guide" | "customer";

export interface AuthenticatedUser {
  _id: string;
  email: string;
  role: UserRole;
  companyDetails?: CompanyType;
  guideDetails?: GuideType;
  customerDetails?: CustomerType;
}

export type AuthContextType = {
  user?: AuthenticatedUser;
  signIn: (email: string, password: string) => Promise<AuthenticatedUser>;
  signOut: () => Promise<void>;
  setUser: (user?: AuthenticatedUser) => void;
  getUser: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<AuthenticatedUser>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/auth/signin", { email, password });
      localStorage.setItem("token", data.token);

      setAuthToken(data.token);

      setUser(data.user);

      return data.user;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to sign in. Please try again.";
      throw new Error(message);
    }
  };

  const signOut = async () => {
    setAuthToken(null);
    localStorage.removeItem("token");
    setUser(undefined);
    router.push("/");
  };

  const getUser = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setAuthToken(token);
    getUser();
  }, [getUser]);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        setUser,
        getUser,
        isAuthenticated,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
