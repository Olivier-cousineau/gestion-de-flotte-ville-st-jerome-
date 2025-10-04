import { prisma } from "@/lib/prisma";
import InspectionForm from "@/components/InspectionForm";
import OffSeasonForm from "@/components/OffSeasonForm";

export default async function AssetDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const asset = await prisma.asset.findUnique({
    where: { id },
    include: { offSeasons: { orderBy: { startDate: "desc" } } },
  });
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
        <h3 style={{ fontWeight: 600 }}>Plan hors saison</h3>
        <div className="grid" style={{ gap: 16 }}>
          <OffSeasonForm assetId={asset.id} />
          <div className="grid" style={{ gap: 12 }}>
            {asset.offSeasons.length === 0 && <div className="small">Aucun plan hors saison enregistré.</div>}
            {asset.offSeasons.map((record) => {
              const start = new Date(record.startDate);
              const end = record.endDate ? new Date(record.endDate) : undefined;
              const durationDays = end ? Math.round((end.getTime() - start.getTime()) / 86400000) + 1 : undefined;
              const statusLabel = record.status.replace(/_/g, " ");
              return (
                <div key={record.id} className="card" style={{ display: "grid", gap: 6, fontSize: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <div style={{ fontWeight: 600 }}>{record.season}</div>
                    <span className="small" style={{ textTransform: "uppercase" }}>{statusLabel}</span>
                  </div>
                  <div className="small">
                    {start.toLocaleDateString()} · {end ? end.toLocaleDateString() : "en cours"}
                    {durationDays ? ` · ${durationDays} jours` : ""}
                  </div>
                  {record.hoursWorked !== null && <div>Heures: {record.hoursWorked.toLocaleString("fr-CA", { maximumFractionDigits: 1 })}</div>}
                  {record.cost !== null && <div>Coût: {record.cost.toLocaleString("fr-CA", { style: "currency", currency: "CAD" })}</div>}
                  {record.notes && <div className="small">Notes: {record.notes}</div>}
                </div>
              );
            })}
          </div>
        </div>
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