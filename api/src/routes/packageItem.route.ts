import { Router } from "express";
import { createPackageItemController } from "../controllers/PackageItem/createPackageItem";
import { deletePackageItemById } from "../controllers/PackageItem/deletePackageItemById";
import { updatePackageItemById } from "../controllers/PackageItem/updatePackageItemById";
import { getPackageItemById } from "../controllers/PackageItem/getPackageItemById";

export const packageItemRouter = Router()
  .post("/", createPackageItemController)
  .delete("/:packageItemId", deletePackageItemById)
  .put("/:packageItemId", updatePackageItemById)
  .get("/", getPackageItemById);
