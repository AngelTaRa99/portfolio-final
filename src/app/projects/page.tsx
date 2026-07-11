import Link from "next/link";

export default function Projects() {
  return (
    <section className="w-full max-w-lg">
      <div className="neumorph-card p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="relative w-2.5 h-2.5 rounded-full bg-red-600 led-active" />
          <h2 className="font-mono text-lg tracking-wide text-black dark:text-white">
            Terra
          </h2>
          <span className="ml-auto font-mono text-xs px-2 py-0.5 rounded-full bg-red-600/10 text-red-600 dark:text-red-500 border border-red-600/20">
            GIS
          </span>
        </div>

        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Sistema de informacion geografica para gestion de ventas
          inmobiliarias. Mapa interactivo con estado de lotes en
          tiempo real: libre, en visita, apartado y vendido.
        </p>

        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className="tag">Next.js</span>
          <span className="tag">React</span>
          <span className="tag">GIS</span>
          <span className="tag">Maps</span>
        </div>

        <Link
          href="https://terra-eta-one.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="neumorph-link mt-2 inline-flex items-center justify-center gap-2 py-2.5 px-4 font-mono text-sm tracking-wider text-black dark:text-white"
        >
          Ver aplicacion
          <span className="text-red-600">&#8599;</span>
        </Link>
      </div>
    </section>
  );
}
