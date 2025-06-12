import { Router } from "express";
import { createPackageController, upload } from "../controllers/Package/create-package";

const router = Router();

router.post("/", upload.single("itinerary"), createPackageController);

export const packageRouter = router