import { RequestHandler } from "express";
import { UserModel } from "../../models/UserSchema";
import { CompanyDetails } from "../auth/sign-up";
import { companyProfileModel } from "../../models/user.models.by.role/CompanyProfile.model";

export const updateCompanyProfile: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  const updateData: Partial<CompanyDetails> = req.body;

  try {
    const user = await UserModel.findOne({ _id: userId, role: "company" });

    if (!user || !user.companyDetails) {
      res.status(404).json({ message: "Company user or profile not found" });
    }

    const updatedProfile = await companyProfileModel.findByIdAndUpdate(
      user.companyDetails,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({ companyProfile: updatedProfile });
  } catch (error) {
    console.error("Error updating company profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
