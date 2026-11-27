import type { Metadata } from "next";
import Link from "next/link";
import { Emblem } from "@/components/brand/emblem";
import { getStoreSettings } from "@/lib/settings";
import { AccordionItem } from "@/components/ui/accordion-item";

export const metadata: Metadata = {
  alternates: { canonical: "/faq" },
  title: "Preguntas frecuentes",
  description: "Respuestas sobre repuestos, compatibilidad, envíos y pagos en FRENOSHOP, Santa Cruz, Bolivia.",
};

const faqs = (DELIVERY_TIME: string) => [
  {
    q: "¿Cómo hago un pedido?",
    a: "Explora el catálogo, elige el repuesto que necesitas y confirma el pedido. Si no sabes qué pieza corresponde a tu vehículo, escríbenos por WhatsApp con marca, modelo, año y motor.",
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Pago contra entrega y pagos en línea con tarjeta o billetera a través de nuestras pasarelas, cuando están habilitadas.",
  },
  {
    q: "¿Cuánto tarda la entrega?",
    a: `Entregamos en Santa Cruz. Tiempo estimado: ${DELIVERY_TIME}. El tiempo puede variar según disponibilidad y distancia. Si necesitas coordinar la entrega, escríbenos por WhatsApp.`,
  },
  {
    q: "¿Puedo retirar en el local?",
    a: "Sí. Al finalizar el pedido elige retiro en tienda y pasa por Feria Barrio Lindo, Acronal B, pasillo D 316, sin costo adicional.",
  },
  {
    q: "¿Cómo sé si la pieza es compatible con mi vehículo?",
    a: "En cada producto indicamos la categoría y las especificaciones disponibles. Si tienes dudas, envíanos la marca, modelo, año y motor por WhatsApp y te confirmamos la compatibilidad antes de comprar.",
  },
  {
    q: "¿Cuál es la política de devoluciones?",
    a: "Si recibes una pieza incorrecta o con fallas, contáctanos con tu número de pedido y cuéntanos qué pasó. Revisamos el caso y coordinamos contigo la solución. Consulta Envíos y devoluciones.",
  },
  {
    q: "¿Tienen el repuesto que busco?",
    a: "El catálogo se está cargando. Si no encuentras tu pieza, escríbenos por WhatsApp: podemos consultar disponibilidad y avisarte cuando llegue.",
  },
];

export default async function FaqPage() {
  const FAQS = faqs((await getStoreSettings()).shipping.deliveryTime);
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <div className="text-center">
        <Emblem size={40} className="mx-auto text-brand" accent="var(--color-accent)" />
        <span className="eyebrow mt-3 block">Ayuda</span>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink">
          Preguntas frecuentes
        </h1>
      </div>

      <div className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {FAQS.map((item) => (
          <AccordionItem
            key={item.q}
            title={item.q}
            group="faq"
            className="py-4"
            summaryClassName="font-display text-lg text-ink"
            icon={
              <span
                aria-hidden="true"
                className="shrink-0 text-xl leading-none text-accent-strong transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[state=open]:rotate-45"
              >
                +
              </span>
            }
          >
            <p className="pt-3 text-sm leading-relaxed text-ink/80">{item.a}</p>
          </AccordionItem>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-muted">
        ¿Sigues con dudas?{" "}
        <Link href="/contact" className="text-accent-strong hover:underline">
          Contáctanos
        </Link>
        .
      </p>
    </div>
  );
}
