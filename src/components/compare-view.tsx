"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ComparisonTable } from "@/components/comparison-table";
import { getVehicleById, vehicles } from "@/domain/vehicles";
import { useState } from "react";
import { PremiumSelect } from "./premium-select";

export function CompareView({ ids }: { ids?: string }) {
  const requestedIds = (ids ?? "terra-s5,neo-c1").split(",");
  const [firstId, setFirstId] = useState((getVehicleById(requestedIds[0]) ?? vehicles[1]).id);
  const [secondId, setSecondId] = useState((getVehicleById(requestedIds[1]) ?? vehicles[0]).id);
  const first = getVehicleById(firstId) ?? vehicles[1];
  const second = getVehicleById(secondId) ?? vehicles[0];
  const options = vehicles.map(vehicle => ({ value: vehicle.id, label: vehicle.name }));
  return <>
    <div className="comparison-controls"><div><span>Primer vehículo</span><PremiumSelect ariaLabel="Primer vehículo" value={firstId} options={options} onChange={value => { setFirstId(value); if(value===secondId) setSecondId(firstId); }} /></div><div><span>Segundo vehículo</span><PremiumSelect ariaLabel="Segundo vehículo" value={secondId} options={options.filter(option=>option.value!==firstId)} onChange={setSecondId} /></div></div>
    <ComparisonTable vehicles={[first, second]} />
    <div style={{ textAlign: "center", marginTop: 32 }}><Link href="/asesor" className="button-primary">Hablar con el asesor <ArrowRight size={16} /></Link></div>
  </>;
}
