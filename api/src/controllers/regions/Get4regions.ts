import { regionModel } from "../../models/Region.Model";

export const GetRegions = async (req, res) => {
  try {
    const { regionID } = req.query;

    const regions = regionID
      ? await regionModel.findById(regionID)
      : await regionModel.find();

    if (regionID && !regions) {
      return res.status(404).json({ message: "Region not found" });
    }

    res.status(200).json({ regions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch region(s)", error });
  }
};
