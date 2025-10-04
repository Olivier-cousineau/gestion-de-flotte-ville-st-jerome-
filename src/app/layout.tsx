import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Ville de St-Jérôme · Entretien de flotte",
  description:
    "Plateforme interne de la Ville de St-Jérôme pour suivre les actifs municipaux, planifier l'entretien et coordonner les équipes.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="container">
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div className="small" style={{ letterSpacing: 1.2, textTransform: "uppercase" }}>
                Ville de St-Jérôme
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>
                Entretien et gestion de la flotte municipale
              </h1>
            </div>
            <nav className="small" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a className="pill" href="/">
                Tableau de bord
              </a>
              <a className="pill" href="/assets">
                Actifs
              </a>
              <a className="pill" href="/scan">
                Scan QR
              </a>
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}