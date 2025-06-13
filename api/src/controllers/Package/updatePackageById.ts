import { RequestHandler } from "express";
import { packageModel } from "../../models/package.model";

export const updatePackageById: RequestHandler = async (req, res) => {
  const { packageId } = req.params;    
  const updateData = req.body;    

  try {
    const updatedPackage = await packageModel.findByIdAndUpdate(
      packageId,
      updateData
    
    );

    if (!updatedPackage) {
       res.status(404).json({ message: "package not found" });
       return;
    }

    res.status(200).json({
        message: "Package updated successfully",
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
