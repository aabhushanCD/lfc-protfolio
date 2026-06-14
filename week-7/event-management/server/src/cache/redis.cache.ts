import redis from "../config/redis.ts";

export const setCache = async (key: string, value: any, ttl: number) => {
  await redis.set(key, JSON.stringify(value), "EX", ttl);
};

export const getCache = async (key: string) => {
  const value = await redis.get(key);
  return value ? JSON.parse(value) : null;
};

export const delCache = async (key: string): Promise<void> => {
  try {
    await redis.del(key);
  } catch (error) {
    console.error("Redis delCache error:", error);
  }
};
