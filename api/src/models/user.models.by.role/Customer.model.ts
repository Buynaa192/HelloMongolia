import mongoose, { Schema, model } from "mongoose";

const CustomerProfileSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  avatarImage: {
    type: String,
    default:
      "https://res.cloudinary.com/df60cobe2/image/upload/v1750926783/user_nu7gr4.png",
  },
  name: {
    type: String,
    required: true,
  },
  nationality: {
    type: Schema.Types.ObjectId,
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  travelExperience: {
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

export const customerProfileModel = model(
  "customerProfile",
  CustomerProfileSchema
);

export { CustomerProfileSchema };
