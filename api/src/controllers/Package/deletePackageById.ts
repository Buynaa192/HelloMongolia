import { RequestHandler } from "express";
import { packageModel } from "../../models/package.model";
import { companyProfileModel } from "../../models/companyProfile.model";
export const deletePackageById: RequestHandler = async (req, res) => {
    const { packageId } = req.params;
  
    try {
      const deletedPackage = await packageModel.findByIdAndDelete(packageId);
  
      if (!deletedPackage) {
        res.status(404).json({ message: "Package not found" });
        return;
      }
      await companyProfileModel.updateOne(
        { packages: packageId },
        { $pull: { packages: packageId }, $set: { updatedAt: new Date() } }
      );
  
      res.status(200).json({ message: "Package deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };