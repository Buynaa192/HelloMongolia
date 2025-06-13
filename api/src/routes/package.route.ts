import { Router } from "express";
import { createPackageController } from "../controllers/Package/create-package";
import { getPackageByCompanyId } from "../controllers/Package/getPackageByCompanyId";
import { getPackageById } from "../controllers/Package/getPackageById";
import { updatePackageById } from "../controllers/Package/updatePackageById";
import { deletePackageById } from "../controllers/Package/deletePackageById";
export const packageRouter=Router()
.post("/", createPackageController)
.get("/:companyId",getPackageByCompanyId)
.get("/",getPackageById)
.put("/:packageId", updatePackageById)
.delete("/:packageId",deletePackageById);