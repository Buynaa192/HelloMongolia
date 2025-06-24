import { RequestHandler } from "express";
import { accommodationModel } from "../../models/Accomodation.model";

export const getAccommodationByID: RequestHandler = async (req, res) => {
  try {
    const { accommodationID } = req.params;

    const accommodation = await accommodationModel.findById(accommodationID);

    if (!accommodation) {
      res.status(404).json({ message: "Accommodation not found" });
    }

    res.status(200).json({ accommodation });
  } catch (error) {
    console.error("Error fetching accommodation by ID:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
