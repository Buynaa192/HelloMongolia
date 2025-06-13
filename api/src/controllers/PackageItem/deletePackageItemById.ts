import { RequestHandler } from "express";
import { packageItemModel } from "../../models/packageItem.model";
import { packageModel } from "../../models/package.model";
export const deletePackageItemById: RequestHandler = async (req, res) => {
    const { packageItemId } = req.params;
  
    try {
      const deletedPackageItem = await packageItemModel.findByIdAndDelete(packageItemId);
  
      if (!deletedPackageItem) {
        res.status(404).json({ message: "PackageItem not found" });
        return;
      }
      await packageModel.updateOne(
        { _id: deletedPackageItem.packageId },
        {
          $pull: { packageItem: deletedPackageItem._id },
          $set: { updatedAt: new Date() },
        }
      );
  
      res.status(200).json({ message: "Package deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };