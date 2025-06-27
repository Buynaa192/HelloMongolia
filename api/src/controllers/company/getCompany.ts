import { RequestHandler } from "express";
import { UserModel } from "../../models/UserSchema";

export const getCompany: RequestHandler = async (req, res) => {
  const { userId } = req.query;

  try {
    if (userId) {
      const company = await UserModel.findOne({ _id: userId, role: "company" })
        .populate("companyDetails")
        .populate({
          path: "userId",
          select: "email",
        })
        .select("-password");

      if (!company) {
        res.status(404).json({ message: "Company not found" });
      }

      res.status(200).json({ company });
    } else {
      const companies = await UserModel.find({ role: "company" })
        .populate("companyDetails")
        .select("-password");

      res.status(200).json({ companies });
    }
  } catch (error) {
    console.error("Error fetching company/companies:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
