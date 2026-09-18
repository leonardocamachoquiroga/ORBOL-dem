import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";

export const metadata: Metadata = {
  title: "OLBOL — Muévete hacia algo mejor",
  description: "OLBOL Digital Sales Experience — una nueva forma de elegir tu vehículo eléctrico.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><SiteHeader />{children}<FloatingWhatsApp /><footer className="footer"><div className="shell footer__inner"><strong>OLBOL.</strong><span>Concepto de experiencia digital · Datos ficticios para demostración</span><span>2026</span></div></footer></body></html>;
}
