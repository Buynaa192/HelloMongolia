import { RequestHandler } from "express";
import { CustomerDetails } from "../auth/sign-up";
import { customerProfileModel } from "../../models/user.models.by.role/Customer.model";
import { UserModel } from "../../models/UserSchema";

export const updateCustomerProfile: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  const updateData: Partial<CustomerDetails> = req.body;

  try {
    const user = await UserModel.findOne({ _id: userId, role: "customer" });

    if (!user || !user.customerDetails) {
      res.status(404).json({ message: "Customer user or profile not found" });
    }

    const updatedProfile = await customerProfileModel.findByIdAndUpdate(
      user.customerDetails,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({ customerProfile: updatedProfile });
  } catch (error) {
    console.error("Error updating customer profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
