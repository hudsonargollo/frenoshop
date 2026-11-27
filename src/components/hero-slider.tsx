"use client";

import { preload } from "react-dom";
import Link from "next/link";
import { RotatingWord, SplitText } from "./text-reveal";
import { useBranchPicker } from "./branch-picker";

const HERO = "/images/hero-frenoshop.webp";
const LOGO = "/images/frenoshop-logo.png";

export function HeroSlider() {
  // The hero art is the biggest thing above the fold — fetch it straight away.
  preload(HERO, { as: "image", fetchPriority: "high" });
  preload(LOGO, { as: "image", fetchPriority: "high" });
  const picker = useBranchPicker();

  return (
    <section className="relative overflow-hidden bg-brand text-light">
      {/* Background art */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO})` }}
      />
      {/* Readability overlay: black on the left, clearing toward the disc */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.82) 42%, rgba(8,8,8,0.35) 70%, rgba(8,8,8,0.10) 100%)",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-brand/60 lg:hidden" />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32 lg:py-36">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
          {/* Brand — the logo is the first thing in the hero. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO}
            alt="FRENOSHOP"
            width={908}
            height={197}
            className="mx-auto h-16 w-auto drop-shadow-[0_18px_40px_rgba(0,0,0,0.65)] sm:h-20 lg:mx-0 lg:h-24"
          />
          <span className="mt-6 inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-soft" aria-hidden="true" />
            Santa Cruz · Feria Barrio Lindo
          </span>
          <h1 className="mt-3 max-w-[19ch] font-display text-4xl font-extrabold leading-[1.04] tracking-tight text-balance sm:text-5xl lg:text-[4rem]">
            <SplitText text="Frenos y repuestos" delay={80} />{" "}
            <RotatingWord
              words={["para tu auto", "que sí detienen", "de calidad"]}
              className="text-accent-soft"
            />
          </h1>
          <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-light/85">
            Pastillas, discos, tambores, cilindros, kits y sellos para el sistema de frenos.
            Atención directa por WhatsApp y entrega en Santa Cruz.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link
              href="/shop"
              className="inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-bold text-brand-deep shadow-[0_18px_40px_-16px_rgba(245,179,1,0.9)] transition duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
            >
              Ver catálogo
            </Link>
            <button
              type="button"
              onClick={() => picker.open({ locate: true })}
              className="inline-block rounded-full border border-light/50 px-8 py-3.5 text-sm font-semibold text-light transition hover:border-accent-soft hover:bg-light/5 hover:text-accent-soft"
            >
              Encontrar local
            </button>
          </div>

          <p className="mt-8 text-xs font-medium uppercase tracking-[0.16em] text-light/60">
            Delivery y retiro en tienda · Pago contra entrega
          </p>
        </div>
      </div>
    </section>
  );
}
