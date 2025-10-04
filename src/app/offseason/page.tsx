import { prisma } from "@/lib/prisma";

function sum<T>(items: T[], getter: (item: T) => number | null | undefined) {
  return items.reduce((acc, item) => {
    const value = getter(item);
    return acc + (typeof value === "number" && !Number.isNaN(value) ? value : 0);
  }, 0);
}

function formatCurrency(value: number) {
  return value.toLocaleString("fr-CA", { style: "currency", currency: "CAD" });
}

function formatNumber(value: number) {
  return value.toLocaleString("fr-CA", { maximumFractionDigits: 1 });
}

export default async function OffSeasonPage() {
  const records = await prisma.offSeasonRecord.findMany({
    include: { asset: true },
    orderBy: { startDate: "desc" },
  });

  const totalHours = sum(records, (record) => record.hoursWorked ?? undefined);
  const totalCost = sum(records, (record) => record.cost ?? undefined);
  const activeCount = records.filter((record) => record.status !== "terminé").length;

  return (
    <div className="grid" style={{ gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: 18, fontWeight: 600 }}>Entretien hors saison</h2>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        <div className="card" style={{ display: "grid", gap: 4 }}>
          <span className="small">Total des heures</span>
          <strong style={{ fontSize: 20 }}>{formatNumber(totalHours)}</strong>
        </div>
        <div className="card" style={{ display: "grid", gap: 4 }}>
          <span className="small">Total des coûts</span>
          <strong style={{ fontSize: 20 }}>{formatCurrency(totalCost)}</strong>
        </div>
        <div className="card" style={{ display: "grid", gap: 4 }}>
          <span className="small">Plans actifs</span>
          <strong style={{ fontSize: 20 }}>{activeCount}</strong>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr className="small" style={{ textAlign: "left", opacity: 0.7 }}>
                <th style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>Actif</th>
                <th style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>Saison</th>
                <th style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>Dates</th>
                <th style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>Statut</th>
                <th style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>Heures</th>
                <th style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>Coût</th>
                <th style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => {
                const start = new Date(record.startDate);
                const end = record.endDate ? new Date(record.endDate) : undefined;
                const days = end ? Math.round((end.getTime() - start.getTime()) / 86400000) + 1 : undefined;
                const statusLabel = record.status.replace(/_/g, " ");
                return (
                  <tr key={record.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "grid" }}>
                        <span style={{ fontWeight: 600 }}>{record.asset.name}</span>
                        <span className="small">{record.asset.assetId}</span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>{record.season}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <div className="small">
                        {start.toLocaleDateString()} · {end ? end.toLocaleDateString() : "en cours"}
                      </div>
                      {days && <div className="small" style={{ opacity: 0.7 }}>{days} jours</div>}
                    </td>
                    <td style={{ padding: "12px 16px", textTransform: "uppercase" }}>{statusLabel}</td>
                    <td style={{ padding: "12px 16px" }}>
                      {record.hoursWorked !== null ? formatNumber(record.hoursWorked) : "—"}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      {record.cost !== null ? formatCurrency(record.cost) : "—"}
                    </td>
                    <td style={{ padding: "12px 16px", maxWidth: 280 }}>
                      {record.notes ? <span className="small">{record.notes}</span> : <span className="small" style={{ opacity: 0.6 }}>—</span>}
                    </td>
                  </tr>
                );
              })}
              {records.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: "16px", textAlign: "center" }}>
                    <span className="small">Aucun plan hors saison enregistré pour le moment.</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
