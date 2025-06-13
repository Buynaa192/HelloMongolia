import { Router } from "express";
import { createPackageController } from "../controllers/Package/create-package";
import { getPackageByCompanyId } from "../controllers/Package/getPackageByCompanyId";
import { getPackageById } from "../controllers/Package/getPackageById";
import { updatePackageById } from "../controllers/Package/updatePackageById";
import { deletePackageById } from "../controllers/Package/deletePackageById";
import { addPackageItem } from "../controllers/Package/addPackageItem";
export const packageRouter=Router()
.post("/", createPackageController)
.get("/:companyId",getPackageByCompanyId)
.get("/",getPackageById)
.put("/:packageId", updatePackageById)
.post("/addPackageItem/:packageId", addPackageItem)
.delete("/:packageId",deletePackageById);