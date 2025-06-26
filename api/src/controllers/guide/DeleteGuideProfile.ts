import { RequestHandler } from "express";
import { UserModel } from "../../models/UserSchema";

export const deleteGuideProfile: RequestHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findOne({ _id: userId, role: "guide" });

    if (!user) {
      res.status(404).json({ message: "Guide not found" });
    }

    await UserModel.deleteOne({ _id: userId });

    res.status(200).json({ message: "Guide profile deleted successfully" });
  } catch (error) {
    console.error("Delete Guide Profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
