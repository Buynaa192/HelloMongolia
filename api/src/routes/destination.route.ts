import { Router } from "express";
import { GetDestinations } from "../controllers/destination/allDestination";
import { CreateDestination } from "../controllers/destination/createDestination";
import { updateDestination } from "../controllers/destination/updateDestination";
import { deleteDestination } from "../controllers/destination/deleteDestination";

export const destination=Router()
.get("/",GetDestinations)
.post("/post",CreateDestination)
.put("/put",updateDestination)
.delete("/delete",deleteDestination)