import { RequestHandler } from "express";
import { UserModel } from "../../models/UserSchema";

export const updateCustomerProfile: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  const updatedCustomerDetails = req.body.customerDetails;

  try {
    const user = await UserModel.findOne({ _id: userId, role: "customer" });
    if (!user) {
      res.status(404).json({ message: "Customer not found" });
    }

    user.guideDetails = {
      ...(user.customerDetails || {}),
      ...updatedCustomerDetails,
    };

    await user.save();

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({ user: userObj });
  } catch (error) {
    console.error("Update customer Profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
