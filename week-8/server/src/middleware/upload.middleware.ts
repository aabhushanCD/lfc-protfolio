import multer from "multer";

export const fileUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [
      "image/png",
      "image/jpeg",
      "text/plain",
      "application/pdf",
    ];
    cb(null, allowed.includes(file.mimetype));
  },
});