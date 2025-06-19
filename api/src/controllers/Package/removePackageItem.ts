import { RequestHandler } from "express";
import { packageModel } from "../../models/package.model";

export const removePackageItem: RequestHandler = async (req, res) => {
    const { packageId,packageItemId } = req.params;

  try {
    const updatedPackage = await packageModel.findByIdAndUpdate(
      packageId,
      {
        $pull: { packageItem: packageItemId },
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedPackage) {
        res.status(404).json({ message: "Package not found" });
        return;
    }

    res.status(200).json({ message: "Package item removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
