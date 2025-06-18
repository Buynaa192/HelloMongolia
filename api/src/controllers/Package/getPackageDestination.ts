import { Request, Response } from "express";
import { packageItemModel } from "../../models/packageItem.model";
import { packageModel } from "../../models/package.model";

export const getPackagesByDestinationId = async (req, res) => {
  try {
    const { destinationId } = req.params;

    // packageItem collection-аас тухайн destinationId-тай packageItem-уудыг олно
    const packageItems = await packageItemModel.find({ destinationId });

    // packageItem-уудын ID-г цуглуулах
    const itemIds = packageItems.map((item) => item._id);

    // Эдгээр packageItem-уудыг ашигласан бүх package-уудыг олох
    const packages = await packageModel
      .find({ packageItem: { $in: itemIds } })
      .populate({
        path: "packageItem",
        populate: {
          path: "destinationId activity", // дотроос destination болон activity-г populate хийнэ
        },
      })
      .populate("companyId");

    return res.status(200).json({ packages });
  } catch (error) {
    console.error("Failed to get packages by destinationId:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
