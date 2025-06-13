import { RequestHandler } from "express";
import { companyProfileModel } from "../../models/companyProfile.model";
export const deleteCompanyById: RequestHandler = async (req, res) => {
    const { companyId } = req.params;
  
    try {
      const deletedCompany = await companyProfileModel.findByIdAndDelete(companyId);
  
      if (!deletedCompany) {
        res.status(404).json({ message: "Company not found" });
        return;
      }
  
      res.status(200).json({ message: "Company deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };