import { model, Schema } from "mongoose";
const destinationSchema = new Schema({
  destinationName: { type: String, required: true },
  destinationImages: { type: String, required: true },
  region: {
    type: String,
    enum: [
      "Southern-Mongolia",
      "Northern-Mongolia",
      "Eastern-Mongolia",
      "Western-Mongolia",
    ],
    required: true,
  },
  description: { type: String, required: true },
  activities: { type: [Schema.Types.ObjectId], ref: "activity" },
  updatedAt: { type: Date, required: true },
  createdAt: { type: Date, required: true },
});
export const destinationModel = model("destination", destinationSchema);
