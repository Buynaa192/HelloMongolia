import { packageModel } from "../../models/package.model";
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const createPackageController = async (req, res) => {
  try {
    const {
      owner,
      coverPhoto,
      description,
      packageItem,
      duration,
      availableFrom,
      availableUntil,
      cost,
      tripType,
      rating,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "insert itinerary file" });
    }

    const packageItems = typeof packageItem === "string" ? [packageItem] : packageItem;

    const newPackage = await packageModel.create({
      owner,
      coverPhoto,
      description,
      packageItem: packageItems,
      duration,
      availableFrom:new Date(availableFrom),
      availableUntil:new Date(availableUntil),
      cost:Number(cost),
      itinerary: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      tripType,
      rating:Number(rating),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.status(201).json({ message: "successfully created", package: newPackage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error", error: error.message });
  }
};
