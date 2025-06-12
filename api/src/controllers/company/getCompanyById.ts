import { RequestHandler } from "express";
import { companyProfileModel } from "../../models/companyProfile.model";


export const getCompanyById: RequestHandler = async (req, res) => {
    const { companyId } = req.query;
  
    try {
      const companies = await companyProfileModel.find(
        companyId ? { _id: companyId } : {}
      );
  
      res.status(200).json({ companies });
    } catch (error) {
      res.status(500).json({ message: "server error", error });
    }
  };