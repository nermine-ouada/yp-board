import type { Metadata } from "next";
import Link from "next/link";
import { DecryptText } from "@/components/DecryptText";

export const metadata: Metadata = {
  title: "About IEEE Young Professionals",
  description: "Who the IEEE Young Professionals community is, and what it offers early-career engineers.",
};

const WHO_WE_ARE = [
  {
    title: "A community of innovators",
    accent: "var(--blue)",
    body: "Forward-thinking individuals bound by a shared passion for technology. Members, volunteers and initiatives span the globe, creating a rich mix of perspectives and experience.",
  },
  {
    title: "Guidance for early-career professionals",
    accent: "var(--orange)",
    body: "A compass for the exciting, sometimes challenging early stretch of a career: evaluating your goals, polishing your professional image, and setting the foundation for a lifelong network.",
  },
  {
    title: "Accessible to all IEEE members",
    accent: "var(--green)",
    body: "Resources and events open to every IEEE member, so you have the support you need to thrive, whatever stage of that first stretch you're in.",
  },
];

const PILLARS = [
  {
    key: "CONNECT",
    accent: "var(--blue)",
    tagline: "With peers, experts and mentorship programs",
    body: "Explore mentorship for guidance and development, and build a professional network that spans the globe, drawing on people with real experience across a range of career paths.",
  },
  {
    key: "LEARN",
    accent: "var(--green)",
    tagline: "Skills and knowledge to expand your horizons",
    body: "Build practical skills through workshops and challenges, and grow leadership, communication and project-management ability through hands-on experience, backed by curated resources.",
  },
  {
    key: "LEAD",
    accent: "var(--orange)",
    tagline: "With impact, and volunteer with purpose",
    body: "Volunteer on initiatives that shape the next generation, and gain recognition through IEEE contests and challenges that add visibility to your work.",
  },
  {
    key: "THRIVE",
    accent: "var(--blue)",
    tagline: "In your career and your community",
    body: "Build a reputation as an engaged IEEE professional, and find the entrepreneurial or career path that actually fits what you're after.",
  },
];

export default function AboutPage() {
  return (
    <>
      <header>
        <div className="wrap">
          <div className="brand-row">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="IEEE Young Professionals" />
            <Link href="/" className="tape-stat" style={{ textDecoration: "none" }}>
              ← back to the board
            </Link>
          </div>
          <div className="hero" style={{ display: "block", textAlign: "left" }}>
            <DecryptText as="span" className="eyebrow" text="// who we are" duration={500} />
            <h1 style={{ fontSize: "clamp(28px,6vw,44px)" }}>
              Connecting passions.
              <br />
              Igniting futures.
            </h1>
            <svg className="squiggle" viewBox="0 0 200 20" fill="none" style={{ margin: "6px 0 0" }}>
              <path
                d="M2 14 Q 20 2 40 14 T 80 14 T 120 14 T 160 14 T 198 14"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <p style={{ margin: "14px 0 0", maxWidth: "62ch" }}>
              Welcome to IEEE Young Professionals: a vibrant global community tailored for
              anyone who received their first professional degree within the past 15 years.
              Wherever you are on that stretch of your career, this is the network built for it.
            </p>
          </div>
        </div>
      </header>

      <main>
        <div className="wrap">
          <section style={{ marginTop: 32 }}>
            <p className="sheet-section-label" style={{ margin: "0 0 4px" }}>
              Who are the IEEE Young Professionals?
            </p>
            <div className="who-we-are-list">
              {WHO_WE_ARE.map((w, i) => (
                <div className="who-entry" key={w.title}>
                  <span className="who-mark" style={{ ["--accent" as string]: w.accent }}>
                    0{i + 1}
                  </span>
                  <div>
                    <h3>{w.title}</h3>
                    <p>{w.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginTop: 40 }}>
            <p className="sheet-section-label" style={{ margin: "0 0 12px" }}>
              The four pillars
            </p>
            <p style={{ color: "var(--board-muted)", maxWidth: "68ch", margin: "0 0 18px" }}>
              Your future is ignited with opportunities, connections, and a bridge to success,
              built around four things.
            </p>
            <div className="pillars-panel">
              {PILLARS.map((p) => (
                <div className="pillars-row" key={p.key}>
                  <span className="pillars-tag" style={{ ["--accent" as string]: p.accent }}>
                    {p.key}
                  </span>
                  <div>
                    <p className="pillars-row-tagline">{p.tagline}</p>
                    <p className="pillars-row-desc">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginTop: 44, marginBottom: 8 }}>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--board-ink)", maxWidth: "62ch" }}>
              Ready to get involved?{" "}
              <Link href="/" className="about-inline-link">
                Browse what the Task Force has pinned
              </Link>
              , or head straight to{" "}
              <a
                href="https://yp.ieee.org"
                target="_blank"
                rel="noopener noreferrer"
                className="about-inline-link"
              >
                yp.ieee.org
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <footer>
        <div className="wrap">
          <span className="tape-strip">IEEE Young Professionals · yp.ieee.org</span>
          <p className="fine-print">
            Copy sourced from the official IEEE YP brochure. Questions?{" "}
            <a className="contact" href="mailto:yp@ieee.tn">
              yp@ieee.tn
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
