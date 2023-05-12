import * as dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getItem, itemExists, redisConnection, setItem } from "./cacheHandler";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
redisConnection();

const port = process.env.PORT || 3000;

app.get("/", (request: Request, response: Response) => {
  response.json({ message: "Hello, World" });
});

app.get("/users", async (request: Request, response: Response) => {
  console.time("Time");

  const key = "users-01";

  let users;

  const itemExist = await itemExists(key);

  if (itemExist) {
    console.log("Has cache");

    const rawUsers = await getItem(key) as string;

    users = JSON.parse(rawUsers);
  } else {
    console.log("Dont have cache");

    users = await prisma.user.findMany();

    setItem(key, JSON.stringify(users));
  }

  console.timeEnd("Time");

  response.json({ users });
});

app.listen(port, () =>
  console.log(`🚀 Server ready at: http://localhost:${port}`)
);
