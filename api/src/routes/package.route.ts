import { Router } from "express";

import { createPackageController } from "../controllers/package/create-package";
import { getPackageByCompanyId } from "../controllers/package/getPackageByCompanyId";
import { updatePackageById } from "../controllers/package/updatePackageById";
import { deletePackageById } from "../controllers/package/deletePackageById";
import { addPackageItem } from "../controllers/package/addPackageItem";
import { getPackagesByDestinationId } from "../controllers/package/getPackageDestination";
import { getPackageById } from "../controllers/package/getPackageById";
import { GetTopRatedPackages } from "../controllers/package/GetTopRatedPackages";
import { removePackageItem } from "../controllers/package/removePackageItem";
export const packageRouter = Router()
  .post("/", createPackageController)
  .get("/", getPackageById)
  .get("/topRatedPackages", GetTopRatedPackages)
  .get("/:companyId", getPackageByCompanyId)
  .put("/:packageId", updatePackageById)
  .post("/addPackageItem/:packageId", addPackageItem)
  .delete("/:packageId", deletePackageById)
  .get("/destination/:destinationId", getPackagesByDestinationId)
  .delete("/:packageId/removeItem/:packageItemId", removePackageItem);
