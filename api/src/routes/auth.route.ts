import { Router } from "express";
import { authenticationMiddleware } from "../middlewares/authentication-middleware";
import { signIn } from "../controllers/auth/sign-in";
import { signUp } from "../controllers/auth/sign-up";
import { getMe } from "../controllers/auth/getMe";




export const authRouter = Router()
  .get("/me", authenticationMiddleware, getMe)
  .post("/signin", signIn)
  .post("/signup", signUp)
//   .put("/update", authenticationMiddleware, updateUser);