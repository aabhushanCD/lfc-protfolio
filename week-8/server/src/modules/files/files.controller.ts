import { NextFunction, Request, Response } from "express";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

import { s3 } from "../../config/minio.ts";
import { FileModel } from "./file.model.ts";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface IFile {
  name: string;
  originalName: string;
  size: number;
}
export const uploadFile = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const objectKey = `${Date.now()}-${req.file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.MINIO_BUCKET!,
        Key: objectKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    const doc = await FileModel.create({
      originalName: file.originalname,
      objectKey,
      mimeType: file.mimetype,
      size: file.size,
    });
    res.json({ message: "File upload Successfully", doc });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const objectKey = req.params.objectKey;
    const doc = await FileModel.findOne({ objectKey });
    if (!doc) {
      return res.status(404).json({ message: "not found corresponding file" });
    }
    const url = await getSignedUrl(
      s3,
      new GetObjectCommand({
        Bucket: process.env.MINIO_BUCKET!,
        Key: doc.objectKey,
      }),
      { expiresIn: 60 },
    );
    return res.json({ url, originalName: doc.originalName });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
