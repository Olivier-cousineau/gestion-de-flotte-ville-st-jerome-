"use client";
import { useState } from "react";

export default function InspectionForm({ assetId, defaultMeter }: { assetId: number; defaultMeter?: number }) {
  const [meter, setMeter] = useState<number | undefined>(defaultMeter);
  const [lightsOk, setLightsOk] = useState(true);
  const [tiresOk, setTiresOk] = useState(true);
  const [brakesOk, setBrakesOk] = useState(true);
  const [who, setWho] = useState("");
  const [saving, setSaving] = useState(false);
  const status = lightsOk && tiresOk && brakesOk ? "ok" : "issues";

  async function submit() {
    setSaving(true);
    const checklist = { lightsOk, tiresOk, brakesOk };
    const res = await fetch("/api/inspections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assetId, status, checklist, meterValue: meter ?? null, createdBy: who })
    });
    setSaving(false);
    if (res.ok) {
      window.location.reload();
    } else {
      alert("Erreur lors de l'enregistrement");
    }
  }

  return (
    <div className="card" style={{fontSize:14}}>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
        <label style={{display:'flex', alignItems:'center', gap:8}}><input type="checkbox" checked={lightsOk} onChange={e=>setLightsOk(e.target.checked)} />Lumières OK</label>
        <label style={{display:'flex', alignItems:'center', gap:8}}><input type="checkbox" checked={tiresOk} onChange={e=>setTiresOk(e.target.checked)} />Pneus OK</label>
        <label style={{display:'flex', alignItems:'center', gap:8}}><input type="checkbox" checked={brakesOk} onChange={e=>setBrakesOk(e.target.checked)} />Freins OK</label>
      </div>

      <div style={{display:'flex', gap:8, marginTop:10}}>
        <input className="rounded px py" style={{width:120}} type="number" placeholder="Compteur" value={meter ?? ""} onChange={e=>setMeter(e.target.value? Number(e.target.value): undefined)} />
        <input className="rounded px py" style={{flex:1}} placeholder="Votre nom" value={who} onChange={e=>setWho(e.target.value)} />
        <button disabled={saving} onClick={submit} className="rounded px py border">
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>

      <div className="small" style={{marginTop:8}}>Statut calculé: <b>{status}</b></div>
    </div>
  );
}