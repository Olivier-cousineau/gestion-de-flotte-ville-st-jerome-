import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.asset.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data.uid || !data.assetId || !data.name || !data.category) {
    return NextResponse.json({ error: "Champs requis: uid, assetId, name, category" }, { status: 400 });
  }
  const created = await prisma.asset.create({ data });
  return NextResponse.json(created, { status: 201 });
}