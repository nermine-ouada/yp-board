import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { deleteOpportunity } from "./actions";
import { logout } from "./login/actions";
import { getDistinctSheets } from "@/lib/opportunities";
import { ConfirmButton } from "@/components/admin/ConfirmButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sheet?: string; status?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const sheet = params.sheet ?? "";
  const status = params.status ?? "";

  const where: Prisma.OpportunityWhereInput = { deletedAt: null };
  if (sheet) where.sheet = sheet;
  if (status) where.status = status;
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { category: { contains: q, mode: "insensitive" } },
      { level: { contains: q, mode: "insensitive" } },
      { who: { contains: q, mode: "insensitive" } },
    ];
  }

  const [opportunities, trashedCount, allSheets, allStatuses, totalActive] = await Promise.all([
    prisma.opportunity.findMany({ where, orderBy: [{ sheet: "asc" }, { sortOrder: "asc" }] }),
    prisma.opportunity.count({ where: { deletedAt: { not: null } } }),
    getDistinctSheets(),
    prisma.opportunity
      .findMany({ where: { deletedAt: null }, distinct: ["status"], select: { status: true }, orderBy: { status: "asc" } })
      .then((rows) => rows.map((r) => r.status)),
    prisma.opportunity.count({ where: { deletedAt: null } }),
  ]);

  const hasFilters = Boolean(q || sheet || status);

  return (
    <main>
      <div className="wrap">
        <div className="admin-bar">
          <div>
            <span className="eyebrow" style={{ marginBottom: 4 }}>
              // admin
            </span>
            <h1>The YP Pinboard · manage opportunities</h1>
          </div>
          <div className="admin-bar-actions">
            <Link href="/" className="admin-link-btn">
              ← view board
            </Link>
            <Link href="/admin/trash" className="admin-link-btn">
              Trash{trashedCount > 0 ? ` (${trashedCount})` : ""}
            </Link>
            <Link href="/admin/import" className="admin-link-btn">
              Import from Excel
            </Link>
            <Link href="/admin/new" className="apply-btn" style={{ ["--accent" as string]: "var(--blue)" }}>
              + Add opportunity
            </Link>
            <form action={logout}>
              <button type="submit" className="admin-link-btn">
                Log out
              </button>
            </form>
          </div>
        </div>

        <form className="admin-filter-bar" method="get">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search title, level, who qualifies…"
            className="admin-input"
            style={{ maxWidth: 280 }}
          />
          <select name="sheet" defaultValue={sheet} className="admin-select" style={{ maxWidth: 200 }}>
            <option value="">All categories</option>
            {allSheets.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select name="status" defaultValue={status} className="admin-select" style={{ maxWidth: 160 }}>
            <option value="">All statuses</option>
            {allStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button type="submit" className="admin-link-btn">
            Filter
          </button>
          {hasFilters && (
            <Link href="/admin" className="admin-link-btn">
              Clear
            </Link>
          )}
        </form>

        <p className="count-line">
          {hasFilters ? `Showing ${opportunities.length} of ${totalActive}` : `${totalActive} opportunities pinned`}
        </p>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Title</th>
                <th>Level</th>
                <th>Status</th>
                <th>Deadline</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {opportunities.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ color: "var(--muted)" }}>
                    Nothing matches those filters.
                  </td>
                </tr>
              ) : (
                opportunities.map((item) => (
                  <tr key={item.id}>
                    <td>{item.sheet}</td>
                    <td>{item.title}</td>
                    <td>{item.level}</td>
                    <td>{item.status}</td>
                    <td>{item.deadline}</td>
                    <td>
                      <div className="admin-row-actions">
                        <Link href={`/admin/${item.id}`} className="admin-link-btn">
                          Edit
                        </Link>
                        <form action={deleteOpportunity}>
                          <input type="hidden" name="id" value={item.id} />
                          <ConfirmButton
                            className="admin-link-btn danger"
                            confirmMessage={`Move "${item.title}" to trash?`}
                          >
                            Delete
                          </ConfirmButton>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
