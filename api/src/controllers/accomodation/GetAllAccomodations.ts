import { RequestHandler } from "express";
import { accommodationModel } from "../../models/Accomodation.model";

export const getAccommodations: RequestHandler = async (req, res) => {
  try {
    const { accommodationID } = req.params;

    if (accommodationID) {
      const accommodation = await accommodationModel.findById(accommodationID);
      if (!accommodation) res.status(404).json({ message: "Not found" });
      res.json({ accommodation });
    }

    const accommodations = await accommodationModel.find();
    res.json({ accommodations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
