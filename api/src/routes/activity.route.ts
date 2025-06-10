import { Router } from "express";
import { GetActivity } from "../controllers/activity/getActivities";
import { postActivity } from "../controllers/activity/postActivities";
import { putActivity } from "../controllers/activity/putActivities";
import { deleteActivity } from "../controllers/activity/deleteActivities";

export const activityRouter = Router()
.get("/me",GetActivity)
.post("/post",postActivity)
.put("/put",putActivity)
.delete("/delete",deleteActivity)