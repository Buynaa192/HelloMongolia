import { RequestHandler } from "express";
import { packageModel } from "../../models/package.model";

export const GetAllPackages: RequestHandler = async (req, res) => {
  try {
    const packages = await packageModel
      .find({})
      .populate({
        path: "packageItem",
        populate: [
          {
            path: "activity",
            model: "activity",
          },
          {
            path: "destinationId",
            model: "destination",
          },
        ],
      })
      .populate({
        path: "companyId",
        select: "name AvatarImage",
      });

    res.status(200).json({ packages });
  } catch (error) {
    console.error("Error fetching package:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
