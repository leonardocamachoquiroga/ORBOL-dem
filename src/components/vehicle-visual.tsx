import Image from "next/image";
import type { Vehicle } from "@/domain/vehicles";

interface VehicleVisualProps {
  vehicle: Vehicle;
  size?: "hero" | "card" | "detail" | "compact";
  showLabel?: boolean;
  className?: string;
}

const imageByVariant = {
  neo: "/images/vehicles/neo-c1.webp",
  terra: "/images/vehicles/terra-s5.webp",
  alto: "/images/vehicles/alto-x7.webp",
} as const;

export function VehicleVisual({ vehicle, size = "card", showLabel = true, className = "" }: VehicleVisualProps) {
  return <div className={`vehicle-visual vehicle-visual--${vehicle.visualVariant} vehicle-visual--${size} ${className}`} aria-label={`Concepto visual del ${vehicle.name}`} role="img"><Image className="vehicle-visual__image" src={imageByVariant[vehicle.visualVariant]} alt="" fill priority={size === "hero"} sizes="(max-width: 600px) 100vw, (max-width: 900px) 80vw, 60vw" /><div className="vehicle-visual__overlay" />{showLabel && <span className="vehicle-visual__label">Concept vehicle / OLBOL</span>}</div>;
}
