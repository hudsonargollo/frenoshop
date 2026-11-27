import type { Metadata } from "next";
import Link from "next/link";
import { getFeaturedProducts, getProducts, getCategories } from "@/lib/catalog";
import { getSelectedBranch, getBranches } from "@/lib/branch";
import { ProductImage } from "@/components/product-image";
import { HeroSlider } from "@/components/hero-slider";
import { BranchSuggest } from "@/components/branch-suggest";
import { PromoSlider } from "@/components/promo-slider";
import { PromoOverlay } from "@/components/promo-overlay";
import { CategoryArt } from "@/components/category-art";
import { FeaturedCarousel } from "@/components/featured-carousel";
import { Commitments } from "@/components/commitments";
import { Newsletter } from "@/components/newsletter";
import { DeliveryBand } from "@/components/delivery-band";
import { ClubBand } from "@/components/loyalty/club-band";
import { Reveal } from "@/components/reveal";
import { SplitText } from "@/components/text-reveal";
import { JsonLd } from "@/components/json-ld";

import { siteUrl } from "@/lib/site";
import { getStoreSettings } from "@/lib/settings";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoPartsStore",
  name: "FRENOSHOP",
  url: siteUrl,
  slogan: "Frenos y repuestos para tu vehículo",
  description:
    "FRENOSHOP — repuestos de freno en Santa Cruz: pastillas, discos, tambores, cilindros, kits y sellos. Delivery y retiro en Feria Barrio Lindo con pago contra entrega.",
  priceRange: "Bs 20–1500",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Feria Barrio Lindo, Acronal B, pasillo D 316",
    addressLocality: "Santa Cruz de la Sierra",
    addressRegion: "Santa Cruz",
    addressCountry: "BO",
  },
  areaServed: "Santa Cruz de la Sierra",
  currenciesAccepted: "BOB",
  paymentAccepted: "Efectivo",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FRENOSHOP",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const trustBadges = (freeThreshold: number) => [
  { title: "Calidad garantizada", body: "Repuestos seleccionados para frenar con seguridad." },
  { title: "Delivery y retiro", body: "Recíbelo en tu puerta o retíralo en Feria Barrio Lindo." },
  {
    title: "Pago contra entrega",
    body:
      freeThreshold > 0
        ? `Delivery gratis en pedidos desde ${formatPrice(freeThreshold)}.`
        : "Paga en efectivo cuando recibas tu pedido.",
  },
  { title: "Asesoría directa", body: "Te ayudamos a confirmar compatibilidad por WhatsApp." },
];

export const revalidate = 300;

export default async function HomePage() {
  const settings = await getStoreSettings();
  const branch = await getSelectedBranch();
  const TRUST = trustBadges(settings.shipping.freeThreshold);
  const CONTACT = settings.social;
  const [featured, newest, categories, branches] = await Promise.all([
    getFeaturedProducts(8, branch?.id),
    getProducts({ sort: "newest" }, branch?.id),
    getCategories(),
    getBranches(),
  ]);
  const topCategories = categories.slice(0, 6);
  const branchSuggestions = branches.flatMap((b) =>
    b.latitude == null || b.longitude == null
      ? []
      : [
          {
            slug: b.slug,
            name: b.name,
            address: b.address,
            latitude: b.latitude,
            longitude: b.longitude,
          },
        ]
  );

  // Product count + a representative image per category (falls back to the
  // category art when no product photo exists yet).
  const countBySlug: Record<string, number> = {};
  const imageBySlug: Record<string, string> = {};
  for (const p of newest) {
    countBySlug[p.category.slug] = (countBySlug[p.category.slug] ?? 0) + 1;
    if (!imageBySlug[p.category.slug] && p.images.length > 0) {
      imageBySlug[p.category.slug] = p.images[0];
    }
  }

  return (
    <>
      <JsonLd data={orgJsonLd} />
      <JsonLd data={websiteJsonLd} />

      <BranchSuggest branches={branchSuggestions} hasBranch={!!branch} />

      {/* Hero */}
      <HeroSlider />

      {/* Repuestos a pedido / WhatsApp */}
      <PromoOverlay />

      {/* Trust badges */}
      <section className="border-y border-[var(--line)] bg-cream-soft/50 px-5 py-11">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-9 lg:grid-cols-4">
          {TRUST.map((t, i) => (
            <div
              key={t.title}
              className={`flex flex-col items-center px-2 text-center sm:px-6 ${
                i > 0 ? "lg:border-l lg:border-[var(--line)]" : ""
              }`}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(245,179,1,0.35)] bg-[radial-gradient(circle,rgba(255,216,92,0.18),transparent_70%)] text-accent-strong">
                <TrustIcon i={i} />
              </span>
              <p className="mt-3.5 font-display text-lg font-bold text-ink">{t.title}</p>
              <p className="mt-1 text-sm leading-snug text-muted">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by category */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <div className="text-center">
            <span className="eyebrow">El catálogo</span>
            <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
              <SplitText text="Elige tu repuesto" />
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-muted">
              Pastillas, discos, tambores, cilindros, kits, sellos y mangueras. Todo para
              el sistema de frenos, en un mismo lugar.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {topCategories.map((c, idx) => {
            const count = countBySlug[c.slug] ?? 0;
            const comingSoon = count === 0;
            const img = imageBySlug[c.slug];
            const cardCls =
              "group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--line)] transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-[0_28px_55px_-28px_rgba(0,0,0,0.55)]";

            const body =
              comingSoon || !img ? (
                // No products / no photo yet → dark card with category art
                <div
                  className="relative flex h-full flex-col items-center justify-center gap-3 p-6 text-center"
                  style={{ background: "linear-gradient(160deg, #1a1a1a, #080808)" }}
                >
                  <div className="pointer-events-none absolute inset-3 rounded-xl border border-[rgba(255,216,92,0.25)]" />
                  <CategoryArt slug={c.slug} className="h-20 w-20 text-accent-soft transition duration-500 group-hover:scale-105" />
                  <div>
                    <h3 className="font-display text-xl font-bold text-light">{c.name}</h3>
                    <span className="mt-2 inline-block rounded-full border border-[rgba(255,216,92,0.4)] px-3 py-1 text-[0.6rem] uppercase tracking-[0.16em] text-accent-soft">
                      Ver categoría
                    </span>
                  </div>
                </div>
              ) : (
                // Product / category photo as the cover
                <>
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                    <ProductImage src={img} alt={c.name} seed={c.slug} />
                  </div>
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, rgba(8,8,8,0) 35%, rgba(8,8,8,0.55) 68%, rgba(8,8,8,0.9) 100%)" }}
                  />
                  <div className="pointer-events-none absolute inset-3 rounded-xl border border-[rgba(255,255,255,0.16)]" />
                  <div className="relative flex h-full flex-col items-center justify-end p-5 text-center">
                    <h3 className="font-display text-2xl font-bold text-light drop-shadow-sm">{c.name}</h3>
                    <span className="mt-1 text-xs uppercase tracking-[0.16em] text-accent-soft">Ver categoría →</span>
                  </div>
                </>
              );

            return (
              <Reveal key={c.slug} delay={(idx % 3) * 80}>
                <Link href={`/shop/${c.slug}`} className={cardCls}>
                  {body}
                </Link>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] px-8 py-3 text-sm font-semibold text-ink transition hover:border-accent hover:text-accent-strong"
          >
            Ver todo el catálogo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Category highlight slider */}
      <PromoSlider />

      {/* Featured carousel — only when the store has featured products */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-20">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <span className="eyebrow">Destacados</span>
                <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
                  <SplitText text="Repuestos destacados" />
                </h2>
              </div>
              <Link href="/shop" className="text-sm font-semibold text-accent-strong hover:text-accent">
                Ver todo →
              </Link>
            </div>
          </Reveal>
          <div className="mt-10">
            <FeaturedCarousel products={featured} />
          </div>
        </section>
      )}

      {/* Loyalty programme (hidden while disabled) */}
      <ClubBand rules={settings.loyalty} />

      {/* Same-day local delivery */}
      <DeliveryBand
        hours={settings.contact.hours}
        deliveryTime={settings.shipping.deliveryTime}
        freeThreshold={settings.shipping.freeThreshold}
      />

      {/* Brand story */}
      <section className="bg-cream px-5 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-panel">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/story-frenoshop.webp"
                alt="Repuestos y kits de freno FRENOSHOP"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-3 rounded-xl border border-[rgba(255,247,224,0.6)]" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <span className="eyebrow">Nuestra historia</span>
              <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink text-balance sm:text-5xl">
                <SplitText text="Frenos con" />{" "}
                <span className="brand-text">calidad y precio</span>
              </h2>
              <p className="mt-5 text-pretty leading-relaxed text-ink/80">
                FRENOSHOP nace en Santa Cruz para acercar repuestos de freno de calidad a
                mecánicos y conductores. Atendemos en la Feria Barrio Lindo, Acronal B,
                pasillo D 316, con atención directa por WhatsApp.
              </p>
              <p className="mt-4 text-pretty leading-relaxed text-ink/80">
                Trabajamos pastillas, discos, tambores, cilindros, kits, sellos y mangueras
                para auto, camioneta y moto. Si no encuentras tu repuesto, lo buscamos por ti.
              </p>
              <Link
                href="/about"
                className="mt-7 inline-block rounded-full bg-accent px-8 py-3 text-sm font-semibold text-brand-deep shadow-[0_16px_36px_-18px_rgba(245,179,1,0.95)] transition duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
              >
                Conoce FRENOSHOP
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Commitments */}
      <Commitments />

      {/* Instagram / catalog gallery — only when there are product photos */}
      {newest.some((p) => p.images.length > 0) && (
        <section className="relative overflow-hidden bg-cream-soft px-5 py-24">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(245,179,1,0.4)] to-transparent" />
          <div className="relative mx-auto max-w-6xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-cream px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent-strong">
              Catálogo
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink text-balance sm:text-5xl">
              <SplitText text="Repuestos en stock" />
            </h2>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
              {newest
                .filter((p) => p.images.length > 0)
                .slice(0, 6)
                .map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    aria-label={p.name}
                    className="group relative block aspect-square overflow-hidden rounded-xl ring-1 ring-[var(--line)] transition-all duration-500 hover:-translate-y-1 hover:ring-2 hover:ring-accent hover:shadow-[0_24px_48px_-24px_rgba(8,8,8,0.5)]"
                  >
                    <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-110">
                      <ProductImage src={p.images[0]} alt={p.name} seed={p.slug} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-brand-deep/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute inset-x-0 bottom-0 translate-y-2 px-3 pb-3 text-left text-[0.72rem] font-medium leading-tight text-light opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      {p.name}
                    </span>
                  </Link>
                ))}
            </div>
            {CONTACT.instagram && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-brand-deep shadow-[0_16px_36px_-18px_rgba(245,179,1,0.95)] transition duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
                >
                  Síguenos en Instagram
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}

function TrustIcon({ i }: { i: number }) {
  const p = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  // 0 Calidad · 1 Delivery y retiro · 2 Pago · 3 Asesoría
  if (i === 0)
    return (
      <svg {...p}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1.3" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
      </svg>
    );
  if (i === 1)
    return (
      <svg {...p}>
        <circle cx="5.5" cy="17.5" r="2.5" />
        <circle cx="18.5" cy="17.5" r="2.5" />
        <path d="M8 17.5h5.5l2-5h3" />
        <path d="M14 12.5 12.8 8H10" />
        <path d="M15.5 8.5h3" />
      </svg>
    );
  if (i === 2)
    return (
      <svg {...p}>
        <rect x="2.5" y="6" width="19" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.4" />
        <path d="M6 9.5v5M18 9.5v5" />
      </svg>
    );
  return (
    <svg {...p}>
      <path d="M4 5h16v11H9l-5 4V5z" />
      <path d="M8 10h8M8 13h5" />
    </svg>
  );
}
