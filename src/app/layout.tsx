import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { ExperienceMotion } from "@/components/experience-motion";

export const metadata: Metadata = {
  title: "OLBOL — Muévete hacia algo mejor",
  description: "OLBOL Digital Sales Experience — una nueva forma de elegir tu vehículo eléctrico.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><a className="skip-link" href="#contenido">Ir al contenido</a><SiteHeader /><div id="contenido">{children}</div><ExperienceMotion /><FloatingWhatsApp /><footer className="footer"><div className="shell footer__inner"><strong>OLBOL.</strong><span>Experiencia de demostración · Vehículos y datos conceptuales</span><span>Bolivia · 2026</span></div></footer></body></html>;
}
