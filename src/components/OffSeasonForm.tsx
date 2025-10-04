"use client";

import { useState } from "react";

interface OffSeasonFormProps {
  assetId: number;
  defaultSeason?: string;
}

const STATUSES = [
  { value: "planifié", label: "Planifié" },
  { value: "en_cours", label: "En cours" },
  { value: "terminé", label: "Terminé" },
];

export default function OffSeasonForm({ assetId, defaultSeason }: OffSeasonFormProps) {
  const [season, setSeason] = useState(defaultSeason ?? "2024-2025");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hours, setHours] = useState<string>("");
  const [cost, setCost] = useState<string>("");
  const [status, setStatus] = useState(STATUSES[0].value);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit() {
    if (!season || !startDate) {
      alert("Veuillez remplir la saison et la date de début.");
      return;
    }

    setSaving(true);
    const res = await fetch("/api/offseason", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        assetId,
        season,
        startDate,
        endDate: endDate || undefined,
        hoursWorked: hours ? Number(hours) : undefined,
        cost: cost ? Number(cost) : undefined,
        status,
        notes: notes || undefined,
      }),
    });
    setSaving(false);
    if (res.ok) {
      setStartDate("");
      setEndDate("");
      setHours("");
      setCost("");
      setNotes("");
      window.location.reload();
    } else {
      const body = await res.json().catch(() => null);
      alert(body?.error ?? "Erreur lors de l'enregistrement");
    }
  }

  return (
    <div className="card" style={{ display: "grid", gap: 12, fontSize: 14 }}>
      <div style={{ display: "grid", gap: 8 }}>
        <label className="grid" style={{ gap: 4 }}>
          <span className="small">Saison</span>
          <input className="rounded px py" value={season} onChange={(e) => setSeason(e.target.value)} placeholder="2024-2025" />
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <label className="grid" style={{ gap: 4 }}>
            <span className="small">Début</span>
            <input className="rounded px py" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </label>
          <label className="grid" style={{ gap: 4 }}>
            <span className="small">Fin (optionnel)</span>
            <input className="rounded px py" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </label>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <label className="grid" style={{ gap: 4 }}>
            <span className="small">Heures totales</span>
            <input
              className="rounded px py"
              type="number"
              step="0.1"
              min="0"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="0"
            />
          </label>
          <label className="grid" style={{ gap: 4 }}>
            <span className="small">Coût ($)</span>
            <input
              className="rounded px py"
              type="number"
              step="0.01"
              min="0"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="0"
            />
          </label>
        </div>
        <label className="grid" style={{ gap: 4 }}>
          <span className="small">Statut</span>
          <select className="rounded px py" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="grid" style={{ gap: 4 }}>
          <span className="small">Notes</span>
          <textarea
            className="rounded px py"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Travaux prévus, pièces, etc."
            style={{ resize: "vertical" }}
          />
        </label>
      </div>
      <button disabled={saving} onClick={submit} className="rounded px py border" style={{ justifySelf: "flex-start" }}>
        {saving ? "Enregistrement…" : "Ajouter"}
      </button>
    </div>
  );
}
