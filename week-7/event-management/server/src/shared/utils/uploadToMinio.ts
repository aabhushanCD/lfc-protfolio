import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../../config/minio.ts";

export const uploadToMinio = async (file: any) => {
  const objectKey = `${Date.now()}-${file.originalname}`;
  try {
    const data = await s3.send(
      new PutObjectCommand({
        Bucket: process.env.MINIO_BUCKET!,
        Key: objectKey,
        Body: file.buffer,
        ContentType: file.mimitype,
      }),
    );

    if (data) return objectKey;
  } catch (error) {
    console.error(error.message);
    throw new Error("Faile to upload in minio S3 bucket");
  }
};
