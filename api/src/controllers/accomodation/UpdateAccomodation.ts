import { RequestHandler } from "express";
import { accommodationModel } from "../../models/Accomodation.model";

export const updateAccommodation: RequestHandler = async (req, res) => {
  try {
    const { id } = req.query;
    const { hotelName, address } = req.body;

    const updated = await accommodationModel.findByIdAndUpdate(
      id,
      {
        hotelName,
        address,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updated) res.status(404).json({ message: "Accommodation not found" });

    res.json({
      message: "Accommodation updated successfully",
      accommodation: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update", error });
  }
};
