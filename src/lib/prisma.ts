import { PrismaClient } from "@prisma/client";

const defaultDatabaseUrl = "file:./dev.db";
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = defaultDatabaseUrl;
}

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;

const globalForPrisma = globalThis as unknown as { prisma?: ExtendedPrismaClient };

function parseChecklist(checklist: string | null): Record<string, boolean> {
  if (!checklist) return {};
  try {
    const parsed = JSON.parse(checklist) as unknown;
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return {};
    }
    const result: Record<string, boolean> = {};
    for (const [key, raw] of Object.entries(parsed as Record<string, unknown>)) {
      result[key] = raw === true;
    }
    return result;
  } catch {
    return {};
  }
}

function parsePhotos(photos: string | null): unknown {
  if (!photos) return null;
  try {
    return JSON.parse(photos) as unknown;
  } catch {
    return null;
  }
}

function createPrismaClient() {
  const base = new PrismaClient({
    log: ["error", "warn"],
  });

  return base.$extends({
    result: {
      inspection: {
        checklist: {
          needs: { checklist: true },
          compute({ checklist }): Record<string, boolean> {
            return parseChecklist(checklist);
          },
        },
        photos: {
          needs: { photos: true },
          compute({ photos }): unknown {
            return parsePhotos(photos);
          },
        },
      },
    },
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
