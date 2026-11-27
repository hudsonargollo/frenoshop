import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// FRENOSHOP — tienda de repuestos de frenos en Santa Cruz, Bolivia.
// El catálogo arranca VACÍO: el equipo lo carga desde el panel de administración.
// Las categorías y la sucursal única son las únicas filas base.

const categories = [
  { name: "Pastillas de freno", slug: "pastillas-de-freno", description: "Pastillas de freno para autos y camionetas." },
  { name: "Discos y tambores", slug: "discos-y-tambores", description: "Discos ventilados, sólidos y tambores de freno." },
  { name: "Cilindros y bombas", slug: "cilindros-y-bombas", description: "Cilindros maestros, bombas y actuadores de freno." },
  { name: "Kits y sellos", slug: "kits-y-sellos", description: "Kits de reparación, sellos y empaquetaduras." },
  { name: "Mangueras y líquidos", slug: "mangueras-y-liquidos", description: "Mangueras de freno, líquido DOT y accesorios." },
  { name: "Accesorios", slug: "accesorios", description: "Accesorios y herramientas para el sistema de frenos." },
];

const BRANCH = {
  name: "Feria Barrio Lindo",
  slug: "barrio-lindo",
  code: "FS01",
  address: "Feria Barrio Lindo, Acronal B, pasillo D 316",
  city: "Santa Cruz de la Sierra",
  phone: "+591 75539766",
  whatsapp: "59175539766",
  hours: "Atención por WhatsApp",
  latitude: -17.7822,
  longitude: -63.1836,
  sortOrder: 1,
};

const settings = {
  contact: {
    email: "",
    phone: "+591 75539766",
    whatsapp: "59175539766",
    city: "Santa Cruz de la Sierra, Bolivia",
    hours: "Atención por WhatsApp",
  },
  social: {
    instagram: "https://www.instagram.com/frenoshop_bo/",
    facebook: "",
    tiktok: "",
  },
  shipping: {
    flatFee: 15,
    freeThreshold: 300,
    deliveryTime: "lo antes posible, según disponibilidad y distancia",
  },
  announcements: [
    "Repuestos de freno en Santa Cruz · Feria Barrio Lindo",
    "Envío gratis a partir de Bs 300",
    "Atención y pedidos por WhatsApp al 75539766",
    "Catálogo en construcción: vuelve pronto",
  ],
  inventory: { lowStockThreshold: 5 },
  loyalty: {
    enabled: false,
    name: "Club Frenoshop",
    stampsToFree: 10,
    eligible: "all",
    eligibleSlugs: [],
    pointsPer: 1,
    pointsAmount: 10,
    pointsOnShipping: false,
    expiryDays: 0,
  },
  notifications: { orderEmail: "" },
};

async function main() {
  console.log("🌱 Seeding FRENOSHOP database...");

  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, description: c.description },
      create: c,
    });
  }
  console.log(`  ✔ ${categories.length} categories`);

  await prisma.branch.upsert({
    where: { slug: BRANCH.slug },
    update: {},
    create: BRANCH,
  });
  console.log("  ✔ 1 branch (Feria Barrio Lindo)");

  // Category art falls back gracefully while the catalog is empty.
  const art: Record<string, string> = {
    "pastillas-de-freno": "/images/promo-pastillas.webp",
    "discos-y-tambores": "/images/promo-discos.webp",
    "kits-y-sellos": "/images/promo-sellos.webp",
    "mangueras-y-liquidos": "/images/promo-repuestos.webp",
    "accesorios": "/images/promo-repuestos.webp",
    "cilindros-y-bombas": "/images/promo-repuestos.webp",
  };
  for (const [slug, image] of Object.entries(art)) {
    await prisma.category.update({ where: { slug }, data: { image } });
  }

  await prisma.setting.upsert({
    where: { key: "store" },
    update: { value: settings },
    create: { key: "store", value: settings },
  });
  console.log("  ✔ store settings");

  // The loyalty programme is paused, so no rewards are seeded. Any rewards
  // from a previous install are deactivated rather than deleted.
  const result = await prisma.reward.updateMany({ where: { active: true }, data: { active: false } });
  console.log(`  ✔ loyalty paused (${result.count} rewards deactivated)`);

  console.log("  ✔ catalog left empty (0 products) — load it from Admin → Products");
  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
