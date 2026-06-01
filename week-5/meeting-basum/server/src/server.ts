// src/server.ts
import express, { Response, Request } from "express";

import meetingRouter from "./routes/meeting.js";

const app = express();
app.use(express.json());

app.get("/health", (_req: Request, res: Response) =>
  res.json({ status: "ok" }),
);

app.use("/api", meetingRouter);

app.listen(3000, () => console.log("listening on http://localhost:3000"));
