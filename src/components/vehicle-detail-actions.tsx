"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarDays, Calculator } from "lucide-react";
import { useState } from "react";
import type { Vehicle } from "@/domain/vehicles";
import { TestDriveModal } from "./test-drive-modal";

export function VehicleDetailActions({ vehicle }: { vehicle: Vehicle }) {
  const [open, setOpen] = useState(false);
  return <><div className="detail-hero__actions"><button className="button-primary" onClick={() => setOpen(true)}><CalendarDays size={16} /> Agendar prueba de manejo</button><Link href={`/asesor?vehicle=${vehicle.id}`} className="button-light"><Calculator size={16} /> Cotizar con el asesor <ArrowUpRight size={16} /></Link></div>{open && <TestDriveModal vehicle={vehicle} onClose={() => setOpen(false)} />}</>;
}
