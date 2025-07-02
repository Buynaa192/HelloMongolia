import { destinationModel } from "../../models/destination.model";

export const RegionDestination = async (req, res) => {
  try {
    const { regionID } = req.params;

    const regionDestination = await destinationModel.find({ region: regionID }).populate("activities").populate("region");

    res.status(200).json({ regionDestination });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "fail" });
  }
};
