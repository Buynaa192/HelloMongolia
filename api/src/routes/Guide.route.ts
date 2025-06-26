import { Router } from "express";

import { createGuideProfile } from "../controllers/guide/CreateGuideProfile";
import { getGuideById } from "../controllers/guide/GetGuideByID";
import { updateGuideProfile } from "../controllers/guide/UpdateGuideProfile";
import { deleteGuideProfile } from "../controllers/guide/DeleteGuideProfile";
import { authenticationMiddleware } from "../middlewares/authentication-middleware";
export const companyRouter = Router()
  .post("/createGuideProfile", authenticationMiddleware, createGuideProfile)
  .get("/", getGuideById)
  .put("/:userID", updateGuideProfile)
  .delete("/:userID", deleteGuideProfile);
