import { RequestHandler } from "express";
import { companyProfileModel } from "../../models/user.models.by.role/companyProfile.model";

export const getCompanyByID: RequestHandler = async (req, res) => {
  const { userId } = req.query;

  try {
    if (userId) {
      if (typeof userId !== "string") {
        res.status(400).json({ message: "Invalid userId" });
      }

      const company = await companyProfileModel
        .findOne({ userId })
        .populate("packages");

      if (!company) {
        res.status(404).json({ message: "Company not found" });
      }

      res.status(200).json({ company });
    }

    const companies = await companyProfileModel.find({}).populate("packages");

    res.status(200).json({ companies });
  } catch (error) {
    console.error("getCompanyByUserId error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
