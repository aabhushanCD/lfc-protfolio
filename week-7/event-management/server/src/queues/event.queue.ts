import { Queue } from "bullmq";

export const connection = { url: process.env.REDIS_URL ?? "localhost:6379" };
export const eventQueue = new Queue("event-jobs", { connection });
