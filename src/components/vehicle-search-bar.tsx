"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { vehicles } from "@/domain/vehicles";

export function VehicleSearchBar() {
  const router = useRouter();
  const [model, setModel] = useState("all");
  const [year, setYear] = useState("all");
  const [price, setPrice] = useState("all");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (model !== "all") params.set("model", model);
    if (year !== "all") params.set("year", year);
    if (price !== "all") params.set("maxPrice", price);
    router.push(`/vehiculos${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return <form className="vehicle-search" onSubmit={submit}><div className="vehicle-search__heading"><span><Search size={17} /> Encuentra tu próximo OLBOL</span><small>Datos conceptuales de demo</small></div><div className="vehicle-search__fields"><label><span>Marca</span><select defaultValue="OLBOL" disabled><option>OLBOL</option></select></label><label><span>Modelo</span><select value={model} onChange={(event) => setModel(event.target.value)}><option value="all">Todos los modelos</option>{vehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>)}</select></label><label><span>Año</span><select value={year} onChange={(event) => setYear(event.target.value)}><option value="all">Cualquier año</option><option value="2026">2026</option><option value="2025">2025</option></select></label><label><span>Precio máximo</span><select value={price} onChange={(event) => setPrice(event.target.value)}><option value="all">Cualquier precio</option><option value="25000">USD 25.000</option><option value="30000">USD 30.000</option><option value="40000">USD 40.000</option></select></label><button className="vehicle-search__submit" type="submit"><SlidersHorizontal size={16} /> Buscar</button></div></form>;
}
