import type { Metadata } from "next";
import { getProducts } from "@/lib/catalog";
import { getSelectedBranch } from "@/lib/branch";
import { MenuPromoSlider } from "@/components/shop/menu-promo-slider";
import { MenuSection } from "@/components/shop/menu-section";

export const metadata: Metadata = {
  alternates: { canonical: "/shop" },
  title: "Catálogo: pastillas, discos y repuestos de freno",
  description:
    "Explora el catálogo de FRENOSHOP: pastillas de freno, discos, tambores, cilindros, kits y líquidos en Santa Cruz, Bolivia.",
};

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const branch = await getSelectedBranch();
  const products = await getProducts({}, branch?.id);
  const highlights = products.filter((p) => p.featured);
  const rest = products.filter((p) => !p.featured);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-3xl">
        <span className="eyebrow">El catálogo</span>
        <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink text-balance sm:text-5xl lg:text-6xl">
          Repuestos de freno en Santa Cruz
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base text-muted sm:text-lg">
          Pastillas, discos, tambores, cilindros, kits y líquidos para mantener tu
          vehículo frenando seguro. Explora por categoría o consúltanos si no
          encuentras tu pieza.
        </p>
      </header>

      <div className="mt-10">
        <MenuPromoSlider />
      </div>

      <div className="mt-14 space-y-14 sm:mt-16 sm:space-y-16">
        <MenuSection
          id="destacados"
          eyebrow="Lo más buscado"
          title="Repuestos destacados"
          description="Las piezas que más solicitan nuestros clientes en Feria Barrio Lindo."
          href="/shop"
          linkLabel="Ver todo"
          products={highlights}
        />

        <MenuSection
          id="catalogo"
          eyebrow="Todo el catálogo"
          title="Repuestos por categoría"
          description="Elige la categoría que necesitas o escríbenos para confirmar la compatibilidad con tu vehículo."
          href="/shop"
          linkLabel="Ver todo"
          products={rest}
        />
      </div>

      {products.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-[var(--line)] bg-surface py-16 text-center">
          <p className="font-display text-xl text-ink">El catálogo está tomando forma</p>
          <p className="mt-1 text-sm text-muted">
            Estamos cargando los repuestos. Escríbenos por WhatsApp y te ayudamos mientras tanto.
          </p>
        </div>
      ) : null}
    </div>
  );
}
