import axios from "axios";
import { axiosInstance } from "./client";

export const getUploadUrl = async (id: string, contentType: string) => {
  const res = await axiosInstance.post(`event/${id}/venue-image/upload-url`, {
    contentType,
  });
  return res.data;
};

export const minioUpload = async (uploadUrl: string, file: File) => {
  const res = await axios.put(uploadUrl, file);
  return res.data;
};

export const minioConfirm = async (id: string, objectKey: string) => {
  const res = await axiosInstance.patch(`event/${id}/venue-image`, {
    objectKey,
  });
  return res.data;
};
