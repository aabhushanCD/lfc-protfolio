import express from "express";
import { logger } from "../middleware/logger.js";
import { meetings } from "../data.js";

const router = express.Router();

router.get("/meetings", logger, (req, res) => {
  try {
    res.status(200).json({ message: "All Meetings", data: meetings });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/meetings", logger, (req, res) => {
  try {
    const { id, title, host, date } = req.body;

    if (!id || !title || !host || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newData = { id, title, host, date };
    if (meetings.some((m) => m.id === id)) {
      return res
        .status(400)
        .json({ message: "Meeting with this ID already exists" });
    }

    meetings.push(newData);

    res.status(201).json({ message: "Meeting created", data: newData });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
