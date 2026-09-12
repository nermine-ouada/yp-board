import raw from "./opportunities.json";

export type Sheet = "Scholarships" | "PhD & Fellowships" | "Internships";

export type Opportunity = {
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
  sheet: Sheet;
};

const data = raw as Record<Sheet, Omit<Opportunity, "sheet">[]>;

export const opportunities: Opportunity[] = (
  Object.entries(data) as [Sheet, Omit<Opportunity, "sheet">[]][]
).flatMap(([sheet, rows]) => rows.map((row) => ({ ...row, sheet })));

export const CATEGORY_ACCENT: Record<Sheet, string> = {
  Scholarships: "var(--orange)",
  "PhD & Fellowships": "var(--blue)",
  Internships: "var(--green)",
};
