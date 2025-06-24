import { Router } from "express";
import { getAccommodations } from "../controllers/accomodation/GetAllAccomodations";
import { createAccommodation } from "../controllers/accomodation/PostAccommodation";
import { updateAccommodation } from "../controllers/accomodation/UpdateAccomodation";
import { deleteAccommodation } from "../controllers/accomodation/DeleteAccomodation";

export const AccommodationRouter = Router()
  .get("/:accommodationID", getAccommodations)
  .post("/postAccommodation", createAccommodation)
  .put("/updateAccommodation", updateAccommodation)
  .delete("/deleteAccommodation", deleteAccommodation);
