import { RequestHandler } from "express";
import { UserModel } from "../../models/UserSchema";

export const getCustomerByID: RequestHandler = async (req, res) => {
  const { userID } = req.query;

  if (!userID || typeof userID !== "string") {
    res.status(400).json({ message: "Invalid or missing userID" });
  }

  try {
    const customer = await UserModel.findOne({
      _id: userID,
      role: "customer",
    }).select("-password");

    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ customer });
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
