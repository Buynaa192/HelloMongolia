import { model, Schema } from "mongoose";

const RegionSchema = new Schema({
  regionName: {
    type: String,
    enum: [
      "Northern-Mongolia",
      "Southern-Mongolia",
      "Eastern-Mongolia",
      "Western-Mongolia",
    ],
    required: true,
  },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  updatedAt: { type: Date, required: true },
  createdAt: { type: Date, required: true },
});

export const regionModel = model("region", RegionSchema);
