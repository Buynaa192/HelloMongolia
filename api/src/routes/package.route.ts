import { Router } from "express";
import { createPackageController } from "../controllers/Package/create-package";
import { getPackageByCompanyId } from "../controllers/Package/getPackageByCompanyId";
import { updatePackageById } from "../controllers/Package/updatePackageById";
import { deletePackageById } from "../controllers/Package/deletePackageById";
import { addPackageItem } from "../controllers/Package/addPackageItem";
import { getPackagesByDestinationId } from "../controllers/Package/getPackageDestination";
import { getPackageById } from "../controllers/Package/getPackageById";
import { removePackageItem } from "../controllers/Package/removePackageItem";
export const packageRouter = Router()
  .post("/", createPackageController)
  .get("/:companyId", getPackageByCompanyId)
  .get("/", getPackageById)
  .put("/:packageId", updatePackageById)
  .post("/addPackageItem/:packageId", addPackageItem)
  .delete("/:packageId", deletePackageById)
  .get("/destination/:destinationId", getPackagesByDestinationId)
  .delete("/:packageId/removeItem/:packageItemId", removePackageItem);
