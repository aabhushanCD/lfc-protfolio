import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.ts";
import todoRoutes from "./modules/todo/todo.routes.ts";
import authRoute from "./modules/auth/auth.routes.ts";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoute);
// start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(8000, "0.0.0.0", () => {
      console.log("🚀 Server running on port 8000");
    });
  } catch (error) {
    console.error("❌ Failed to connect to DB:", error);
    process.exit(1);
  }
};

startServer();
