import express from "express";
import cors from "cors"
import { destination } from "./routes/destination.route";
import { config } from "dotenv";
import { connectToDatabase } from "./database/connect-to-db";
import { activityRouter } from "./routes/activity.route";
import { authRouter } from "./routes/auth.route";
import {companyRouter } from "./routes/company.route";
import { packageRouter } from "./routes/package.route";
config()
connectToDatabase()
const app = express();
const port = 3001;

app.use(cors())
.use(express.json())
.use("/destination",destination)
.use("/activity", activityRouter)
.use("/company",companyRouter)
.use("/auth", authRouter)
.use("/package",packageRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})