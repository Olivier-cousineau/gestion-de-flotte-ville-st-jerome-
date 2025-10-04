import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { assetId, season, startDate, endDate, hoursWorked, cost, status, notes } = data;

  const numericAssetId = typeof assetId === "number" ? assetId : Number(assetId);

  if (!numericAssetId || !season || !startDate) {
    return NextResponse.json(
      { error: "Champs requis: assetId, season, startDate" },
      { status: 400 }
    );
  }

  const parsedStart = new Date(startDate);
  const parsedEnd = endDate ? new Date(endDate) : null;

  if (Number.isNaN(parsedStart.getTime()) || (parsedEnd && Number.isNaN(parsedEnd.getTime()))) {
    return NextResponse.json(
      { error: "Dates invalides" },
      { status: 400 }
    );
  }

  const assetExists = await prisma.asset.findUnique({ where: { id: numericAssetId } });
  if (!assetExists) {
    return NextResponse.json({ error: "Actif introuvable" }, { status: 404 });
  }

  const created = await prisma.offSeasonRecord.create({
    data: {
      assetId: numericAssetId,
      season,
      startDate: parsedStart,
      endDate: parsedEnd,
      hoursWorked: typeof hoursWorked === "number" ? hoursWorked : hoursWorked ? Number(hoursWorked) : null,
      cost: typeof cost === "number" ? cost : cost ? Number(cost) : null,
      status: status ?? "planifié",
      notes: notes ?? null,
    },
  });

  return NextResponse.json(created, { status: 201 });
}
