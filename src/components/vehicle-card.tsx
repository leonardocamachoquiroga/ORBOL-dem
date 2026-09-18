import Link from "next/link";
import { ArrowUpRight, BatteryCharging, Users } from "lucide-react";
import { formatPrice, type Vehicle } from "@/domain/vehicles";
import { VehicleVisual } from "./vehicle-visual";

export function VehicleCard({ vehicle, featured = false }: { vehicle: Vehicle; featured?: boolean }) {
  return (
    <article className={`vehicle-card ${featured ? "vehicle-card--featured" : ""}`}>
      <Link href={`/vehiculos/${vehicle.slug}`} className="vehicle-card__visual-link">
        <VehicleVisual vehicle={vehicle} size={featured ? "detail" : "card"} />
      </Link>
      <div className="vehicle-card__body">
        <div className="eyebrow-row"><span className="eyebrow">{vehicle.eyebrow}</span><span className="availability-dot" data-tone={vehicle.availability}>{vehicle.conditionLabel}</span></div>
        <div className="vehicle-card__title-row">
          <div><h3>{vehicle.name}</h3><p>{vehicle.tagline}</p></div>
          <span className="vehicle-card__price">Desde {formatPrice(vehicle.priceUsd)}</span>
        </div>
        <div className="vehicle-stats">
          <span><BatteryCharging size={15} /> {vehicle.rangeKm} km</span>
          <span><Users size={15} /> {vehicle.passengers} plazas</span>
          <span>{vehicle.categoryLabel} · {vehicle.year}</span>
        </div>
        <Link className="text-link" href={`/vehiculos/${vehicle.slug}`}>Explorar modelo <ArrowUpRight size={16} /></Link>
      </div>
    </article>
  );
}
