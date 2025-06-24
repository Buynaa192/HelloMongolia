import { RequestHandler } from "express";
import { accommodationModel } from "../../models/Accomodation.model";

export const getAllAccommodations: RequestHandler = async (req, res) => {
  try {
    const accommodations = await accommodationModel.find();

    res.status(200).json({ accommodations });
  } catch (error) {
    console.error("Error fetching accommodation by ID:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
