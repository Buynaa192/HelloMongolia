import express from "express";
import cors from "cors";
import { destination } from "./routes/destination.route";
import { config } from "dotenv";
import { connectToDatabase } from "./database/connect-to-db";
import { activityRouter } from "./routes/activity.route";
import { authRouter } from "./routes/auth.route";
import { packageRouter } from "./routes/package.route";
import { packageItemRouter } from "./routes/packageItem.route";
import { searchRouter } from "./routes/Search.route";
import { RegionsRouter } from "./routes/Region.route";
import { AccommodationRouter } from "./routes/Accomodation.route";
import { CompanyRouter } from "./routes/company.route";
import { GuideRouter } from "./routes/Guide.route";
import { CustomerRouter } from "./routes/Customer.route";

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
  .use("/company", CompanyRouter)
  .use("/guide", GuideRouter)
  .use("/user", CustomerRouter)
  .use("/auth", authRouter)
  .use("/package", packageRouter)
  .use("/packageItem", packageItemRouter)
  .use("/search", searchRouter)
  .use("/accommodations", AccommodationRouter)
  .use("/regions", RegionsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
