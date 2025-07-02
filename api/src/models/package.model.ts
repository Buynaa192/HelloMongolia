import { Schema, model } from "mongoose";
const packageSchema = new Schema({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "companyProfile",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  coverPhoto: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  packageItem: [
    {
      type: Schema.Types.ObjectId,
      ref: "packageItem",
      required: true,
    },
  ],
  duration: {
    type: String,
    required: true,
  },
  availableFrom: {
    type: Date,
    required: true,
  },
  availableUntil: {
    type: Date,
    required: true,
  },
  cost: {
    type: Number,
    default: 0,
  },
  tripType: {
    type: String,
    enum: [
      "Scenery",
      "Adventure",
      "Cultural",
      "Historical",
      "Family",
      "Scientific",
      "Festival & Events",
      "Off-road",
    ],
    default: "Adventure",
  },
  rating: {
    type: Number,
    required: false,
    default: 0,
    min: 0,
    max: 5,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});
export const packageModel = model("package", packageSchema);
