"use client";

import Image from "next/image";
import { Maximize2, Rotate3d } from "lucide-react";
import { useState } from "react";
import type { Vehicle } from "@/domain/vehicles";

const imageByVariant = {
  neo: { main: "/images/vehicles/neo-c1.webp", secondary: "/images/vehicles/neo-c1-rear.webp" },
  terra: { main: "/images/vehicles/terra-s5.webp", secondary: "/images/vehicles/terra-s5-side.webp" },
  alto: { main: "/images/vehicles/alto-x7.webp", secondary: "/images/vehicles/alto-x7-rear.webp" },
} as const;

export function VehicleGallery({ vehicle }: { vehicle: Vehicle }) {
  const [active, setActive] = useState(0);
  const imageSet = imageByVariant[vehicle.visualVariant];
  const views = [
    { label: "Exterior 3/4", className: "vehicle-gallery__frame--hero", src: imageSet.main },
    { label: "Perfil / trasera", className: "vehicle-gallery__frame--side", src: imageSet.secondary },
    { label: "Detalle de diseño", className: "vehicle-gallery__frame--front", src: imageSet.main },
  ];
  return <div className="vehicle-gallery"><div className={`vehicle-gallery__frame ${views[active].className}`}><Image src={views[active].src} alt={`Vista ${views[active].label} del ${vehicle.name}`} fill priority sizes="(max-width: 900px) 100vw, 60vw" /><div className="vehicle-gallery__badge"><Rotate3d size={14} /> Galería conceptual / alta resolución</div><button className="vehicle-gallery__expand" aria-label="Ampliar imagen"><Maximize2 size={16} /></button></div><div className="vehicle-gallery__thumbs">{views.map((view, index) => <button key={view.label} className={active === index ? "is-active" : ""} onClick={() => setActive(index)}><span className={view.className} style={{ backgroundImage: `url(${view.src})` }} /><small>{view.label}</small></button>)}</div><p className="vehicle-gallery__note">La vista 360° real se conectará al set fotográfico oficial de OLBOL. Esta demo usa renders de producto optimizados en WebP.</p></div>;
}
