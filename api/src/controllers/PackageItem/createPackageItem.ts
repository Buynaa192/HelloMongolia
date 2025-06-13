
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
         accomodation
        
    } = req.body;
   const newPackageItem = await packageItemModel.create({
        order:Number(order),
        title,
        image,
        destinationId,
        description,
        activity,
        accomodation,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
   
    return res.status(201).json({ message: "successfully created", package: newPackageItem });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error", error: error.message });
  }
};
