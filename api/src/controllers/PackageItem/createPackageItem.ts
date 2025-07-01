import { packageItemModel } from "../../models/packageItem.model";

export const createPackageItemController = async (req, res) => {
  try {
    const {
      order,
      title,
      image,
      destinationId,
      description,
      activity,
      accommodation,
    } = req.body;

    // Create new packageItem
    const newPackageItem = await packageItemModel.create({
      order: Number(order),
      title,
      image,
      destinationId,
      description,
      activity,
      accommodation,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const populatedPackageItem = await packageItemModel
      .findById(newPackageItem._id)
      .populate("destinationId")
      .populate("accommodation")
      .populate("activity");

    return res.status(201).json({
      message: "successfully created",
      package: populatedPackageItem,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};
