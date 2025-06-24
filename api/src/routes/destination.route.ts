import { Router } from "express";
import { GetDestinations } from "../controllers/destination/allDestination";
import { CreateDestination } from "../controllers/destination/createDestination";
import { updateDestination } from "../controllers/destination/updateDestination";
import { deleteDestination } from "../controllers/destination/deleteDestination";
import { getDestinationsByCompanyId } from "../controllers/destination/getDestinationByCompanyId";

export const destination = Router()
  .get("/", GetDestinations)
  .post("/post", CreateDestination)
  .put("/put", updateDestination)
  .delete("/delete", deleteDestination)
  .get("/byCompanyId/:companyId", getDestinationsByCompanyId);
