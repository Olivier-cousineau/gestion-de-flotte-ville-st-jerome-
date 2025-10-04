import "./globals.css";
import type { ReactNode } from "react";

export const metadata = { title: "Flotte QR — MVP" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="container">
          <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <h1 style={{fontSize:18, fontWeight:600}}>Gestion de flotte (QR) — MVP</h1>
            <nav className="small" style={{display:'flex',gap:12}}>
              <a href="/">Dashboard</a>
              <a href="/assets">Actifs</a>
              <a href="/offseason">Hors saison</a>
              <a href="/scan">Scan</a>
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}