import mongoose, { Schema, model } from "mongoose";

const GuideProfileSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  avatarImage: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Open for new bookings!", "Booked and busy on the run!"],
    required: true,
  },
  experience: {
    type: Number,
    required: true,
    default: 0,
  },
  instagramURL: {
    type: String,
    default: "",
  },
  facebookURL: {
    type: String,
    default: "",
  },
  spokenLanguages: {
    type: [Schema.Types.ObjectId],
    required: true,
    default: [],
  },
  experiencedDestinations: {
    type: [{ type: Schema.Types.ObjectId, ref: "destination" }],
    default: [],
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

export const guideProfileModel = model("GuideProfile", GuideProfileSchema);
export { GuideProfileSchema };
