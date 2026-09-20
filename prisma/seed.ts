// One-time import of the existing spreadsheet-derived data.json into the
// database. Run with: npm run db:seed
import { PrismaClient } from "@prisma/client";
import raw from "../src/data/opportunities.json";

const prisma = new PrismaClient();

type RawRow = {
  num: string;
  title: string;
  category: string;
  level: string;
  who: string;
  award: string;
  deadline: string;
  status: string;
  membership: string;
  notes: string;
  link: string;
};

async function main() {
  const data = raw as Record<string, RawRow[]>;
  const existing = await prisma.opportunity.count();
  if (existing > 0) {
    console.log(`Opportunity table already has ${existing} rows — skipping seed.`);
    console.log("Delete the rows first (or drop/recreate the table) if you want to reseed.");
    return;
  }

  let sortOrder = 0;
  for (const [sheet, rows] of Object.entries(data)) {
    for (const row of rows) {
      await prisma.opportunity.create({
        data: {
          sheet,
          sortOrder: sortOrder++,
          title: row.title,
          category: row.category,
          level: row.level,
          who: row.who,
          award: row.award,
          deadline: row.deadline,
          status: row.status,
          membership: row.membership,
          notes: row.notes,
          link: row.link,
        },
      });
    }
  }

  const total = await prisma.opportunity.count();
  console.log(`Seeded ${total} opportunities.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
