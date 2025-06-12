import { RequestHandler } from "express";
import { companyProfileModel } from "../../models/companyProfile.model";

export const getMe: RequestHandler = async (req, res) => {
  try {
    const companyId = req.companyId;

    if (!companyId) {
       res.status(401).json({ message: "Unauthorized" });
       return;
    }

    const company = await companyProfileModel
      .findById(companyId)
      .select("-password");

    if (!company) {
      res.status(404).json({ message: "User not found" });
      return
    }

    res.status(200).json(company);
  } catch (error) {
    console.error( error);
    res.status(500).json({ message: "Server error", error });
  }
};
