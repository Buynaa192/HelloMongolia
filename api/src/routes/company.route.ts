import { Router } from "express";
import { getCompanyById } from "../controllers/company/getCompanyById";
import { updateCompanyById } from "../controllers/company/updateCompanyById";
import { deleteCompanyById } from "../controllers/company/deleteCompanyById";
export const companyRouter=Router()
.get("/", getCompanyById)
.put("/:companyId",updateCompanyById)
.delete("/:companyId",deleteCompanyById)