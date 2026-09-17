import type { Metadata } from "next";
import Link from "next/link";
import { DecryptText } from "@/components/DecryptText";
import { ArrowIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About IEEE Young Professionals",
  description: "Who the IEEE Young Professionals community is, and what it offers early-career engineers.",
};

const WHO_WE_ARE = [
  {
    title: "A Community of Innovators",
    accent: "var(--blue)",
    body: "A community of forward-thinking individuals, bound by a shared passion for technology and a commitment to pushing the boundaries of innovation. Our members, volunteers, and initiatives span the globe, creating a rich tapestry of perspectives and experiences.",
  },
  {
    title: "Guidance for Early-Career Professionals",
    accent: "var(--orange)",
    body: "Get the insight you need to navigate the exciting and challenging early stages of your career. IEEE Young Professionals is your compass: evaluating your career goals, polishing your professional image, and setting the foundation for a lifelong and diverse network.",
  },
  {
    title: "Accessible to All IEEE Members",
    accent: "var(--green)",
    body: "Take your membership even further with opportunities you'll only find with IEEE Young Professionals. Our resources and events are available to all members, ensuring you have the support you need to thrive in your career.",
  },
];

const PILLARS = [
  {
    key: "CONNECT",
    accent: "var(--blue)",
    tagline: "Connect with peers, experts, and mentorship programs",
    points: [
      "Explore mentorship opportunities for guidance and development",
      "Expand your professional network on a global scale",
      "Seek advice from people with real-world experience across a variety of career paths",
    ],
  },
  {
    key: "LEARN",
    accent: "var(--green)",
    tagline: "Learn skills and knowledge to expand your horizons",
    points: [
      "Participate in skill-building challenges and workshops",
      "Stay current through curated educational resources",
      "Develop leadership, project management, event planning, presentation, communication and problem-solving skills through hands-on experience",
    ],
  },
  {
    key: "LEAD",
    accent: "var(--orange)",
    tagline: "Lead with impact and volunteer with purpose",
    points: [
      "Engage in impactful volunteer experiences and shape the next generation",
      "Showcase your abilities in IEEE contests, challenges, and volunteering initiatives",
      "Gain recognition and visibility, contributing to your personal and professional advancement",
    ],
  },
  {
    key: "THRIVE",
    accent: "var(--blue)",
    tagline: "Thrive in your career and community",
    points: [
      "Build a reputation as an active, engaged IEEE professional",
      "Discover new career and entrepreneurial possibilities",
      "Secure not just a job, but the career that aligns with your aspirations",
    ],
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
            <h1 style={{ fontSize: "clamp(28px,6vw,44px)", marginBottom: 14 }}>
              Connecting passions.
              <br />
              Igniting <span style={{ color: "var(--orange)" }}>futures</span>.
            </h1>
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
          <section style={{ marginTop: 30 }}>
            <p className="sheet-section-label" style={{ margin: "0 0 12px" }}>
              Who are the IEEE Young Professionals?
            </p>
            <div className="info-grid">
              {WHO_WE_ARE.map((w, i) => (
                <div className="info-card" key={w.title} style={{ ["--accent" as string]: w.accent }}>
                  <span className="info-card-tag">0{i + 1}</span>
                  <h3>{w.title}</h3>
                  <p>{w.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section style={{ marginTop: 40 }}>
            <p className="sheet-section-label" style={{ margin: "0 0 12px" }}>
              Where your passion meets a global community
            </p>
            <p style={{ color: "var(--board-muted)", maxWidth: "68ch", margin: "0 0 20px" }}>
              Your future is ignited with opportunities, connections, and a bridge to success
              crafted just for you, built around four things.
            </p>
            <div className="pillar-detail-grid">
              {PILLARS.map((p) => (
                <div className="pillar-detail-card" key={p.key} style={{ ["--accent" as string]: p.accent }}>
                  <span className="pillar-chip">{p.key}</span>
                  <p className="pillar-tagline">{p.tagline}</p>
                  <ul>
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="about-cta">
            <div>
              <h2>Ready to get involved?</h2>
              <p>
                Browse what the Task Force has pinned, or read more at{" "}
                <a href="https://yp.ieee.org" target="_blank" rel="noopener noreferrer" className="about-inline-link">
                  yp.ieee.org
                </a>
                .
              </p>
            </div>
            <Link className="apply-btn" href="/" style={{ ["--accent" as string]: "var(--blue)" }}>
              Open the board <ArrowIcon />
            </Link>
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
