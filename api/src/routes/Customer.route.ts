import { Router } from "express";

import { deleteGuideProfile } from "../controllers/guide/DeleteGuideProfile";
import { createCustomerProfile } from "../controllers/customer/CreateCustomerProfile";
import { getCustomerByID } from "../controllers/customer/GetCustomerProfileByID";
import { updateCustomerProfile } from "../controllers/customer/UpdateCustomerProfile";
import { authenticationMiddleware } from "../middlewares/authentication-middleware";
export const companyRouter = Router()
  .post("/createUserProfile", authenticationMiddleware, createCustomerProfile)
  .get("/", getCustomerByID)
  .put("/:userID", updateCustomerProfile)
  .delete("/:userID", deleteGuideProfile);
