import { packageItemModel } from "../../models/packageItem.model";

export const getPackageItemById = async (req, res) => {
  try {
    const { packageItemId } = req.query;

    const packageItem = await packageItemModel.find(
      packageItemId ? { _id: packageItemId } : {}
    ).populate("destinationId");

    if (!packageItem) {
      return res.status(404).json({ message: "Package item not found" });
    }

    return res.status(200).json({ message: "success", packageItem });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};
