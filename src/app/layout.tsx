import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-provider";
import { ToastProvider } from "@/components/ui/toast";
import { FlashToast } from "@/components/ui/flash-toast";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FRENOSHOP | Frenos y repuestos en Santa Cruz",
    template: "%s | FRENOSHOP",
  },
  description:
    "Repuestos de freno en Santa Cruz: pastillas, discos, tambores, cilindros, kits y sellos. Atención directa por WhatsApp, delivery y retiro en Feria Barrio Lindo.",
  keywords: [
    "FRENOSHOP",
    "frenos Santa Cruz",
    "pastillas de freno",
    "discos de freno",
    "tambores de freno",
    "cilindros de freno",
    "kits de frenos",
    "repuestos de freno",
    "Feria Barrio Lindo",
    "Santa Cruz",
    "Bolivia",
  ],
  applicationName: "FRENOSHOP",
  openGraph: {
    title: "FRENOSHOP | Frenos y repuestos en Santa Cruz",
    description:
      "Pastillas, discos, tambores, cilindros, kits y sellos para el sistema de frenos. Delivery y retiro en Feria Barrio Lindo, Santa Cruz.",
    type: "website",
    siteName: "FRENOSHOP",
    url: siteUrl,
    images: [{ url: "/images/og-frenoshop.png", width: 1200, height: 630, alt: "FRENOSHOP — frenos y repuestos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FRENOSHOP | Frenos y repuestos en Santa Cruz",
    description:
      "Pastillas, discos, tambores, cilindros, kits y sellos para el sistema de frenos. Delivery y retiro en Feria Barrio Lindo, Santa Cruz.",
    images: ["/images/og-frenoshop.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <noscript>
          <style>{`.split-word{opacity:1 !important;filter:none !important;transform:none !important}`}</style>
        </noscript>
        {/* Apply saved theme before paint to avoid a flash of the wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('frenoshop-theme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}else if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();",
          }}
        />
        <ToastProvider>
          <FlashToast />
          <CartProvider>{children}</CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
