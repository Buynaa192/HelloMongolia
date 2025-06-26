import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models/UserSchema";
import { Schema } from "mongoose";

interface CompanyDetails {
  userId: Schema.Types.ObjectId;
  phoneNumber?: string;
  name?: string;
  background?: string;
  AvatarImage?: string;
  since: number;
  websiteURL?: string;
  about: string;
  packages?: Schema.Types.ObjectId[];
  availableDestinations?: Schema.Types.ObjectId[];
  reviews?: number;
  Rating?: number;
  createdAt: Date;
  updatedAt: Date;
}
type GuideStatus = "Open for new bookings!" | "Booked and busy on the run!";

interface GuideDetails {
  userId: Schema.Types.ObjectId;
  phoneNumber?: string;
  name: string;
  bio: string;
  avatarImage: string;
  status: GuideStatus;
  experience: number;
  instagramURL?: string;
  facebookURL?: string;
  spokenLanguages: Schema.Types.ObjectId[];
  experiencedDestinations?: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
interface CustomerDetails {
  userId: Schema.Types.ObjectId;
  avatarImage?: string;
  name: string;
  nationality?: Schema.Types.ObjectId;
  phoneNumber?: string;
  travelExperience?: number;
  createdAt: Date;
  updatedAt: Date;
}

type UserDetails = CompanyDetails | GuideDetails | CustomerDetails;

export type NewUserData = {
  email: string;
  password: string;
  role: "company" | "guide" | "customer";
  userDetails: UserDetails;
};

export const signUp: RequestHandler = async (req, res) => {
  const { email, password, role, userDetails } = req.body;

  if (!["company", "guide", "customer"].includes(role)) {
    res.status(400).json({ message: "Invalid role" });
  }

  if (!userDetails) {
    res.status(400).json({ message: "User details are required" });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserData: NewUserData = {
      email,
      password: hashedPassword,
      role,
      userDetails,
    };

    const newUser = new UserModel(newUserData);
    await newUser.save();

    const userObj = newUser.toObject();
    delete userObj.password;

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1d" }
    );

    res.status(201).json({ user: userObj, token });
  } catch (error) {
    console.error("SignUp error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
