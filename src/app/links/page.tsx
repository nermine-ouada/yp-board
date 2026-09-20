import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogos } from "@/components/BrandLogos";

export const metadata: Metadata = {
  title: "YP Tunisia AG Task Force Links",
  description: "Quick links from the IEEE YP Tunisia AG Task Force flyer.",
};

const LINKS = [
  {
    href: "/",
    accent: "var(--blue)",
    title: "The YP Pinboard",
    sub: "52 scholarships, fellowships & internships",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 4v16M4 9h5" />
      </svg>
    ),
  },
  {
    href: "https://yp.ieee.tn/",
    accent: "var(--blue)",
    title: "IEEE YP Tunisia AG",
    sub: "yp.ieee.tn · the local Tunisia Affinity Group",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    href: "https://yp.ieee.org",
    accent: "var(--green)",
    title: "IEEE Young Professionals",
    sub: "yp.ieee.org · the global YP community",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 4 6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-6-4-9s1.5-6.4 4-9Z" />
      </svg>
    ),
  },
  {
    href: "/about",
    accent: "var(--orange)",
    title: "More about YP",
    sub: "Who we are, and what Connect · Learn · Lead · Thrive means",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="8" r="3.2" />
        <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
        <path d="M16.2 3.6c1.8.5 3 2.1 3 4.1 0 2-1.4 3.6-3.1 4.1" />
        <path d="M21.5 20c0-3-1.9-5.2-4.5-5.8" />
      </svg>
    ),
  },
  {
    href: "mailto:yp@ieee.tn",
    accent: "var(--green)",
    title: "Ask the Task Force",
    sub: "yp@ieee.tn · questions, new leads, feedback",
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
        <div className="wrap">
          <div className="brand-row">
            <BrandLogos />
            <Link href="/" className="tape-stat" style={{ textDecoration: "none" }}>
              ← back to the board
            </Link>
          </div>
          <div style={{ textAlign: "center", marginTop: 22 }}>
            <span className="eyebrow">// scan the flyer, land here</span>
            <h1 style={{ fontSize: "clamp(24px,6vw,34px)" }}>Everything from the flyer</h1>
            <p style={{ margin: "10px auto 0", color: "var(--board-muted)", maxWidth: "44ch" }}>
              One tap to the board, the wider YP community, or a direct line to the Task Force.
            </p>
          </div>
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="footer-logo"
            src="/yp-tunisia-logo.png"
            alt="IEEE Young Professionals Tunisia Section"
            style={{ margin: "0 auto 14px" }}
          />
          <p className="fine-print" style={{ margin: "0 auto" }}>
            Pinned by the IEEE YP Tunisia AG Task Force · Sept 2026
          </p>
        </div>
      </footer>
    </>
  );
}
