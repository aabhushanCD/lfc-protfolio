import { Router } from "express";

import { getUrl, uploadFile } from "./files.controller.ts";
import { fileUpload } from "../../middleware/upload.middleware.ts";

const router = Router();

router.post("/", fileUpload.single("file"), uploadFile);
router.get("/", getUrl);
export default router;
