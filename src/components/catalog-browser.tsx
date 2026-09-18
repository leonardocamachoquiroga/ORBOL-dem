"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { vehicles, type VehicleCategory, type VehicleCondition } from "@/domain/vehicles";
import { VehicleCard } from "./vehicle-card";

type Filter = "all" | VehicleCategory;
interface InitialFilters { model?: string; year?: string; maxPrice?: string; condition?: string; maxMileage?: string; }

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
    return matchesTerm && (filter === "all" || vehicle.category === filter) && (model === "all" || vehicle.id === model) && (year === "all" || vehicle.year === Number(year)) && vehicle.priceUsd <= maxPrice && (condition === "all" || vehicle.condition === condition) && vehicle.mileageKm <= maxMileage;
  }), [condition, filter, maxMileage, maxPrice, model, term, year]);
  const activeCount = [filter !== "all", model !== "all", year !== "all", maxPrice !== 50000, condition !== "all", maxMileage !== 100000, Boolean(term)].filter(Boolean).length;

  function clearFilters() { setFilter("all"); setModel("all"); setYear("all"); setMaxPrice(50000); setCondition("all"); setMaxMileage(100000); setTerm(""); }

  return <div className="catalog-layout"><aside className="catalog-sidebar"><div className="catalog-sidebar__top"><span className="eyebrow">FILTROS</span>{activeCount > 0 && <button onClick={clearFilters}><X size={13} /> Limpiar ({activeCount})</button>}</div><label className="catalog-search"><Search size={15} /><input value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Buscar modelo…" /></label><div className="filter-group"><span>Carrocería</span><div className="filter-pills">{(["all", "city", "suv", "family"] as const).map((item) => <button key={item} className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)}>{item === "all" ? "Todos" : item === "city" ? "Ciudad" : item === "suv" ? "SUV" : "Familiar"}</button>)}</div></div><label className="filter-select"><span>Modelo</span><select value={model} onChange={(event) => setModel(event.target.value)}><option value="all">Todos los modelos</option>{vehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>)}</select></label><label className="filter-select"><span>Año</span><select value={year} onChange={(event) => setYear(event.target.value)}><option value="all">Cualquier año</option><option value="2026">2026</option><option value="2025">2025</option></select></label><label className="filter-select"><span>Precio máximo</span><select value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))}><option value={50000}>USD 50.000</option><option value={40000}>USD 40.000</option><option value={30000}>USD 30.000</option><option value={25000}>USD 25.000</option></select></label><label className="filter-select"><span>Condición</span><select value={condition} onChange={(event) => setCondition(event.target.value as "all" | VehicleCondition)}><option value="all">Nuevo o seminuevo</option><option value="new">Nuevo</option><option value="used">Seminuevo</option></select></label><label className="filter-select"><span>Kilometraje máximo</span><select value={maxMileage} onChange={(event) => setMaxMileage(Number(event.target.value))}><option value={100000}>Cualquier kilometraje</option><option value={25000}>Hasta 25.000 km</option><option value={15000}>Hasta 15.000 km</option><option value={5000}>Hasta 5.000 km</option></select></label><p className="catalog-sidebar__note"><SlidersHorizontal size={14} /> Filtros preparados para conectarse al inventario real.</p></aside><section className="catalog-results"><div className="catalog-results__header"><span>{filtered.length} vehículos encontrados</span><span className="catalog-results__hint">Ordenado para explorar</span></div><div className="catalog-grid">{filtered.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}</div>{filtered.length === 0 && <div className="empty-state"><span>No encontramos un modelo con esos filtros.</span><button onClick={clearFilters}>Ver todo el catálogo</button></div>}</section></div>;
}
