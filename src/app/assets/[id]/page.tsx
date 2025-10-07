export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import InspectionForm from "@/components/InspectionForm";

type Inspection = Awaited<ReturnType<typeof prisma.inspection.findMany>>[number];
type InspectionWithChecklist = Omit<Inspection, "checklist"> & {
  checklist: Record<string, boolean>;
};

export default async function AssetDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const asset = await prisma.asset.findUnique({ where: { id } });
  const rawInspections = await prisma.inspection.findMany({
    where: { assetId: id },
    orderBy: { id: "desc" },
  });
  const inspections: InspectionWithChecklist[] = rawInspections.map((inspection: Inspection) => {
    try {
      const rawChecklist =
        typeof inspection.checklist === "string"
          ? inspection.checklist
          : JSON.stringify(inspection.checklist ?? {});
      const parsed = JSON.parse(rawChecklist);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return {
          ...inspection,
          checklist: Object.fromEntries(
            Object.entries(parsed).map(([key, value]) => [key, value === true])
          ),
        };
      }
    } catch (error) {
      console.error("Invalid checklist JSON for inspection", inspection.id, error);
    }

    return {
      ...inspection,
      checklist: {},
    };
  });

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
          {inspections.length === 0 ? (
            <div className="card small">Aucune inspection enregistrée.</div>
          ) : (
            inspections.map((i) => (
              <div key={i.id} className="card" style={{fontSize:14}}>
                <div className="small">{new Date(i.createdAt).toLocaleString()}</div>
                <div>Statut: {i.status}</div>
                {i.meterValue !== null && <div>Compteur: {i.meterValue}</div>}
                {Object.entries(i.checklist).map(([item, ok]) => (
                  <div key={item} className="small">
                    {item}: <b>{ok ? "OK" : "À vérifier"}</b>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}