import { Router } from "express";

import { GetAllPackages } from "../controllers/Package/GetAllPackages";
import { createPackageController } from "../controllers/Package/create-package";
import { getPackageById } from "../controllers/Package/getPackageById";
import { GetTopRatedPackages } from "../controllers/Package/GetTopRatedPackages";
import { getPackageByCompanyId } from "../controllers/Package/getPackageByCompanyId";
import { updatePackageById } from "../controllers/Package/updatePackageById";
import { addPackageItem } from "../controllers/Package/addPackageItem";
import { deletePackageById } from "../controllers/Package/deletePackageById";
import { getPackagesByDestinationId } from "../controllers/Package/getPackageDestination";
import { removePackageItem } from "../controllers/Package/removePackageItem";

export const packageRouter = Router()
  .post("/", createPackageController)
  .get("/", GetAllPackages)
  .get("/", getPackageById)
  .get("/topRatedPackages", GetTopRatedPackages)
  .get("/:companyId", getPackageByCompanyId)
  .put("/:packageId", updatePackageById)
  .post("/addPackageItem/:packageId", addPackageItem)
  .delete("/:packageId", deletePackageById)
  .get("/destination/:destinationId", getPackagesByDestinationId)
  .delete("/:packageId/removeItem/:packageItemId", removePackageItem);
