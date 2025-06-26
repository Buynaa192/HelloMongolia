import { RequestHandler } from "express";
import { UserModel } from "../../models/UserSchema";

export const updateGuideProfile: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  const updatedGuideDetails = req.body.guideDetails;

  try {
    const user = await UserModel.findOne({ _id: userId, role: "guide" });
    if (!user) {
      res.status(404).json({ message: "Guide not found" });
    }

    user.guideDetails = {
      ...(user.guideDetails || {}),
      ...updatedGuideDetails,
    };

    await user.save();

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({ user: userObj });
  } catch (error) {
    console.error("Update Guide Profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
