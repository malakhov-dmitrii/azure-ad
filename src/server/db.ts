import { PrismaClient } from "@prisma/client";

import { env } from "~/env.mjs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://big-treefrog-30197.upstash.io",
  token:
    "AXX1ACQgODYwOWM0MzEtMTA0My00NjVmLWFkZTQtZjczM2NmMjY0ZWU2ZGVkMmRlMzdmYTI4NGEyZTgyZjk3YWM3MGFlZWQ0Yzk=",
});
