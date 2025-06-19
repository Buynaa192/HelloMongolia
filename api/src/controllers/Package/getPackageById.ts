import { RequestHandler } from "express";
import { packageModel } from "../../models/package.model";

export const getPackageById: RequestHandler = async (req, res) => {
  const { packageId } = req.query;

  try {
    const packages = await packageModel
      .find(packageId ? { _id: packageId } : {})
      .populate({
        path: "packageItem",
        populate: [
          {
            path: "destinationId",
            model: "destination",
          },
        ],
      });

    res.status(200).json({ packages });
  } catch (error) {
    console.error("Error fetching package:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
