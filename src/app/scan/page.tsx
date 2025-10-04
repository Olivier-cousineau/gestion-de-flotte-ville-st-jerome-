import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ScanPage({ searchParams }: { searchParams: { uid?: string } }) {
  const uid = searchParams.uid?.trim();
  const asset = uid ? await prisma.asset.findUnique({ where: { uid } }) : null;

  return (
    <div className="grid">
      <h2 style={{fontSize:18, fontWeight:600}}>Scan QR</h2>
      <p className="small">Collez l’UID scanné (ou utilisez un QR qui pointe sur <code>/scan?uid=UID</code>).</p>

      <form className="grid" action="/scan" method="GET" style={{gridTemplateColumns:'auto auto', gap:8, alignItems:'center'}}>
        <input className="rounded px py" name="uid" placeholder="UID (ex: A7X3Q9)" defaultValue={uid || ""} />
        <button className="rounded px py border">Chercher</button>
      </form>

      {uid && !asset && <div className="small">Aucun actif avec l’UID <b>{uid}</b>.</div>}
      {asset && (
        <div className="card">
          <div className="small">{asset.assetId} · UID {asset.uid}</div>
          <div style={{fontWeight:600}}>{asset.name}</div>
          <Link className="small" href={`/assets/${asset.id}`} style={{textDecoration:'underline'}}>Ouvrir la fiche</Link>
        </div>
      )}
    </div>
  );
}