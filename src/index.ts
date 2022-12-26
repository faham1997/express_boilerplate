import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

import authRoute from "./routes/auth.routes.";
import hospitalRoute from "./routes/hospital.routes";

import { databaseConnection } from "./config/db";
databaseConnection();

app.use(express.json());

//Use Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/hospital", hospitalRoute);

app.get("/", (req: Request, res: Response) => {
  res.json("Server is running successfully!");
});

app.listen(PORT, console.log("Server started on port: " + PORT));
