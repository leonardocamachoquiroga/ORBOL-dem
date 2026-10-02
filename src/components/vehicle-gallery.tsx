"use client";

import Image from "next/image";
import { Maximize2, Rotate3d, X } from "lucide-react";
import { useState } from "react";
import type { Vehicle } from "@/domain/vehicles";
import { useDialog } from "./use-dialog";

function GalleryLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const ref = useDialog(onClose);
  return <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}><div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={alt} ref={ref}><button className="modal-close" onClick={onClose} aria-label="Cerrar imagen"><X size={20} /></button><Image src={src} alt={alt} fill sizes="100vw" /></div></div>;
}

const imageByVariant = {
  neo: { main: "/images/vehicles/neo-c1.webp", secondary: "/images/vehicles/neo-c1-rear.webp" },
  terra: { main: "/images/vehicles/terra-s5.webp", secondary: "/images/vehicles/terra-s5-side.webp" },
  alto: { main: "/images/vehicles/alto-x7.webp", secondary: "/images/vehicles/alto-x7-rear.webp" },
} as const;

export function VehicleGallery({ vehicle }: { vehicle: Vehicle }) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const imageSet = imageByVariant[vehicle.visualVariant];
  const views = [
    { label: "Exterior 3/4", className: "vehicle-gallery__frame--hero", src: imageSet.main },
    { label: "Perfil / trasera", className: "vehicle-gallery__frame--side", src: imageSet.secondary },
    { label: "Detalle de diseño", className: "vehicle-gallery__frame--front", src: imageSet.main },
  ];
  return <div className="vehicle-gallery"><div className={`vehicle-gallery__frame ${views[active].className}`}><Image key={active} src={views[active].src} alt={`Vista ${views[active].label} del ${vehicle.name}`} fill priority sizes="(max-width: 900px) 100vw, 60vw" /><div className="vehicle-gallery__badge"><Rotate3d size={14} /> Galería conceptual</div><button className="vehicle-gallery__expand" aria-label="Ampliar imagen" onClick={() => setExpanded(true)}><Maximize2 size={16} /></button></div><div className="vehicle-gallery__thumbs">{views.map((view, index) => <button key={view.label} className={active === index ? "is-active" : ""} aria-pressed={active === index} onClick={() => setActive(index)}><span className={view.className} style={{ backgroundImage: `url(${view.src})` }} /><small>{view.label}</small></button>)}</div><p className="vehicle-gallery__note">Imágenes conceptuales. La galería oficial y la vista 360° se incorporan con las fotografías de OLBOL.</p>{expanded && <GalleryLightbox src={views[active].src} alt={`${vehicle.name} · ${views[active].label}`} onClose={() => setExpanded(false)} />}</div>;
}
