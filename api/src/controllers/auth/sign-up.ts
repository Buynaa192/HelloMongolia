import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { companyProfileModel } from "../../models/companyProfile.model";


export const signUp: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingCompany = await companyProfileModel.findOne({ email });
    if (existingCompany) {
      res.status(400).json({ message: "Email is already registered" })
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompany = await companyProfileModel.create({
      ...req.body,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const { password: _, ...companyWithoutPassword } = newCompany.toObject();

    const token = jwt.sign(
      { companyId: newCompany._id },
      process.env.JWT_SECRET
    );

    res.status(200).json({ user: companyWithoutPassword, token });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error", error });
  }
};
