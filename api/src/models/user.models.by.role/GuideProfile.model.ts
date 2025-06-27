import mongoose, { Schema, model } from "mongoose";

const GuideProfileSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  avatarImage: {
    type: String,
    default:
      "https://res.cloudinary.com/df60cobe2/image/upload/v1750928857/company_xlzzhn.jpg",
  },
  background: {
    type: String,
    default:
      "https://res.cloudinary.com/df60cobe2/image/upload/v1750929525/Screen_Shot_2025-06-26_at_5.18.20_PM_vdrnva.png",
  },
  status: {
    type: String,
    enum: ["Open for new bookings!", "Booked and busy on the run!"],
    required: true,
  },
  experienceYears: {
    type: Number,
    default: 0,
    required: true,
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
    type: [String],
    required: true,
    default: [],
  },
  experiencedDestinations: {
    type: [{ type: Schema.Types.ObjectId, ref: "destination" }],
    default: [],
  },
});

export const guideProfileModel = model("GuideProfile", GuideProfileSchema);
export { GuideProfileSchema };
