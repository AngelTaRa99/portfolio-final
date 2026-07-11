import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Github, Linkedin, Email } from "@deemlol/next-icons";
import PageTransition from "@/app/components/PageTransition";
import SidebarNav from "@/app/components/SidebarNav";
import ThemeToggle from "@/app/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Angel T. Ramírez | Portfolio",
  description: "Portfolio personal de Angel T. Ramírez - Desarrollador",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches);if(d)document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-dvh`}
      >
        <header className="relative flex items-center justify-center p-3 bg-zinc-50 dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
          <span className="neumorph-pill font-mono text-sm tracking-wider text-black dark:text-white px-5 py-2">
            IAmAngel<span className="text-red-700 dark:text-red-500">.dev</span>
          </span>
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <ThemeToggle />
          </div>
        </header>

        <div className="flex flex-row flex-1">
          <SidebarNav />

          <main className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black flex-1 p-8">
            <div className="crt-container w-full h-full flex items-center justify-center p-10">
              <div className="text-4xl tracking-widest relative z-0 crt-text">
                <PageTransition>
                  {children}
                </PageTransition>
              </div>
            </div>
          </main>
        </div>

        <footer className="flex items-center justify-between px-10 py-2 font-sans border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black text-gray-600 dark:text-gray-500">
          <p className="tracking-widest capitalize">
            Angel T. Ramírez
          </p>
          <div className="flex flex-row gap-5 text-sm tracking-widest">
            <a href="https://github.com/AngelTaRa99" target="_blank" rel="noopener noreferrer" className="flex gap-2">
              <span className="hidden md:block">Github</span>
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/in/AngelTaRa99" target="_blank" rel="noopener noreferrer" className="flex gap-2">
              <span className="hidden md:block">LinkedIn</span>
              <Linkedin size={18} />
            </a>
            <a href="mailto:angel@example.com" className="flex gap-2">
              <span className="hidden md:block">Email</span>
              <Email size={18} />
            </a>
          </div>
        </footer>

      </body>
    </html>
  );
}
