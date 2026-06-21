import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../../config/minio.ts";

export const getImageUrl = async (objectKey: string) => {
  return await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: process.env.MINIO_BUCKET!,
      Key: objectKey,
    }),
    {
      expiresIn: 60,
    },
  );
};
