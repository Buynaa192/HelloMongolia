import { RequestHandler } from "express";
import { packageModel } from "../../models/package.model";

export const GetTopRatedPackages: RequestHandler = async (req, res) => {
  try {
    const packages = await packageModel
      .find({ rating: 5 })
      .populate({
        path: "packageItem",
        populate: [
          {
            path: "destinationId",
            model: "destination",
          },
          {
            path: "activity",
            model: "activity",
          },
        ],
      })
      .populate("companyId");

    res.status(200).json({ packages });
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
