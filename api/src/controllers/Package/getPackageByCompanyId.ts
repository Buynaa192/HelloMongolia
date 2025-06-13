import { RequestHandler } from "express";
import { packageModel } from "../../models/package.model";

export const getPackageByCompanyId: RequestHandler = async (req, res) => {
  try {
    const { companyId } = req.params;
    if (!companyId) {
       res.status(400).json({ message: "CompanyId is required" });
       return
    }

    const packages = await packageModel
      .find({ companyId: companyId })
      .populate("companyId"); 

    if (packages.length===0) {
      res.status(404).json({ message: " package not found" });
      return;
    }

     res.status(200).json({ packages });
     return;
  } catch (error: any) {
    console.error("Error ", error);
    res.status(500).json({ message: "Server error", error: error.message });
    return
  }
};
