"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/vehiculos", label: "Vehículos" },
  { href: "/asesor", label: "Asesor IA" },
  { href: "/comparar", label: "Comparar" },
  { href: "/demo", label: "Demo" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 12);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="shell site-header__inner">
        <Link href="/" className="wordmark" onClick={() => setOpen(false)} aria-label="OLBOL inicio">OLBOL<span>.</span></Link>
        <nav className={`site-header__nav ${open ? "is-open" : ""}`} aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={pathname.startsWith(item.href) ? "is-active" : ""} onClick={() => setOpen(false)}>{item.label}</Link>
          ))}
          <Link href="/asesor" className="header-cta" onClick={() => setOpen(false)}>Encontrar mi OLBOL <span>↗</span></Link>
        </nav>
        <button className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
