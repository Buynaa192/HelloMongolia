import { RequestHandler } from "express";
import { companyProfileModel } from "../../models/user.models.by.role/CompanyProfile.model";
import { customerProfileModel } from "../../models/user.models.by.role/Customer.model";
import { guideProfileModel } from "../../models/user.models.by.role/GuideProfile.model";

export const getMe: RequestHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const role = req.role;

    if (!userId || !role) {
      res.status(401).json({ message: "Unauthorized" });
    }

    let userProfile;

    if (role === "company") {
      userProfile = await companyProfileModel
        .findOne({ userId })
        .select("-password");
    } else if (role === "guide") {
      userProfile = await guideProfileModel
        .findOne({ userId })
        .select("-password");
    } else if (role === "customer") {
      userProfile = await customerProfileModel
        .findOne({ userId })
        .select("-password");
    } else {
      res.status(400).json({ message: "Invalid user role" });
    }

    if (!userProfile) {
      res.status(404).json({ message: "User profile not found" });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.error("getMe error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
