import { Worker } from "bullmq";
import fs from "node:fs/promises";
import path from "node:path";
import connectDb from "../config/db.ts";
import { logger } from "../shared/utils/logger.ts";
import { connection } from "../queues/event.queue.ts";

await connectDb();

const worker = new Worker(
  "event-jobs",
  async (job) => {
    try {
      if (job.name !== "notify-subscribers") return;
      logger.info(`Processing job: ${job.name}`);

      await fs.mkdir("exports", { recursive: true });

      await new Promise((resolve) => setTimeout(resolve, 5000));

      const filePath = path.join("exports", `events=${job.id}.json`);

      const output = {
        type: "NOTIFY_SUBSCRIBERS",
        eventId: job.data.eventId,
        title: job.data.title,
        processedAt: new Date().toISOString(),
      };
      await fs.writeFile(filePath, JSON.stringify(output, null, 2));

      logger.info(`Job completed for event ${job.data.eventId}`);
      return output;
    } catch (error) {
      console.log(error);
      console.log("Worker Error", error);
      throw error;
    }
  },
  { connection },
);

worker.on("completed", (job) => {
  logger.info(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error("Job failed");
  console.error("Job ID:", job?.id);
  console.error("Error:", err);
});
console.log("Event export worker listening...", connection);
