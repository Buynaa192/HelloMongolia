import { RequestHandler } from "express";
import { guideProfileModel } from "../../models/user.models.by.role/GuideProfile.model";
import { UserModel } from "../../models/UserSchema";
import { GuideDetails } from "../auth/sign-up";

export const updateGuideProfile: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  const updateData: Partial<GuideDetails> = req.body;

  try {
    const user = await UserModel.findOne({ _id: userId, role: "guide" });

    if (!user || !user.guideDetails) {
      res.status(404).json({ message: "Guide user or profile not found" });
    }

    const updatedProfile = await guideProfileModel.findByIdAndUpdate(
      user.guideDetails,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({ guideProfile: updatedProfile });
  } catch (error) {
    console.error("Error updating guide profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
