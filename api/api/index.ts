import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { destination } from "../src/routes/destination.route";
import { activityRouter } from "../src/routes/activity.route";
import { companyRouter } from "../src/routes/company.route";
import { authRouter } from "../src/routes/auth.route";
import { packageRouter } from "../src/routes/package.route";
import { packageItemRouter } from "../src/routes/packageItem.route";
import { searchRouter } from "../src/routes/Search.route";
import { AccommodationRouter } from "../src/routes/Accomodation.route";
import { RegionsRouter } from "../src/routes/Region.route";
import { connectToDatabase } from "../src/database/connect-to-db";

config();
connectToDatabase();
const app = express();
const port = 3001;

app
  .use(cors())
  .use(express.json())
  .get("/", (_req, res) => {
    res.send("Health check");
  })
  .use("/destination", destination)
  .use("/activity", activityRouter)
  .use("/company", companyRouter)
  .use("/auth", authRouter)
  .use("/package", packageRouter)
  .use("/packageItem", packageItemRouter)
  .use("/search", searchRouter)
  .use("/accommodations", AccommodationRouter)
  .use("/regions", RegionsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
