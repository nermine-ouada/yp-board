"use client";
import { useMemo, useState } from "react";
import { opportunities } from "@/data/opportunities";
import { OpportunityCard } from "./OpportunityCard";
import { SearchBar } from "./SearchBar";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CategoryFilter = "All" | "Scholarships" | "PhD & Fellowships" | "Internships";
type LevelFilter = "All" | "Undergraduate" | "Graduate" | "PhD" | "Postdoc" | "Early Career";

const CATEGORIES: CategoryFilter[] = ["All", "Scholarships", "PhD & Fellowships", "Internships"];
const LEVELS: { key: LevelFilter; label: string }[] = [
  { key: "All", label: "all levels" },
  { key: "Undergraduate", label: "undergrad" },
  { key: "Graduate", label: "grad / master's" },
  { key: "PhD", label: "phd" },
  { key: "Postdoc", label: "postdoc" },
  { key: "Early Career", label: "early career" },
];

function levelMatches(levelStr: string, filter: LevelFilter) {
  if (filter === "All") return true;
  if (filter === "Graduate") return /graduate|master/i.test(levelStr) && !/postdoc/i.test(levelStr);
  if (filter === "PhD") return /phd/i.test(levelStr);
  if (filter === "Postdoc") return /postdoc/i.test(levelStr);
  if (filter === "Early Career") return /early career|young professional/i.test(levelStr);
  if (filter === "Undergraduate") return /undergrad/i.test(levelStr);
  return true;
}

export function Board() {
  const motionOK = !useReducedMotion();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [level, setLevel] = useState<LevelFilter>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return opportunities.filter((it) => {
      if (category !== "All" && it.sheet !== category) return false;
      if (!levelMatches(it.level, level)) return false;
      if (q) {
        const hay = [it.title, it.category, it.level, it.who, it.notes, it.award].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, category, level]);

  return (
    <>
      <div className="toolbar">
        <SearchBar value={query} onChange={setQuery} />
        <div className="tabs" role="tablist" aria-label="Category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className="key"
              data-cat={cat}
              aria-pressed={category === cat}
              onClick={() => setCategory(cat)}
            >
              {cat === "PhD & Fellowships" ? "PhD & Fellowships" : cat}
            </button>
          ))}
        </div>
        <div className="tag-row" aria-label="Level">
          {LEVELS.map((lvl) => (
            <button
              key={lvl.key}
              className="tag"
              aria-pressed={level === lvl.key}
              onClick={() => setLevel(lvl.key)}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>

      <p className="count-line">
        // showing {filtered.length} of {opportunities.length}
      </p>

      <div className="grid">
        {filtered.length === 0 ? (
          <div className="empty-state" style={{ gridColumn: "1 / -1" }}>
            <strong>Nothing pinned here yet</strong>
            Try a different search term or clear a filter.
          </div>
        ) : (
          filtered.map((item, i) => (
            <OpportunityCard key={`${item.sheet}-${item.num}`} item={item} index={i} motionOK={motionOK} />
          ))
        )}
      </div>
    </>
  );
}
