import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { companyProfileModel } from "../../models/companyProfile.model";


export const signIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const company = await companyProfileModel.findOne({ email });

    if (!company) {
       res.status(404).json({ message: "Email is not registered" });
       return;
    }

    const isPasswordMatch = await bcrypt.compare(password, company.password);
    if (!isPasswordMatch) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    const { password: _, ...companyWithoutPassword } = company.toObject();

    const token = jwt.sign(
      { companyId: company._id },
      process.env.JWT_SECRET 
     
    );

    res.status(200).json({ user: companyWithoutPassword, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
