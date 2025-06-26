import mongoose, { model } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["company", "guide", "customer"],
      required: true,
    },
    companyDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyProfile",
    },
    guideDetails: { type: mongoose.Schema.Types.ObjectId, ref: "GuideProfile" },
    customerDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerProfile",
    },
  },
  { timestamps: true }
);

export const UserModel = model("User", UserSchema);
