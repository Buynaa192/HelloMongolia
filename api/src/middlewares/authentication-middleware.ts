import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      companyId?: string;
    }
  }
}

export const authenticationMiddleware: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: "Unauthenticated" });
    return;
  }

  try {
    const { companyId, } = jwt.verify(token, process.env.JWT_SECRET) as {
      companyId: string;
    };

    req.companyId = companyId;
   
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};