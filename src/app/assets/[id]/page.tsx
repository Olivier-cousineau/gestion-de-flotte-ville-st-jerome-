import { prisma } from "@/lib/prisma";
import InspectionForm from "@/components/InspectionForm";

export default async function AssetDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const asset = await prisma.asset.findUnique({ where: { id } });
  const inspections = await prisma.inspection.findMany({ where: { assetId: id }, orderBy: { id: "desc" } });

  if (!asset) return <div>Actif introuvable.</div>;

  return (
     <div className="grid" style={{gap:16}}>
      <div className="card">
        <div className="small">{asset.assetId} · UID {asset.uid}</div>
        <h2 style={{fontSize:20, fontWeight:700}}>{asset.name}</h2>
        <div className="small">{asset.category} · {asset.make ?? ""} {asset.model ?? ""}</div>
        <div>Compteur: {asset.meterValue ?? "—"} {asset.meterType ?? ""}</div>
      </div>

      <section className="grid">
        <h3 style={{fontWeight:600}}>Nouvelle inspection</h3>
        <InspectionForm assetId={asset.id} defaultMeter={asset.meterValue ?? undefined} />
      </section>

      <section className="grid">
        <h3 style={{fontWeight:600}}>Historique des inspections</h3>
        <div className="grid">
          {inspections.map((i) => (
            <div key={i.id} className="card" style={{fontSize:14}}>
              <div className="small">{new Date(i.createdAt).toLocaleString()}</div>
              <div>Statut: {i.status}</div>
              {i.meterValue !== null && <div>Compteur: {i.meterValue}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}