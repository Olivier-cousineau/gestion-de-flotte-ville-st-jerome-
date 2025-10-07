"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type AssetFormState = {
  uid: string;
  assetId: string;
  name: string;
  category: string;
  make: string;
  model: string;
  year: string;
  vinSerial: string;
  licensePlate: string;
  department: string;
  baseLocation: string;
  meterType: string;
  meterValue: string;
  status: string;
  notes: string;
};

const initialState: AssetFormState = {
  uid: "",
  assetId: "",
  name: "",
  category: "",
  make: "",
  model: "",
  year: "",
  vinSerial: "",
  licensePlate: "",
  department: "",
  baseLocation: "",
  meterType: "",
  meterValue: "",
  status: "active",
  notes: "",
};

export default function AssetForm() {
  const router = useRouter();
  const [form, setForm] = useState<AssetFormState>(initialState);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof AssetFormState>(key: K, value: AssetFormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      uid: form.uid.trim(),
      assetId: form.assetId.trim(),
      name: form.name.trim(),
      category: form.category.trim(),
      make: form.make.trim() || null,
      model: form.model.trim() || null,
      year: form.year ? Number(form.year) : null,
      vinSerial: form.vinSerial.trim() || null,
      licensePlate: form.licensePlate.trim() || null,
      department: form.department.trim() || null,
      baseLocation: form.baseLocation.trim() || null,
      meterType: form.meterType.trim() || null,
      meterValue: form.meterValue ? Number(form.meterValue) : null,
      status: form.status.trim() || "active",
      notes: form.notes.trim() || null,
    };

    if (!payload.uid || !payload.assetId || !payload.name || !payload.category) {
      setError("Veuillez remplir les champs requis (UID, No. d'actif, Nom, Catégorie).");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const message = body?.error ?? "Impossible d'enregistrer l'actif.";
        throw new Error(message);
      }

      const created = await res.json();
      setForm(initialState);
      router.push(`/assets/${created.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{display:"grid", gap:16}}>
      <div style={{display:"grid", gap:12}}>
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:12}}>
          <label className="grid" style={{gap:4}}>
            <span className="small">UID *</span>
            <input
              required
              value={form.uid}
              onChange={e => updateField("uid", e.target.value)}
              className="rounded px py"
            />
          </label>
          <label className="grid" style={{gap:4}}>
            <span className="small">No. d'actif *</span>
            <input
              required
              value={form.assetId}
              onChange={e => updateField("assetId", e.target.value)}
              className="rounded px py"
            />
          </label>
          <label className="grid" style={{gap:4}}>
            <span className="small">Nom *</span>
            <input
              required
              value={form.name}
              onChange={e => updateField("name", e.target.value)}
              className="rounded px py"
            />
          </label>
          <label className="grid" style={{gap:4}}>
            <span className="small">Catégorie *</span>
            <input
              required
              value={form.category}
              onChange={e => updateField("category", e.target.value)}
              className="rounded px py"
            />
          </label>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:12}}>
          <label className="grid" style={{gap:4}}>
            <span className="small">Marque</span>
            <input value={form.make} onChange={e => updateField("make", e.target.value)} className="rounded px py" />
          </label>
          <label className="grid" style={{gap:4}}>
            <span className="small">Modèle</span>
            <input value={form.model} onChange={e => updateField("model", e.target.value)} className="rounded px py" />
          </label>
          <label className="grid" style={{gap:4}}>
            <span className="small">Année</span>
            <input
              type="number"
              min="1900"
              max="2100"
              value={form.year}
              onChange={e => updateField("year", e.target.value)}
              className="rounded px py"
            />
          </label>
          <label className="grid" style={{gap:4}}>
            <span className="small">No. de série / NIV</span>
            <input value={form.vinSerial} onChange={e => updateField("vinSerial", e.target.value)} className="rounded px py" />
          </label>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:12}}>
          <label className="grid" style={{gap:4}}>
            <span className="small">Plaque d'immatriculation</span>
            <input
              value={form.licensePlate}
              onChange={e => updateField("licensePlate", e.target.value)}
              className="rounded px py"
            />
          </label>
          <label className="grid" style={{gap:4}}>
            <span className="small">Service / département</span>
            <input
              value={form.department}
              onChange={e => updateField("department", e.target.value)}
              className="rounded px py"
            />
          </label>
          <label className="grid" style={{gap:4}}>
            <span className="small">Base / localisation</span>
            <input
              value={form.baseLocation}
              onChange={e => updateField("baseLocation", e.target.value)}
              className="rounded px py"
            />
          </label>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:12}}>
          <label className="grid" style={{gap:4}}>
            <span className="small">Type de compteur</span>
            <input
              value={form.meterType}
              onChange={e => updateField("meterType", e.target.value)}
              className="rounded px py"
            />
          </label>
          <label className="grid" style={{gap:4}}>
            <span className="small">Valeur du compteur</span>
            <input
              type="number"
              value={form.meterValue}
              onChange={e => updateField("meterValue", e.target.value)}
              className="rounded px py"
            />
          </label>
          <label className="grid" style={{gap:4}}>
            <span className="small">Statut</span>
            <select
              value={form.status}
              onChange={e => updateField("status", e.target.value)}
              className="rounded px py"
            >
              <option value="active">Actif</option>
              <option value="maintenance">Maintenance</option>
              <option value="inactive">Inactif</option>
              <option value="retired">Retiré</option>
            </select>
          </label>
        </div>

        <label className="grid" style={{gap:4}}>
          <span className="small">Notes</span>
          <textarea
            value={form.notes}
            onChange={e => updateField("notes", e.target.value)}
            className="rounded px py"
            rows={4}
          />
        </label>
      </div>

      {error && (
        <div className="small" style={{color:"#c00"}}>
          {error}
        </div>
      )}

      <div style={{display:"flex", gap:8, justifyContent:"flex-end"}}>
        <button type="submit" className="rounded px py border" disabled={saving}>
          {saving ? "Enregistrement…" : "Enregistrer l'actif"}
        </button>
      </div>
    </form>
  );
}
