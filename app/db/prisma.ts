// @ts-nocheck
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

const connectionString = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    datasourceUrl: connectionString,
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      datasourceUrl: connectionString,
    });
  }
  prisma = global.prisma;
}

export default prisma;
