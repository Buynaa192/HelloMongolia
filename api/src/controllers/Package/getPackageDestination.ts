import { packageItemModel } from "../../models/packageItem.model";
import { packageModel } from "../../models/package.model";

export const getPackagesByDestinationId = async (req, res) => {
  try {
    const { destinationId } = req.params;

    const packageItems = await packageItemModel.find({ destinationId });

    const itemIds = packageItems.map((item) => item._id);

    const packages = await packageModel
      .find({ packageItem: { $in: itemIds } })
      .populate({
        path: "packageItem",
        populate: {
          path: "destinationId activity",
        },
      })
      .populate("companyId");

    return res.status(200).json({ packages });
  } catch (error) {
    console.error("Failed to get packages by destinationId:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
