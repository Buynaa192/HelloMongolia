import { model, Schema } from "mongoose";

const destinationSchema = new Schema({
  destinationName: { type: String, required: true },
  destinationImages: [{ type: String, required: true }],
  region: {
    type: Schema.Types.ObjectId,
    ref: "region",
    required: true,
  },
  description: { type: String, required: true },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
  activities: { type: [Schema.Types.ObjectId], ref: "activity" },
  weather: [
    {
      season: {
        type: String,
        enum: ["Spring", "Summer", "Autumn", "Winter"],
        required: true,
      },
      averageTempF: { type: Number, required: true },
    },
  ],
  updatedAt: { type: Date, required: true },
  createdAt: { type: Date, required: true },
});
export const destinationModel = model("destination", destinationSchema);
