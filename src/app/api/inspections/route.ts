import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { assetId, status, checklist, meterValue, createdBy, photos } = data;
  if (!assetId || !status || !checklist || !createdBy) {
    return NextResponse.json({ error: "Champs requis: assetId, status, checklist, createdBy" }, { status: 400 });
  }
  const created = await prisma.inspection.create({
    data: {
      assetId,
      status,
      checklist,
      meterValue: typeof meterValue === "number" ? meterValue : null,
      createdBy,
      photos: photos ?? null,
    },
  });
  if (typeof meterValue === "number") {
    await prisma.asset.update({ where: { id: assetId }, data: { meterValue } });
  }
  return NextResponse.json(created, { status: 201 });
}