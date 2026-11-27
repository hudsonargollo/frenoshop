import type { Metadata } from "next";
import Link from "next/link";
import { Emblem } from "@/components/brand/emblem";
import { formatPrice } from "@/lib/format";
import { getStoreSettings } from "@/lib/settings";

export const metadata: Metadata = {
  alternates: { canonical: "/shipping" },
  title: "Envíos y devoluciones",
  description: "Envíos en Santa Cruz y retiro en Feria Barrio Lindo: costos, tiempos y política de devoluciones de FRENOSHOP.",
};

export default async function ShippingPage() {
  const { flatFee: FLAT_SHIPPING, freeThreshold: FREE_SHIPPING_THRESHOLD, deliveryTime: DELIVERY_TIME } = (
    await getStoreSettings()
  ).shipping;
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <div className="text-center">
        <Emblem size={40} className="mx-auto text-brand" accent="var(--color-accent)" />
        <span className="eyebrow mt-3 block">Ayuda</span>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink">
          Envíos y devoluciones
        </h1>
      </div>

      <div className="mt-12 space-y-10">
        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Envíos en Santa Cruz</h2>
          <ul className="mt-4 space-y-3 text-ink/80">
            <li>• Entregamos en Santa Cruz. Tiempo estimado: {DELIVERY_TIME}. El tiempo puede variar según disponibilidad y distancia.</li>
            <li>
              • Costo de envío: <strong>{formatPrice(FLAT_SHIPPING)}</strong>
              {FREE_SHIPPING_THRESHOLD > 0 ? (
                <> — <strong>gratis</strong> en pedidos desde {formatPrice(FREE_SHIPPING_THRESHOLD)}.</>
              ) : (
                <> — y <strong>gratis</strong> en todos los pedidos de FRENOSHOP.</>
              )}
            </li>
            <li>• Confirmamos la disponibilidad de la pieza antes de despachar tu pedido.</li>
            <li>• También puedes retirar en tienda sin costo: Feria Barrio Lindo, Acronal B, pasillo D 316.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-ink">Cambios y devoluciones</h2>
          <ul className="mt-4 space-y-3 text-ink/80">
            <li>• Si recibes una pieza incorrecta o con fallas, contáctanos con tu número de pedido y cuéntanos qué pasó.</li>
            <li>• Por seguridad, los repuestos de frenos instalados no se devuelven; revisa la compatibilidad antes de comprar.</li>
            <li>• Adjunta una foto del producto y de la etiqueta si puedes: nos ayuda a revisar más rápido.</li>
            <li>• Coordinamos contigo la solución más adecuada para tu pedido.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-[var(--line)] bg-cream-soft p-6 text-sm text-muted">
          ¿Necesitas ayuda con un pedido? Escríbenos desde la{" "}
          <Link href="/contact" className="text-accent-strong hover:underline">
            página de contacto
          </Link>{" "}
          con tu número de orden.
        </section>
      </div>
    </div>
  );
}
