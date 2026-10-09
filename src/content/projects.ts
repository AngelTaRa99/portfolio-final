import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "terra",
    name: "Terra",
    description:
      "Sistema de información geográfica para gestión de ventas inmobiliarias. Mapa interactivo con el estado de los lotes en tiempo real: libre, en visita, apartado y vendido.",
    tags: ["Next.js", "React", "GIS", "Maps"],
    status: "live",
    url: "https://terra-eta-one.vercel.app/",
  },
  {
    id: "proyecto-2",
    name: "Proyecto 2",
    description: "TODO(content): describe tu segundo proyecto.",
    tags: ["TODO(content)"],
    status: "wip",
  },
  {
    id: "proyecto-3",
    name: "Proyecto 3",
    description: "TODO(content): describe tu tercer proyecto.",
    tags: ["TODO(content)"],
    status: "wip",
  },
];
