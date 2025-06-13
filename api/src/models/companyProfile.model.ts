import { Schema, model } from "mongoose";

const companyProfileSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
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
    default: "",
  },
  AvatarImage: {
    type: String,
    default: "",
  },
  since: {
    type: String,
    default: "",
  },
  websiteURL: {
    type: String,
    default: "",
  },
  about: {
    type: String,
    default: "",
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
