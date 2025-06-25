import { Router } from "express";
import { getAccommodationByID } from "../controllers/accomodation/GetAccomodationByID";
import { createAccommodation } from "../controllers/accomodation/PostAccommodation";
import { updateAccommodation } from "../controllers/accomodation/UpdateAccomodation";
import { deleteAccommodation } from "../controllers/accomodation/DeleteAccomodation";
import { getAllAccommodations } from "../controllers/accomodation/GetAllAccomodations";

export const AccommodationRouter = Router()
  .get("/", getAllAccommodations)
  // .get("/:accommodationID", getAccommodationByID)
  .post("/post", createAccommodation)
  .put("/update", updateAccommodation)
  .delete("/delete", deleteAccommodation);
