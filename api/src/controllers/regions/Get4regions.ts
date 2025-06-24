import { regionModel } from "../../models/Region.Model";

export const GetRegions = async (req, res) => {
  try {
    const regionName = req.query.regionName as string;

    if (regionName) {
      const region = await regionModel.findOne({ regionName });

      if (!region) {
        return res.status(404).json({ message: "Region not found" });
      }

      return res.status(200).json({ region });
    }

    const regions = await regionModel.find();
    return res.status(200).json({ regions });
  } catch (error) {
    console.error("[GetRegions] Error:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch region(s)", error });
  }
};
