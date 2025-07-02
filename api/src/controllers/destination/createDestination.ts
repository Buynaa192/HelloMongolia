import { RequestHandler } from "express";
import { destinationModel } from "../../models/destination.model";

export const CreateDestination: RequestHandler = async (req, res) => {
  try {
    const {
      destinationName,
      destinationImages,
      region,
      description,
      activities,
      location,
      weather,
    } = req.body;
    const newDestination = await destinationModel.create({
      destinationName,
      destinationImages,
      description,
      region,
      location,
      activities,
      weather,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(200).json(newDestination);
  } catch (error) {
    res.status(500).json(error);
  }
};
