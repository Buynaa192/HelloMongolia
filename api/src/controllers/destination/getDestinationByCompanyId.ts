import { Request, RequestHandler, Response } from "express";
import { packageModel } from "../../models/package.model";
import { packageItemModel } from "../../models/packageItem.model";
import { destinationModel } from "../../models/destination.model";

export const getDestinationsByCompanyId: RequestHandler = async (req, res) => {
  try {
    const { companyId } = req.params;
    const packages = await packageModel.find({ companyId });

    const allPackageItemIds = packages.flatMap((pkg) => pkg.packageItem);
    const packageItems = await packageItemModel.find({
      _id: { $in: allPackageItemIds },
    });

    const destinationIds = packageItems.map((item) =>
      item.destinationId.toString()
    );
    const uniqueDestinationIds = [...new Set(destinationIds)];
    const destinations = await destinationModel.find({
      _id: { $in: uniqueDestinationIds },
    });

    res.status(200).json({ destinations });
  } catch (error) {
    console.error("Failed to get destinations by companyId:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
