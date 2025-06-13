import { RequestHandler } from "express";
import { packageModel } from "../../models/package.model";
import { packageItemModel } from "../../models/packageItem.model";

export const addPackageItem: RequestHandler = async (req, res) => {
  const { packageId } = req.params;
  const { packageItemId } = req.body; 

  try {
    const addedPackageItem = await packageItemModel.findById(packageItemId);
    if (!addedPackageItem) {
     res.status(404).json({ message: "Package Item not found" });
     return 
    }

    await packageModel.findByIdAndUpdate(
      packageId,
      { $push: { packageItem: addedPackageItem._id }, updatedAt: new Date() }
    );

    res.status(200).json({ message: "PackageItem added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
