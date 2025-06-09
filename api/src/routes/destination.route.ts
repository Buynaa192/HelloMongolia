import { Router } from "express";
import { GetDestinations } from "../controllers/destination/allDestination";
import { CreateDestination } from "../controllers/destination/createDestination";
import { deleteDestination } from "../controllers/destination/deleteDestination";
import { updateDestination } from "../controllers/destination/updateDestination";

export const destination=Router()
.get("/me",GetDestinations)
.post("/post",CreateDestination)
.delete("/delete",deleteDestination)
.put("/put",updateDestination)
