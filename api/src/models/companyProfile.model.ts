import { Schema, model } from "mongoose";

const companyProfile = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
  AvatarImage: {
    type: String,
    required: true,
  },
  since: {
    type: String,
    required: true,
  },
  websiteURL: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  packages: [{
    type: Schema.Types.ObjectId,
    ref: "package",
    required: true,
  }],
  availableDestinations: [{
    type: Schema.Types.ObjectId,
    ref: "destination",
    required: true,
  }],
  reviews: {
    type: Number,
    required: true,
  },
  Rating: {
    type: Number,
    required: true,
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

export const companyProfileModel = model("companyProfile", companyProfile);
