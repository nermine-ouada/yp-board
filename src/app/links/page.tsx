import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YP Task Force — Links",
  description: "Quick links from the IEEE YP Task Force flyer.",
};

const LINKS = [
  {
    href: "/",
    accent: "var(--blue)",
    title: "The YP Board",
    sub: "52 scholarships, fellowships & internships",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 4v16M4 9h5" />
      </svg>
    ),
  },
  {
    href: "https://yp.ieee.org",
    accent: "var(--green)",
    title: "IEEE Young Professionals",
    sub: "yp.ieee.org — the global YP community",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 4 6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-6-4-9s1.5-6.4 4-9Z" />
      </svg>
    ),
  },
  {
    href: "mailto:yp@ieee.tn",
    accent: "var(--orange)",
    title: "Ask the Task Force",
    sub: "yp@ieee.tn — questions, new leads, feedback",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3.5 6.5 8.5 6 8.5-6" />
      </svg>
    ),
  },
];

export default function LinksPage() {
  return (
    <>
      <header>
        <div className="wrap" style={{ textAlign: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="IEEE Young Professionals" style={{ margin: "0 auto 18px" }} />
          <span className="eyebrow">// scan the flyer, land here</span>
          <h1 style={{ fontSize: "clamp(24px,6vw,34px)" }}>Everything from the flyer</h1>
          <p style={{ margin: "10px auto 0", color: "var(--board-muted)", maxWidth: "44ch" }}>
            One tap to the board, the wider YP community, or a direct line to the Task Force.
          </p>
        </div>
      </header>

      <main>
        <div className="wrap" style={{ paddingTop: 20 }}>
          <div className="link-stack">
            {LINKS.map((l) => (
              <a
                key={l.href}
                className="link-card"
                href={l.href}
                style={{ ["--accent" as string]: l.accent }}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <span className="link-icon">{l.icon}</span>
                <span>
                  <span className="link-title">{l.title}</span>
                  <div className="link-sub">{l.sub}</div>
                </span>
              </a>
            ))}
          </div>
        </div>
      </main>

      <footer>
        <div className="wrap" style={{ textAlign: "center" }}>
          <p className="fine-print" style={{ margin: "0 auto" }}>
            Pinned by the IEEE YP Task Force · Sept 2026
          </p>
        </div>
      </footer>
    </>
  );
}
