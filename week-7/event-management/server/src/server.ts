import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.ts";
import { authRoutes } from "./modules/auth/routes/auth.routes.ts";
import eventRoute from "./modules/event/routes/event.routes.ts";
import { Request, Response, NextFunction } from "express";
import { errorHandler } from "./shared/utils/errorHandler.ts";
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/event", eventRoute);
app.get("/health", () => {
  console.log("Server is Healthy");
});
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

Promise.resolve(
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on: ${PORT}`);
    });
  }),
).catch((error) => {
  console.log(error);
  process.exit(1);
});
