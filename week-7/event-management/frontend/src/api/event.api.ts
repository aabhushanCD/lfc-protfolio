import type { UpdateEventType } from "../schema/event.schema";
import { axiosInstance } from "./client";

const create = async (data: FormData) => {
  console.log(data);
  const res = await axiosInstance.post("/event", data);
  return res.data.data;
};

const getAll = async () => {
  const res = await axiosInstance.get("/event");
  return res.data.data;
};

const getById = async (id: string) => {
  const res = await axiosInstance.get(`/event/${id}`);
  return res.data.data;
};

const update = async (id: string, data: UpdateEventType) => {
  const res = await axiosInstance.put(`/event/${id}`, data);
  return res.data.data;
};

const deletes = async (id: string) => {
  await axiosInstance.delete(`/event/${id}`);
};

const publishEvent = async (id: string) => {
  const res = await axiosInstance.patch(`/event/${id}/publish`);
  return res.data.data;
};

const bannerUpload = async (id: string, data: FormData) => {
  const res = await axiosInstance.post(`/event/${id}/banner`, data);
  return res.data.data;
};
const draft = async () => {
  const res = await axiosInstance.get(`/event/draft`);
  return res.data.data;
};
export const eventApi = {
  create,
  getAll,
  getById,
  update,
  deletes,
  publishEvent,
  bannerUpload,
  draft,
};
