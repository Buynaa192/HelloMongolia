import { Router } from "express";
import { createPackageItemController } from "../controllers/packageItem/createPackageItem";
import { deletePackageItemById } from "../controllers/packageItem/deletePackageItemById";
import { updatePackageItemById } from "../controllers/packageItem/updatePackageItemById";
import { getPackageItemById } from "../controllers/packageItem/getPackageItemById";

export const packageItemRouter = Router()
  .post("/", createPackageItemController)
  .delete("/:packageItemId", deletePackageItemById)
  .put("/:packageItemId", updatePackageItemById)
  .get("/", getPackageItemById);
