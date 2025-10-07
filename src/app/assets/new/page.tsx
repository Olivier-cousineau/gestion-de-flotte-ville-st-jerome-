import Link from "next/link";
import AssetForm from "@/components/AssetForm";

export default function NewAssetPage() {
  return (
    <div className="grid" style={{gap:16}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", gap:12}}>
        <div>
          <h2 style={{fontSize:18, fontWeight:600, margin:0}}>Ajouter un actif</h2>
          <p className="small" style={{margin:0}}>Remplissez la fiche complète pour un nouveau véhicule ou équipement.</p>
        </div>
        <Link href="/assets" className="rounded px py border" style={{textDecoration:"none"}}>
          Retour à la liste
        </Link>
      </div>
      <AssetForm />
    </div>
  );
}
