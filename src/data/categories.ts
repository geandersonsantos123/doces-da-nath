import type { CatalogCategory } from "@/types/category";

export const categories = [
  {
    id: "bolos",
    slug: "bolos",
    name: "Bolos",
    order: 1,
  },
  {
    id: "brigadeiros-docinhos",
    slug: "brigadeiros-e-docinhos",
    name: "Brigadeiros e docinhos",
    order: 2,
  },
  {
    id: "kits-festa",
    slug: "kits-festa",
    name: "Kits Festa",
    order: 3,
  },
  {
    id: "caixas-produtos-individuais",
    slug: "caixas-e-produtos-individuais",
    name: "Caixas e produtos individuais",
    order: 4,
  },
] as const satisfies readonly CatalogCategory[];
