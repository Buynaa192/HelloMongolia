import { RequestHandler } from "express";
import { packageItemModel } from "../../models/packageItem.model";

export const updatePackageItemById: RequestHandler = async (req, res) => {
  const { packageItemId } = req.params;    
  const updateData = req.body;    

  try {
    const updatedPackageitem = await packageItemModel.findByIdAndUpdate(
      packageItemId,
      updateData
    
    );

    if (!updatedPackageitem) {
       res.status(404).json({ message: "packageItem not found" });
       return;
    }

    res.status(200).json({
        message: "PackageItem updated successfully",
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
