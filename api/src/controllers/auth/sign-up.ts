import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models/UserSchema";
import { Schema } from "mongoose";
import { companyProfileModel } from "../../models/user.models.by.role/CompanyProfile.model";
import { guideProfileModel } from "../../models/user.models.by.role/GuideProfile.model";
import { customerProfileModel } from "../../models/user.models.by.role/Customer.model";

export interface CompanyDetails {
  userId: Schema.Types.ObjectId;
  phoneNumber: string;
  companyName: string;
  since: number;
  websiteURL?: string;
  about: string;
  createdAt: Date;
  updatedAt: Date;
}
type GuideStatus = "Open for new bookings!" | "Booked and busy on the run!";

export interface GuideDetails {
  userId: Schema.Types.ObjectId;
  name: string;
  status: GuideStatus;
  experience?: number;
  spokenLanguages: string[];
  createdAt: Date;
  updatedAt: Date;
}
export interface CustomerDetails {
  userId: Schema.Types.ObjectId;
  name: string;
  nationality?: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

type NewUserData =
  | {
      email: string;
      password: string;
      role: "company";
      userDetails: CompanyDetails;
      createdAt: Date;
      updatedAt: Date;
    }
  | {
      email: string;
      password: string;
      role: "guide";
      userDetails: GuideDetails;
      createdAt: Date;
      updatedAt: Date;
    }
  | {
      email: string;
      password: string;
      role: "customer";
      userDetails: CustomerDetails;
      createdAt: Date;
      updatedAt: Date;
    };

export const signUp: RequestHandler = async (req, res) => {
  const { email, password, role, userDetails } = req.body as NewUserData;

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

    const newUser = new UserModel({
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await newUser.save();

    let profile;

    if (role === "company") {
      profile = await companyProfileModel.create({
        ...userDetails,
        userId: newUser._id,
      });
      newUser.companyDetails = profile._id;
    } else if (role === "guide") {
      profile = await guideProfileModel.create({
        ...userDetails,
        userId: newUser._id,
      });
      newUser.guideDetails = profile._id;
    } else if (role === "customer") {
      profile = await customerProfileModel.create({
        ...userDetails,
        userId: newUser._id,
      });
      newUser.customerDetails = profile._id;
    }

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
