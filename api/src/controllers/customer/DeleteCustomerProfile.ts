import { RequestHandler } from "express";
import { UserModel } from "../../models/UserSchema";

export const deleteCustomerProfile: RequestHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findOne({ _id: userId, role: "customer" });

    if (!user) {
      res.status(404).json({ message: "Customer not found" });
    }

    await UserModel.deleteOne({ _id: userId });

    res.status(200).json({ message: "Customer profile deleted successfully" });
  } catch (error) {
    console.error("Delete Customer Profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
