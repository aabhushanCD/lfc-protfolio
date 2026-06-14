import { Redis, RedisOptions } from "ioredis";

export const redis = new Redis({
  host: process.env.REDIS_HOST ?? "localhost",
  port: parseInt(process.env.REDIS_PORT ?? "6379"),
} as RedisOptions);

redis.on("error", (err) => {
  console.log("Redis error:", err);
});

redis.on("connect", () => {
  console.log("Redis Connected");
});

export default redis;
