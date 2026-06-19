import express, { Application } from "express";
import fileRouter from "../src/modules/files/file.routes.ts";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.ts";
const app: Application = express();

const PORT = process.env.PORT || 8000;
app.get("/health", () => {
  console.log("Server is healthy");
});
app.use("/file", fileRouter);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}` || 8000);
});
