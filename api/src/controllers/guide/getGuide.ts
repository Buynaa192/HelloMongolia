import { RequestHandler } from "express";
import { UserModel } from "../../models/UserSchema";

export const getGuide: RequestHandler = async (req, res) => {
  const { userId } = req.query;

  try {
    if (userId) {
      const guide = await UserModel.findOne({ _id: userId, role: "guide" })
        .populate("guideDetails")
        .populate({
          path: "userId",
          select: "email",
        })
        .select("-password");

      if (!guide) {
        res.status(404).json({ message: "Guide not found" });
      }

      res.status(200).json({ guide });
    } else {
      const guides = await UserModel.find({ role: "guide" })
        .populate("guideDetails")
        .select("-password");

      res.status(200).json({ guides });
    }
  } catch (error) {
    console.error("Error fetching guide(s):", error);
    res.status(500).json({ message: "Server error" });
  }
};
