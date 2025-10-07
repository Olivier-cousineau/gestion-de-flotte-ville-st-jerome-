import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function normalizeChecklist(value: unknown): Record<string, boolean> | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }

  const entries = Object.entries(value).map(([key, raw]) => [key, raw === true]);
  return Object.fromEntries(entries);
}

function isJsonSerializable(value: unknown): value is object | unknown[] | string | number | boolean | null {
  if (value === null) return true;
  if (Array.isArray(value)) return value.every(isJsonSerializable);
  if (typeof value === "object") {
    return Object.values(value).every(isJsonSerializable);
  }
  return ["string", "number", "boolean"].includes(typeof value);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { assetId, status, checklist, meterValue, createdBy, photos } = data;
  const assetIdNumber = typeof assetId === "number" ? assetId : Number(assetId);

  const normalizedChecklist = normalizeChecklist(checklist);

  if (!Number.isInteger(assetIdNumber) || !status || !normalizedChecklist || !createdBy) {
    return NextResponse.json({ error: "Champs requis: assetId, status, checklist, createdBy" }, { status: 400 });
  }

  const created = await prisma.inspection.create({
    data: {
      assetId: assetIdNumber,
      status,
      checklist: JSON.stringify(normalizedChecklist),
      meterValue: typeof meterValue === "number" ? meterValue : null,
      createdBy,
      photos: isJsonSerializable(photos) ? JSON.stringify(photos) : null,
    },
  });
  if (typeof meterValue === "number") {
    await prisma.asset.update({ where: { id: assetIdNumber }, data: { meterValue } });
  }
  return NextResponse.json(
    {
      ...created,
    },
    { status: 201 }
  );
}