import type { CategoryView, ProductView } from "./types";

// Fallback data used when no database is connected. Mirrors prisma/seed.ts:
// the FRENOSHOP catalog starts empty and is filled from Admin → Products.

export const sampleCategories: CategoryView[] = [
  { id: "c-pastillas-de-freno", name: "Pastillas de freno", slug: "pastillas-de-freno", description: "Pastillas de freno para autos y camionetas." },
  { id: "c-discos-y-tambores", name: "Discos y tambores", slug: "discos-y-tambores", description: "Discos ventilados, sólidos y tambores de freno." },
  { id: "c-cilindros-y-bombas", name: "Cilindros y bombas", slug: "cilindros-y-bombas", description: "Cilindros maestros, bombas y actuadores de freno." },
  { id: "c-kits-y-sellos", name: "Kits y sellos", slug: "kits-y-sellos", description: "Kits de reparación, sellos y empaquetaduras." },
  { id: "c-mangueras-y-liquidos", name: "Mangueras y líquidos", slug: "mangueras-y-liquidos", description: "Mangueras de freno, líquido DOT y accesorios." },
  { id: "c-accesorios", name: "Accesorios", slug: "accesorios", description: "Accesorios y herramientas para el sistema de frenos." },
];

export const sampleProducts: ProductView[] = [];
