import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { packageItemRouter } from "../src/routes/packageItem.route";
import { packageRouter } from "../src/routes/package.route";
import { authRouter } from "../src/routes/auth.route";
import { companyRouter } from "../src/routes/company.route";
import { activityRouter } from "../src/routes/activity.route";
import { destination } from "../src/routes/destination.route";
import { connectToDatabase } from "../src/database/connect-to-db";

config();
connectToDatabase();
const app = express();
const port = 3001;

app
  .use(cors())
  .use(express.json())
  .use("/destination", destination)
  .use("/activity", activityRouter)
  .use("/company", companyRouter)
  .use("/auth", authRouter)
  .use("/package", packageRouter)
  .use("/packageItem", packageItemRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
