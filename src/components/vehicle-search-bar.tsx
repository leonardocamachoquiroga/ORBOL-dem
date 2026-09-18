"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { vehicles } from "@/domain/vehicles";
import { PremiumSelect, type PremiumSelectOption } from "./premium-select";

const brandOptions: PremiumSelectOption[] = [{ value: "OLBOL", label: "OLBOL" }];
const modelOptions: PremiumSelectOption[] = [
  { value: "all", label: "Todos los modelos" },
  ...vehicles.map((vehicle) => ({ value: vehicle.id, label: vehicle.name })),
];
const yearOptions: PremiumSelectOption[] = [
  { value: "all", label: "Cualquier año" },
  { value: "2026", label: "2026" },
  { value: "2025", label: "2025" },
];
const priceOptions: PremiumSelectOption[] = [
  { value: "all", label: "Cualquier precio" },
  { value: "25000", label: "USD 25.000" },
  { value: "30000", label: "USD 30.000" },
  { value: "40000", label: "USD 40.000" },
];

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

  return (
    <form className="vehicle-search" onSubmit={submit}>
      <div className="vehicle-search__heading">
        <span><Search size={17} /> Encuentra tu próximo OLBOL</span>
        <small>Datos conceptuales de demo</small>
      </div>
      <div className="vehicle-search__fields">
        <div className="vehicle-search__field">
          <span>Marca</span>
          <PremiumSelect ariaLabel="Marca" value="OLBOL" options={brandOptions} disabled />
        </div>
        <div className="vehicle-search__field">
          <span>Modelo</span>
          <PremiumSelect ariaLabel="Modelo" value={model} options={modelOptions} onChange={setModel} />
        </div>
        <div className="vehicle-search__field">
          <span>Año</span>
          <PremiumSelect ariaLabel="Año" value={year} options={yearOptions} onChange={setYear} />
        </div>
        <div className="vehicle-search__field">
          <span>Precio máximo</span>
          <PremiumSelect ariaLabel="Precio máximo" value={price} options={priceOptions} onChange={setPrice} />
        </div>
        <button className="vehicle-search__submit" type="submit"><SlidersHorizontal size={16} /> Buscar</button>
      </div>
    </form>
  );
}
