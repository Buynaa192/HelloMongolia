import { RequestHandler } from "express";
import { accommodationModel } from "../../models/Accomodation.model";

export const createAccommodation: RequestHandler = async (req, res) => {
  try {
    const { hotelName, address } = req.body;

    const newAccommodation = new accommodationModel({
      hotelName,
      address,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const saved = await newAccommodation.save();
    res
      .status(201)
      .json({ message: "Accommodation created", accommodation: saved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create", error });
  }
};
