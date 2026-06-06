import express from "express";
import cors from "cors";

import connectDB from "./config/db.ts";
import todoRoutes from "./modules/todo/todo.routes.ts";
import authRoute from "./modules/auth/auth.routes.ts";
const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoute);
Promise.resolve(
  connectDB().then(() => {
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  }),
).catch((error) => {
  console.error("Failed to connect to the database:", error);
  process.exit(1); // Exit the process with failure
});
