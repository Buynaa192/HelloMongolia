
import { destinationModel } from "../../models/destination.model";
import { packageModel } from "../../models/package.model";
import { packageItemModel } from "../../models/packageItem.model";
export const createPackageItemController = async (req, res) => {
  try {
    const {
        order,
         title,
         image,
         packageId,
         destinationId,
         description,
         activity,
         accomodation
        
    } = req.body;

    const activities = typeof activity === "string" ? [activity] : activity;

    const newPackageItem = await packageItemModel.create({
        order:Number(order),
        title,
        image,
        packageId,
        destinationId,
        description,
        activity:activities,
        accomodation,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await packageModel.findByIdAndUpdate(
        packageId
      ,
      { $push: { packageItem: newPackageItem._id }, updatedAt: new Date() }
    );
    return res.status(201).json({ message: "successfully created", package: newPackageItem });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error", error: error.message });
  }
};
