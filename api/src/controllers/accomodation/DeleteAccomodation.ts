import { RequestHandler } from "express";
import { accommodationModel } from "../../models/Accomodation.model";

export const deleteAccommodation: RequestHandler = async (req, res) => {
  try {
    const { id } = req.query;

    const deleted = await accommodationModel.findByIdAndDelete(id);
    if (!deleted) res.status(404).json({ message: "Accommodation not found" });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete", error });
  }
};
