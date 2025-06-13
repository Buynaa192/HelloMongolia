import { companyProfileModel } from "../../models/companyProfile.model";
import { packageModel } from "../../models/package.model";
export const createPackageController = async (req, res) => {
  try {
    const {
      companyId,
      coverPhoto,
      description,
      duration,
      availableFrom,
      availableUntil,
      cost,
      itinerary,
      tripType,
      rating,
    } = req.body;
      

    const newPackage = await packageModel.create({
      companyId,
      coverPhoto,
      description,
      duration,
      availableFrom: new Date(availableFrom),
      availableUntil: new Date(availableUntil),
      cost: Number(cost),
      itinerary, 
      tripType,
      rating: Number(rating),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await companyProfileModel.findByIdAndUpdate(
      companyId,
      { $push: { packages: newPackage._id }, updatedAt: new Date() }
    );
    return res.status(201).json({ message: "successfully created", package: newPackage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error", error: error.message });
  }
};
