import { Router } from "express";

import multer from "multer";
import { uploadFile } from "./files.controller.ts";

const router = Router();

const upload = multer({
  dest: "uploads/files",
});

router.post("/", upload.single("file"), uploadFile);

export default router;
