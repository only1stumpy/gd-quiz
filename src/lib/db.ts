import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());
export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
