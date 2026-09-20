import type { Metadata } from "next";
import { Bricolage_Grotesque, Karla, Space_Mono } from "next/font/google";
import { MetaNav } from "@/components/MetaNav";
import { LinktreeFab } from "@/components/LinktreeFab";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

const body = Karla({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "The YP Pinboard",
  description:
    "A pinboard of IEEE YP scholarships, fellowships and internships, curated by the YP Tunisia AG Task Force.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <MetaNav />
        {children}
        <LinktreeFab />
      </body>
    </html>
  );
}
