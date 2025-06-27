import { Router } from "express";

import { getGuide } from "../controllers/guide/getGuide";
import { updateGuideProfile } from "../controllers/guide/updateGuide";
export const GuideRouter = Router()
  .get("/", getGuide)
  .put("/:userId", updateGuideProfile);
