import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import NavRail from "@/app/components/NavRail";
import Footer from "@/app/components/Footer";
import PageTransition from "@/app/components/PageTransition";
import { profile } from "@/content/profile";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Angel T. Ramírez | Portfolio",
  description: "Portafolio de Angel T. Ramírez — desarrollador de software.",
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches);if(d)document.documentElement.classList.add("dark")}catch(e){}})()`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${jetbrainsMono.variable} flex min-h-dvh flex-col bg-background font-mono text-foreground antialiased`}>
        <Header brand={profile.brand} />
        <div className="flex flex-1 flex-col lg:flex-row">
          <NavRail />
          <main className="scanlines relative flex flex-1 flex-col items-center px-4 py-10 lg:px-10">
            <PageTransition>{children}</PageTransition>
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
