import type { Metadata } from "next";
import { OrnateFrame } from "@/components/ornate-frame";
import { Emblem } from "@/components/brand/emblem";
import { CustomDesignForm } from "@/components/custom-design-form";
import { getStoreSettings } from "@/lib/settings";
import { whatsappUrl } from "@/lib/settings-shared";

export const metadata: Metadata = {
  alternates: { canonical: "/custom" },
  title: "Consulta de repuestos",
  description: "¿No encuentras tu pieza? Cuéntanos tu vehículo y te ayudamos a conseguir el repuesto de freno correcto.",
};

const STEPS = [
  { n: "1", title: "Cuéntanos tu vehículo", body: "Marca, modelo, año y motor. Si puedes, envía una foto de la pieza que necesitas reemplazar." },
  { n: "2", title: "Buscamos la pieza", body: "Te confirmamos disponibilidad, alternativas compatibles, precio y tiempo de entrega." },
  { n: "3", title: "Recibes tu repuesto", body: "Retira en nuestro local de Feria Barrio Lindo o recibe el pedido en tu dirección." },
];

export default async function CustomPage() {
  const settings = await getStoreSettings();
  return (
    <div className="bg-cream px-5 py-12">
      <OrnateFrame className="mx-auto max-w-4xl bg-panel">
        <div className="px-6 py-16 text-center sm:px-14">
          <Emblem size={48} className="mx-auto text-accent-strong" />
          <span className="eyebrow mt-4 block">No encuentras tu repuesto</span>
          <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
            Consulta de repuestos
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-ink/80">
            ¿No ves la pieza que buscas en el catálogo? Cuéntanos los datos de tu
            vehículo y te ayudamos a identificar el repuesto de freno correcto.
            Trabajamos con pastillas, discos, cilindros, kits y mucho más.
          </p>
          <a
            href="#design-request"
            className="mt-9 inline-block rounded-full bg-accent px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-brand-deep shadow-[0_14px_32px_-16px_rgba(245,179,1,0.9)] transition duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
          >
            Consultar mi repuesto
          </a>
          <p className="mt-3 text-xs text-muted">
            Rellena un formulario breve para coordinar tu consulta con nuestro equipo.
          </p>
        </div>
      </OrnateFrame>

      <section className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="rounded-lg border border-[var(--line)] bg-cream-soft p-7 text-center"
          >
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand font-display text-lg text-accent">
              {s.n}
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-ink">{s.title}</h3>
            <p className="mt-2 text-sm text-muted">{s.body}</p>
          </div>
        ))}
      </section>

      <section
        id="design-request"
        className="mx-auto mt-14 max-w-4xl scroll-mt-28 rounded-2xl border border-[var(--line)] bg-cream-soft p-6 sm:p-10"
      >
        <div className="text-center">
          <span className="eyebrow">Paso 1</span>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink">Cuéntanos tu vehículo</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
            Completa lo que puedas — nuestro equipo te contactará lo antes posible para confirmar disponibilidad y precio.
          </p>
        </div>
        <div className="mt-8">
          <CustomDesignForm whatsappUrl={whatsappUrl(settings) || undefined} />
        </div>
      </section>
    </div>
  );
}
