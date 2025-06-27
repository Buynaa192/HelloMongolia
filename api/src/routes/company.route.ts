import { Router } from "express";

import { updateCompanyProfile } from "../controllers/company/updateCompany";
import { getCompany } from "../controllers/company/getCompany";

export const CompanyRouter = Router()
  .get("/", getCompany)
  .put("/:userId", updateCompanyProfile);
