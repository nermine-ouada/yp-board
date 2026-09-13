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
  title: "The YP Board",
  description:
    "A pinboard of IEEE YP scholarships, fellowships and internships, curated by the YP Task Force.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        <script
          // Runs before paint so a saved theme choice applies immediately,
          // instead of flashing the system theme first.
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("ypboard:theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}`,
          }}
        />
      </head>
      <body>
        <MetaNav />
        {children}
        <LinktreeFab />
      </body>
    </html>
  );
}
