"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { vehicles, type VehicleCategory, type VehicleCondition } from "@/domain/vehicles";
import { PremiumSelect, type PremiumSelectOption } from "./premium-select";
import { VehicleCard } from "./vehicle-card";

type Filter = "all" | VehicleCategory;

interface InitialFilters {
  model?: string;
  year?: string;
  maxPrice?: string;
  condition?: string;
  maxMileage?: string;
}

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
  { value: "50000", label: "USD 50.000" },
  { value: "40000", label: "USD 40.000" },
  { value: "30000", label: "USD 30.000" },
  { value: "25000", label: "USD 25.000" },
];
const conditionOptions: PremiumSelectOption[] = [
  { value: "all", label: "Nuevo o seminuevo" },
  { value: "new", label: "Nuevo" },
  { value: "used", label: "Seminuevo" },
];
const mileageOptions: PremiumSelectOption[] = [
  { value: "100000", label: "Cualquier kilometraje" },
  { value: "25000", label: "Hasta 25.000 km" },
  { value: "15000", label: "Hasta 15.000 km" },
  { value: "5000", label: "Hasta 5.000 km" },
];

export function CatalogBrowser({ initialFilters = {} }: { initialFilters?: InitialFilters }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [model, setModel] = useState(initialFilters.model ?? "all");
  const [year, setYear] = useState(initialFilters.year ?? "all");
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice ? Number(initialFilters.maxPrice) : 50000);
  const [condition, setCondition] = useState<"all" | VehicleCondition>((initialFilters.condition as "all" | VehicleCondition) ?? "all");
  const [maxMileage, setMaxMileage] = useState(initialFilters.maxMileage ? Number(initialFilters.maxMileage) : 100000);
  const [term, setTerm] = useState("");

  const filtered = useMemo(() => vehicles.filter((vehicle) => {
    const matchesTerm = !term || `${vehicle.name} ${vehicle.categoryLabel} ${vehicle.conditionLabel}`.toLocaleLowerCase().includes(term.toLocaleLowerCase());
    return matchesTerm
      && (filter === "all" || vehicle.category === filter)
      && (model === "all" || vehicle.id === model)
      && (year === "all" || vehicle.year === Number(year))
      && vehicle.priceUsd <= maxPrice
      && (condition === "all" || vehicle.condition === condition)
      && vehicle.mileageKm <= maxMileage;
  }), [condition, filter, maxMileage, maxPrice, model, term, year]);

  const activeCount = [
    filter !== "all",
    model !== "all",
    year !== "all",
    maxPrice !== 50000,
    condition !== "all",
    maxMileage !== 100000,
    Boolean(term),
  ].filter(Boolean).length;

  function clearFilters() {
    setFilter("all");
    setModel("all");
    setYear("all");
    setMaxPrice(50000);
    setCondition("all");
    setMaxMileage(100000);
    setTerm("");
  }

  return (
    <div className="catalog-layout">
      <aside className="catalog-sidebar">
        <div className="catalog-sidebar__top">
          <span className="eyebrow">FILTROS</span>
          {activeCount > 0 && <button onClick={clearFilters}><X size={13} /> Limpiar ({activeCount})</button>}
        </div>
        <label className="catalog-search">
          <Search size={15} />
          <input value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Buscar modelo…" />
        </label>
        <div className="filter-group">
          <span>Carrocería</span>
          <div className="filter-pills">
            {(["all", "city", "suv", "family"] as const).map((item) => (
              <button key={item} className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>
                {item === "all" ? "Todos" : item === "city" ? "Ciudad" : item === "suv" ? "SUV" : "Familiar"}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-select">
          <span>Modelo</span>
          <PremiumSelect ariaLabel="Filtrar por modelo" value={model} options={modelOptions} onChange={setModel} />
        </div>
        <div className="filter-select">
          <span>Año</span>
          <PremiumSelect ariaLabel="Filtrar por año" value={year} options={yearOptions} onChange={setYear} />
        </div>
        <div className="filter-select">
          <span>Precio máximo</span>
          <PremiumSelect ariaLabel="Filtrar por precio máximo" value={String(maxPrice)} options={priceOptions} onChange={(value) => setMaxPrice(Number(value))} />
        </div>
        <div className="filter-select">
          <span>Condición</span>
          <PremiumSelect ariaLabel="Filtrar por condición" value={condition} options={conditionOptions} onChange={(value) => setCondition(value as "all" | VehicleCondition)} />
        </div>
        <div className="filter-select">
          <span>Kilometraje máximo</span>
          <PremiumSelect ariaLabel="Filtrar por kilometraje máximo" value={String(maxMileage)} options={mileageOptions} onChange={(value) => setMaxMileage(Number(value))} />
        </div>
        <p className="catalog-sidebar__note"><SlidersHorizontal size={14} /> Filtros preparados para conectarse al inventario real.</p>
      </aside>

      <section className="catalog-results">
        <div className="catalog-results__header">
          <span>{filtered.length} vehículos encontrados</span>
          <span className="catalog-results__hint">Ordenado para explorar</span>
        </div>
        <div className="catalog-grid">{filtered.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}</div>
        {filtered.length === 0 && (
          <div className="empty-state">
            <span>No encontramos un modelo con esos filtros.</span>
            <button onClick={clearFilters}>Ver todo el catálogo</button>
          </div>
        )}
      </section>
    </div>
  );
}
