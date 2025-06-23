import { Router } from "express";
import { GetRegions } from "../controllers/regions/Get4regions";
import { RegionDestination } from "../controllers/regions/GetRegionsWithDestinations";

export const RegionsRouter = Router()
  .get("/", GetRegions)
  .get("/destinations/:regionID", RegionDestination);
