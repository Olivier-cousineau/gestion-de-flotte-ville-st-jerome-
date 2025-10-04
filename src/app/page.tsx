export default function Page() {
  return (
    <div className="grid" style={{gap:12}}>
      <h2 style={{fontSize:18, fontWeight:600}}>Bienvenue</h2>
      <p className="small">
        Cette base permet de scanner un QR (paramètre <code>?uid=</code>),
        lier une inspection et gérer une liste d'actifs. À étendre : bons de
        travail, plans d'entretien, rôles, etc.
      </p>
      <ul style={{paddingLeft:20}}>
        <li><a style={{textDecoration:'underline'}} href="/assets">Voir les actifs</a></li>
        <li><a style={{textDecoration:'underline'}} href="/scan?uid=A7X3Q9">Démo scan (uid=A7X3Q9)</a></li>
      </ul>
    </div>
  );
}