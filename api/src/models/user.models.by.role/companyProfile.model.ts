import mongoose, { Schema, model } from "mongoose";

const companyProfileSchema = new Schema({
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
    default: "",
  },
  background: {
    type: String,
    default:
      "https://res.cloudinary.com/df60cobe2/image/upload/v1750929525/Screen_Shot_2025-06-26_at_5.18.20_PM_vdrnva.png",
  },
  AvatarImage: {
    type: String,
    default:
      "https://res.cloudinary.com/df60cobe2/image/upload/v1750928857/company_xlzzhn.jpg",
  },
  since: {
    type: Number,
    default: 0,
    required: true,
  },
  websiteURL: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
    required: true,
  },
  packages: {
    type: [Schema.Types.ObjectId],
    ref: "package",
    default: [],
  },
  availableDestinations: {
    type: [Schema.Types.ObjectId],
    ref: "destination",
    default: [],
  },
  reviews: {
    type: Number,
    default: 0,
  },
  Rating: {
    type: Number,
    default: 0,
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

export const companyProfileModel = model(
  "companyProfile",
  companyProfileSchema
);

export { companyProfileSchema };
