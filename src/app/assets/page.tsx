import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AssetsPage() {
  type Asset = Awaited<ReturnType<typeof prisma.asset.findMany>>[number];
  const assets: Asset[] = await prisma.asset.findMany({ orderBy: { id: "asc" } });
  return (
    <div className="grid">
      <h2 style={{fontSize:18, fontWeight:600}}>Actifs</h2>
      <div className="grid grid2">
        {assets.map((asset: Asset) => (
          <Link key={asset.id} href={`/assets/${asset.id}`} className="card">
            <div className="small">{asset.assetId} · UID {asset.uid}</div>
            <div style={{fontWeight:600}}>{asset.name}</div>
            <div className="small">{asset.category} · {asset.make ?? ""} {asset.model ?? ""}</div>
            <div className="small">Statut: {asset.status}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}