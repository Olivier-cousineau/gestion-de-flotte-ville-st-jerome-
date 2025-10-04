import { prisma } from "../src/lib/prisma";

async function main() {
  const count = await prisma.asset.count();
  if (count > 0) return;

  await prisma.asset.createMany({
    data: [
      {
        uid: "A7X3Q9",
        assetId: "TRK-201",
        name: "Camion Ford F-150",
        category: "camion",
        make: "Ford",
        model: "F-150",
        year: 2022,
        vinSerial: "1FTEW1E58NFA12345",
        licensePlate: "XYZ 123",
        department: "Travaux publics",
        baseLocation: "Centre - St-Jérôme",
        meterType: "km",
        meterValue: 41250,
        status: "active"
      },
      {
        uid: "K2M9P1",
        assetId: "EXC-044",
        name: "Mini-excavatrice Kubota U17",
        category: "machinerie",
        make: "Kubota",
        model: "U17",
        year: 2020,
        vinSerial: "KU20U17SN8890",
        baseLocation: "Dépôt Nord",
        meterType: "hours",
        meterValue: 1520,
        status: "active"
      }
    ]
  });

  const truck = await prisma.asset.findUnique({ where: { uid: "A7X3Q9" } });
  const excavator = await prisma.asset.findUnique({ where: { uid: "K2M9P1" } });

  const existingOffSeason = await prisma.offSeasonRecord.count();
  if (existingOffSeason === 0) {
    if (truck) {
      await prisma.offSeasonRecord.create({
        data: {
          assetId: truck.id,
          season: "2023-2024",
          startDate: new Date("2023-11-01"),
          endDate: new Date("2024-03-15"),
          hoursWorked: 48,
          cost: 1850,
          status: "terminé",
          notes: "Inspection complète, remplacement d'huile et dresse de pneus.",
        },
      });
    }
    if (excavator) {
      await prisma.offSeasonRecord.create({
        data: {
          assetId: excavator.id,
          season: "2024-2025",
          startDate: new Date("2024-10-15"),
          hoursWorked: 12,
          status: "planifié",
          notes: "Prévoir commande des chenilles et graissage complet.",
        },
      });
    }
  }

  console.log("Seed OK");
}

main().then(()=>process.exit(0)).catch((e)=>{console.error(e);process.exit(1)});