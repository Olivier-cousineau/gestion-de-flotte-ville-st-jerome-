export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";

type Asset = Awaited<ReturnType<typeof prisma.asset.findMany>>[number];

export default async function AssetsPage() {
  const assets = await prisma.asset.findMany({ orderBy: { id: "asc" } });
  return (
    <div className="grid">
      <h2 style={{fontSize:18, fontWeight:600}}>Actifs</h2>
      <div className="grid grid2">
        {assets.map((a: Asset) => (
          <Link key={a.id} href={`/assets/${a.id}`} className="card">
            <div className="small">{a.assetId} · UID {a.uid}</div>
            <div style={{fontWeight:600}}>{a.name}</div>
            <div className="small">{a.category} · {a.make ?? ""} {a.model ?? ""}</div>
            <div className="small">Statut: {a.status}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}