import mongoose, { Schema, model } from "mongoose";

const CustomerProfileSchema = new Schema({
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
  avatarImage: {
    type: String,
    default:
      "https://res.cloudinary.com/df60cobe2/image/upload/v1750926783/user_nu7gr4.png",
  },
  nationality: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  travelExperience: {
    type: Number,
    default: 0,
  },
});

export const customerProfileModel = model(
  "CustomerProfile",
  CustomerProfileSchema
);

export { CustomerProfileSchema };
