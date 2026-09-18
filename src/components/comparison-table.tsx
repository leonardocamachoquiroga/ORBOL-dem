import Link from "next/link";
import { ArrowRight, BatteryCharging, Gauge, Users, Zap } from "lucide-react";
import { formatPrice, type Vehicle } from "@/domain/vehicles";
import { VehicleVisual } from "./vehicle-visual";

export function ComparisonTable({ vehicles }: { vehicles: [Vehicle, Vehicle] }) {
  const rows = [
    { label: "Precio desde", icon: <span className="comparison-icon">$</span>, values: vehicles.map((vehicle) => formatPrice(vehicle.priceUsd)) },
    { label: "Autonomía", icon: <BatteryCharging size={17} />, values: vehicles.map((vehicle) => `${vehicle.rangeKm} km`) },
    { label: "Potencia", icon: <Gauge size={17} />, values: vehicles.map((vehicle) => `${vehicle.powerKw} kW`) },
    { label: "Carga rápida", icon: <Zap size={17} />, values: vehicles.map((vehicle) => `${vehicle.fastChargeMinutes} min`) },
    { label: "Capacidad", icon: <Users size={17} />, values: vehicles.map((vehicle) => `${vehicle.passengers} personas`) },
  ];

  return (
    <div className="comparison-table-wrap">
      <div className="comparison-vehicles">
        {vehicles.map((vehicle) => <div key={vehicle.id} className="comparison-vehicle"><VehicleVisual vehicle={vehicle} size="compact" showLabel={false} /><div><span className="eyebrow">{vehicle.categoryLabel}</span><h3>{vehicle.name}</h3><Link href={`/vehiculos/${vehicle.slug}`} className="text-link">Ver ficha <ArrowRight size={15} /></Link></div></div>)}
      </div>
      <div className="comparison-rows">
        {rows.map((row) => <div className="comparison-row" key={row.label}><div className="comparison-label">{row.icon}<span>{row.label}</span></div><strong>{row.values[0]}</strong><strong>{row.values[1]}</strong></div>)}
      </div>
      <p className="demo-note">Datos conceptuales para demostración. Las cifras finales dependerán de la configuración y disponibilidad.</p>
    </div>
  );
}
