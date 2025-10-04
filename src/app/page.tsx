const stats = [
  { label: "Actifs en service", value: "128", detail: "+4 cette semaine" },
  { label: "Entretien planifié", value: "23", detail: "7 échéances critiques" },
  { label: "Inspecteurs actifs", value: "12", detail: "Équipes Routes & Parcs" },
  { label: "Rapports en attente", value: "5", detail: "Validation requise" },
];

const tasks = [
  {
    asset: "Camion sel C-27",
    due: "12 avril 2024",
    type: "Inspection de sécurité",
    team: "Garage municipal",
  },
  {
    asset: "Nacelle aérienne N-04",
    due: "15 avril 2024",
    type: "Entretien hydraulique",
    team: "Équipe Électricité",
  },
  {
    asset: "Pick-up Parcs P-12",
    due: "18 avril 2024",
    type: "Changement d'huile",
    team: "Garage municipal",
  },
  {
    asset: "Autobus 302",
    due: "21 avril 2024",
    type: "Inspection mensuelle",
    team: "Transport collectif",
  },
];

const actions = [
  {
    title: "Créer un bon d'entretien",
    description:
      "Planifiez une intervention préventive et assignez l'équipe responsable.",
    href: "/assets",
  },
  {
    title: "Scanner un actif sur le terrain",
    description: "Ouvrez le mode scan pour rattacher une inspection à un UID.",
    href: "/scan?uid=A7X3Q9",
  },
  {
    title: "Consulter le registre des actifs",
    description:
      "Accédez à l'inventaire complet : véhicules, équipements et infrastructures.",
    href: "/assets",
  },
];

const updates = [
  {
    title: "Programme printemps 2024",
    detail: "Priorité aux balais mécaniques et aux unités de déneigement hors saison.",
  },
  {
    title: "Campagne sécurité chauffeurs",
    detail: "Briefing obligatoire pour les opérateurs lourds avant le 30 avril.",
  },
  {
    title: "Intégration télématique",
    detail: "Connexion des données GPS des camions de collecte en cours de test.",
  },
];

export default function Page() {
  return (
    <div className="grid" style={{ gap: 24 }}>
      <section className="card" style={{ display: "grid", gap: 16, padding: 24 }}>
        <div className="small" style={{ letterSpacing: 1.2, textTransform: "uppercase" }}>
          Direction des travaux publics
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          <h2 style={{ fontSize: 28, fontWeight: 600, margin: 0 }}>
            Tableau de bord — Ville de St-Jérôme
          </h2>
          <p className="small" style={{ maxWidth: 640, lineHeight: 1.5 }}>
            Suivez l'état de la flotte municipale, préparez les inspections et
            centralisez les communications entre les garages, les équipes de
            terrain et le centre de coordination.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="card"
              style={{ padding: 16, gap: 6, display: "grid", alignContent: "start" }}
            >
              <div className="small" style={{ textTransform: "uppercase", letterSpacing: 1 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 28, fontWeight: 600 }}>{stat.value}</div>
              <div className="small" style={{ opacity: 0.7 }}>
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gap: 24,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          alignItems: "start",
        }}
      >
        <div className="card" style={{ display: "grid", gap: 16, padding: 20 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Interventions à venir</h3>
            <p className="small" style={{ marginTop: 4 }}>
              Planifiez les actions prioritaires pour éviter les arrêts de service.
            </p>
          </div>
          <div className="grid" style={{ gap: 12 }}>
            {tasks.map((task) => (
              <div
                key={`${task.asset}-${task.due}`}
                className="card"
                style={{
                  display: "grid",
                  gap: 6,
                  padding: 16,
                  borderColor: "rgba(94, 234, 212, 0.25)",
                }}
              >
                <div style={{ fontWeight: 600 }}>{task.asset}</div>
                <div className="small">{task.type}</div>
                <div className="small" style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{task.team}</span>
                  <span style={{ fontWeight: 600 }}>{task.due}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid" style={{ gap: 16 }}>
          <div className="card" style={{ display: "grid", gap: 12, padding: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Actions rapides</h3>
            <div className="grid" style={{ gap: 10 }}>
              {actions.map((action) => (
                <a
                  key={action.title}
                  href={action.href}
                  className="card"
                  style={{
                    padding: 16,
                    display: "grid",
                    gap: 6,
                    borderColor: "rgba(96, 165, 250, 0.25)",
                    textDecoration: "none",
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{action.title}</div>
                  <div className="small" style={{ lineHeight: 1.4 }}>{action.description}</div>
                </a>
              ))}
            </div>
          </div>

          <div className="card" style={{ display: "grid", gap: 12, padding: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Communications internes</h3>
            <div className="grid" style={{ gap: 10 }}>
              {updates.map((update) => (
                <div
                  key={update.title}
                  className="card"
                  style={{
                    padding: 14,
                    display: "grid",
                    gap: 4,
                    background: "rgba(30, 41, 59, 0.6)",
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{update.title}</div>
                  <div className="small" style={{ lineHeight: 1.4 }}>{update.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="card" style={{ padding: 20, display: "grid", gap: 12 }}>
        <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Procédures clés</h3>
        <div className="grid" style={{ gap: 8 }}>
          <div className="small" style={{ lineHeight: 1.5 }}>
            • Utiliser l'application mobile pour scanner le QR code de chaque actif et
            rattacher les photos des anomalies.
          </div>
          <div className="small" style={{ lineHeight: 1.5 }}>
            • Consigner les réparations majeures dans Prisma afin de conserver l'historique
            complet des interventions et des pièces.
          </div>
          <div className="small" style={{ lineHeight: 1.5 }}>
            • Planifier les suivis post-intervention avec les équipes Routes, Parcs et
            Transport pour confirmer la remise en service.
          </div>
        </div>
      </section>
    </div>
  );
}