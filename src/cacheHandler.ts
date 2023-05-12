import { createClient } from "redis";

const client = createClient({
  password: process.env.REDIS_PASSWORD as string
});

client.on("connect", function () {
  console.log("Connected!");
});

client.on("error", (error) => console.log("Redis Client Error", error));

export const redisConnection = async () => await client.connect();

export const redisDisconnection =async  () => await client.disconnect();

export const setItem = async (key: string, value: string) => await client.set(key, value);

export const getItem = async (key: string) => await client.get(key);

export const itemExists = async (key: string) =>  await client.exists(key)