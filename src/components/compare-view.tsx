"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ComparisonTable } from "@/components/comparison-table";
import { getVehicleById, vehicles } from "@/domain/vehicles";

export function CompareView({ ids }: { ids?: string }) {
  const requestedIds = (ids ?? "terra-s5,neo-c1").split(",");
  const first = getVehicleById(requestedIds[0]) ?? vehicles[1];
  const second = getVehicleById(requestedIds[1]) ?? vehicles[0];
  return <>
    <ComparisonTable vehicles={[first, second]} />
    <div style={{ textAlign: "center", marginTop: 32 }}><Link href="/asesor" className="button-primary">Hablar con el asesor <ArrowRight size={16} /></Link></div>
  </>;
}
