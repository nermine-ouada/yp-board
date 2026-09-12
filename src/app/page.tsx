import Link from "next/link";
import { DecryptText } from "@/components/DecryptText";
import { SplitHeadline } from "@/components/SplitHeadline";
import { CountUp } from "@/components/CountUp";
import { Mark3D } from "@/components/Mark3D";
import { Pillars } from "@/components/Pillars";
import { Board } from "@/components/Board";
import { opportunities } from "@/data/opportunities";

export default function Home() {
  return (
    <>
      <header>
        <div className="wrap">
          <div className="brand-row">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="IEEE Young Professionals" />
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Link href="/about" className="nav-link">
                About YP
              </Link>
              <span className="tape-stat">
                <CountUp target={opportunities.length} />
                &nbsp;pinned · Sept 2026
              </span>
            </div>
          </div>
          <div className="hero">
            <Mark3D />
            <div className="hero-copy">
              <DecryptText
                as="span"
                className="eyebrow"
                text="// YP Task Force pinboard"
                duration={550}
              />
              <SplitHeadline plain="Pin your next" shiny="opportunity" />
              <svg className="squiggle" viewBox="0 0 200 20" fill="none">
                <path
                  d="M2 14 Q 20 2 40 14 T 80 14 T 120 14 T 160 14 T 198 14"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
              <p>
                Every scholarship, fellowship and internship the Task Force has scouted,
                dragged out of a spreadsheet and pinned up where you&apos;ll actually look.
                Drag the badge, search below, go apply.
              </p>
            </div>
          </div>
        </div>
      </header>

      <Pillars />

      <main>
        <div className="wrap">
          <Board />
        </div>
      </main>

      <footer>
        <div className="wrap">
          <span className="tape-strip">The YP Board · pinned by the IEEE YP Task Force</span>
          <p className="fine-print">
            Deadlines shift year to year, so confirm current cycle dates on the linked society
            page before applying. IEEE membership is required for virtually every listing
            here. Compiled from the Task Force Support Sheet, Sept 2026. Questions or new
            leads?{" "}
            <a className="contact" href="mailto:yp@ieee.tn">
              yp@ieee.tn
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
