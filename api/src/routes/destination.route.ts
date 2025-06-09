import { Router } from "express";
import { GetDestinations } from "../controllers/destination/allDestination";

export const destination=Router()
.get("/me",GetDestinations)