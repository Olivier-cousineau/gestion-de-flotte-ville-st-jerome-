# Flotte QR — MVP (Next.js 14 + Prisma + SQLite)

## Démarrer
1. `npm install`
2. Créez `.env` à la racine à partir de `.env.example` :
   ```env
   DATABASE_URL="file:./dev.db"
   ```
3. Init DB : `npx prisma migrate dev --name init`
4. Seed : `npm run seed`
5. Dev : `npm run dev` et ouvrez http://localhost:3000

## Tester le scan
- http://localhost:3000/scan?uid=A7X3Q9

## API
- `GET /api/assets`
- `POST /api/assets`
- `GET /api/assets/:id`
- `PUT /api/assets/:id`
- `DELETE /api/assets/:id`
- `POST /api/inspections`

## Production
- Remplacez SQLite par Postgres (Neon ou RDS) et mettez `DATABASE_URL` Postgres.
- Ajoutez Auth (Auth0/Clerk) et rôles.
- Ajoutez stockage d'images (S3) pour photos d'inspection.