import { RequestHandler } from "express";
import { UserModel } from "../../models/UserSchema";

export const getGuideById: RequestHandler = async (req, res) => {
  const { userID } = req.query;

  try {
    if (userID) {
      if (typeof userID !== "string") {
        res.status(400).json({ message: "Invalid userID" });
      }

      const guide = await UserModel.findOne({
        _id: userID,
        role: "guide",
      }).select("-password");

      if (!guide) {
        res.status(404).json({ message: "Guide not found" });
      }

      res.status(200).json({ guide });
    }

    const guides = await UserModel.find({ role: "guide" }).select("-password");
    res.status(200).json({ guides });
  } catch (error) {
    console.error("Error in getGuideById:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
