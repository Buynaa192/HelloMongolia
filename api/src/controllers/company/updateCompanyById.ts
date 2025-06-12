import { RequestHandler } from "express";
import { companyProfileModel } from "../../models/companyProfile.model";

export const updateCompanyById: RequestHandler = async (req, res) => {
  const { companyId } = req.params;    
  const updateData = req.body;    

  try {
    const updatedCompany = await companyProfileModel.findByIdAndUpdate(
      companyId,
      updateData
    
    );

    if (!updatedCompany) {
       res.status(404).json({ message: "Company not found" });
       return;
    }

    res.status(200).json({
        message: "Company updated successfully",
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
