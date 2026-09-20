import "server-only";
import { prisma } from "./prisma";
import type { Opportunity as DbOpportunity } from "@prisma/client";
import type { Opportunity, Sheet } from "@/data/opportunities";

function toOpportunity(row: DbOpportunity): Opportunity {
  return {
    id: row.id,
    sheet: row.sheet as Sheet,
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
  };
}

export async function getOpportunities(): Promise<Opportunity[]> {
  const rows = await prisma.opportunity.findMany({
    where: { deletedAt: null },
    orderBy: [{ sheet: "asc" }, { sortOrder: "asc" }],
  });
  return rows.map(toOpportunity);
}

export async function getOpportunity(id: string) {
  return prisma.opportunity.findUnique({ where: { id } });
}

export async function getDistinctSheets(): Promise<string[]> {
  const rows = await prisma.opportunity.findMany({
    distinct: ["sheet"],
    select: { sheet: true },
    orderBy: { sheet: "asc" },
  });
  return rows.map((r) => r.sheet);
}

export async function getDistinctLevels(): Promise<string[]> {
  const rows = await prisma.opportunity.findMany({
    distinct: ["level"],
    select: { level: true },
    orderBy: { level: "asc" },
  });
  return rows.map((r) => r.level).filter(Boolean);
}

export async function getDistinctDeadlines(): Promise<string[]> {
  const rows = await prisma.opportunity.findMany({
    distinct: ["deadline"],
    select: { deadline: true },
    orderBy: { deadline: "asc" },
  });
  return rows.map((r) => r.deadline).filter(Boolean);
}
