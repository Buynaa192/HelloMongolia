import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models/UserSchema";

export const createCompanyProfle: RequestHandler = async (req, res) => {
  const { email, password, companyDetails } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      email,
      password: hashedPassword,
      role: "company",
      companyDetails,
    });

    await newUser.save();

    const userObj = newUser.toObject();
    delete userObj.password;

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1d" }
    );

    res.status(201).json({ user: userObj, token });
  } catch (error) {
    console.error("Create Guide Profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
