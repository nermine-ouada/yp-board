import Link from "next/link";
import { DecryptText } from "@/components/DecryptText";
import { SplitHeadline } from "@/components/SplitHeadline";
import { CountUp } from "@/components/CountUp";
import { Mark3D } from "@/components/Mark3D";
import { Pillars } from "@/components/Pillars";
import { Board } from "@/components/Board";
import { BrandLogos } from "@/components/BrandLogos";
import { getOpportunities } from "@/lib/opportunities";

// Admins can add/edit opportunities anytime via /admin, so this page can't be
// fully static — revalidate on a short interval and admin actions also
// force an immediate refresh via revalidatePath.
export const revalidate = 60;

export default async function Home() {
  const opportunities = await getOpportunities();

  return (
    <>
      <header>
        <div className="wrap">
          <div className="brand-row">
            <BrandLogos />
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
                text="// YP Tunisia AG Task Force pinboard"
                duration={550}
              />
              <SplitHeadline plain="Pin your next" shiny="opportunity" />
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
          <Board opportunities={opportunities} />
        </div>
      </main>

      <footer>
        <div className="wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="footer-logo" src="/yp-tunisia-logo.png" alt="IEEE Young Professionals Tunisia Section" />
          <span className="tape-strip">The YP Pinboard · pinned by the IEEE YP Tunisia AG Task Force</span>
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
