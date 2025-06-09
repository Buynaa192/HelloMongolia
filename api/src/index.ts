import express from "express";
import cors from "cors"
import { destination } from "./routes/destination.route";
import { config } from "dotenv";
import { connectToDatabase } from "./database/connect-to-db";
config()
connectToDatabase()
const app = express();
const port = 3001;

app.use(cors())
.use(express.json())
.use("/destination",destination)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})