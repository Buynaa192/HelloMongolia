import { RequestHandler } from "express";
import { destinationModel } from "../../models/destination.model";

export const updateDestination: RequestHandler = async (req, res) => {
  try {
    const { id, ...rest } = req.body;

    const result = await destinationModel.updateOne(
      { _id: id },
      {
        $set: {
          ...rest,
        },
      }
    );

    if (result.matchedCount === 0) {
      res.status(404).json({ message: "not found" });
    }

    res.status(200).json({ message: "amjilttai" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "hud2", error });
  }
};
