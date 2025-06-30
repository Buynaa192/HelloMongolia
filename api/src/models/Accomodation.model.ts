import { model, Schema } from "mongoose";

const AccommodationSchema = new Schema({
  hotelName: { type: String, required: true },
  address: { type: String, required: true },
  updatedAt: { type: Date, required: true },
  createdAt: { type: Date, required: true },
});

export const accommodationModel = model("accommodation", AccommodationSchema);
