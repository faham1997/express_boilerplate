import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

import exampleRoute from "./routes/example.routes";
import authRoute from "./routes/auth.routes.";

const db = require("./config/db");
db();

app.use(express.json());

//Use Routes
app.use("/api/v1/example", exampleRoute);
app.use("/api/v1/auth", authRoute);

app.get("/", (req: Request, res: Response) => {
  res.json("Server is running successfully!");
});

app.listen(PORT, console.log("Server started on port: " + PORT));
