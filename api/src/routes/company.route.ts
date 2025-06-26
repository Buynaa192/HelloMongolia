import { Router } from "express";

import { getCompanyByID } from "../controllers/company/getCompanyById";
import { updateCompanyProfile } from "../controllers/company/updateCompanyById";
import { deleteCompanyProfile } from "../controllers/company/deleteCompanyById";
import { authenticationMiddleware } from "../middlewares/authentication-middleware";
import { createCompanyProfle } from "../controllers/company/ CreateCompanyProfile";

export const companyRouter = Router()
  .post("/", authenticationMiddleware, createCompanyProfle)
  .get("/", getCompanyByID)
  .put("/:companyId", updateCompanyProfile)
  .delete("/:companyId", deleteCompanyProfile);
