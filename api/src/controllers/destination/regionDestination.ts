import { destinationModel } from "../../models/destination.model";
export const RegionDestination = async (req, res) => {
  try {
    const { region } = req.query;
    const filter = region ? { region } : {};
    const regionDestination = await destinationModel
      .find(filter)
      .populate("activities");

    res.status(200).json({ regionDestination });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "fail" });
  }
};
